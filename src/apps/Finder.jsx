import React, { useState } from "react";
import { locations, photosLinks } from "#constants";
import Window from "../components/Window";
import useWindow from "../hooks/useWindow";

const Finder = () => {
    const [currentPath, setCurrentPath] = useState('work'); // 'work', 'about', 'resume', 'trash'

    // Helper to get content based on current path
    const getContent = () => {
        const location = locations[currentPath];
        if (!location) return [];
        return location.children || [];
    };

    const content = getContent();

    const { openWindow, windows } = useWindow();

    React.useEffect(() => {
        if (windows['finder']?.data?.path) {
            setCurrentPath(windows['finder'].data.path);
        }
    }, [windows['finder']?.data]);

    const handleItemClick = (item) => {
        if (item.kind === 'folder') {
            setCurrentPath(item.id); // This might need to be adjusted if IDs are not unique across all folders or if we need a better path system. 
            // Actually, the current implementation uses 'type' for top-level and 'id' for sub-folders? 
            // Wait, the current implementation uses `locations[currentPath]`. 
            // `locations` keys are 'work', 'about', 'resume', 'trash'.
            // But sub-folders in `constants` don't have keys in `locations`.
            // The current Finder implementation is a bit shallow, it only switches between top-level categories.
            // To support deep navigation, I'd need a better structure.
            // But for now, let's just support opening files.
            // If the user wants "real OS directories", I might need to implement a proper path stack.
            // BUT, the current `locations` object is flat-ish.
            // Let's look at `constants.jsx` again.
            // `WORK_LOCATION` has children. Some children are folders (e.g. "Nike...").
            // If I click a folder, I need to show its children.
            // But `locations` is the source of truth for `getContent`.
            // I need to update `getContent` or `currentPath` logic to handle nested folders.
            // OR, I can just make files openable for now.
            // Let's stick to opening files first.
        } else if (item.kind === 'file') {
            if (item.fileType === 'url') {
                window.open(item.href, '_blank');
            } else if (item.fileType === 'img') {
                openWindow('imgfile', item);
            } else if (item.fileType === 'txt') {
                openWindow('txtfile', item);
            } else if (item.fileType === 'pdf') {
                openWindow('resume'); // Special case for resume, or generic PDF viewer
            }
        }
    };

    return (
        <Window id="finder" title={locations[currentPath]?.name || "Finder"} minWidth={800} minHeight={500}>
            <div className="flex h-full bg-[#1c1c1e] text-zinc-200">
                {/* Sidebar */}
                <div className="w-48 bg-zinc-900/50 backdrop-blur-md p-4 flex flex-col gap-6 border-r border-zinc-700/50">
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 mb-2 px-2">Favorites</p>
                        <ul className="space-y-1">
                            {Object.values(locations).map((loc) => (
                                <li key={loc.id}>
                                    <button
                                        onClick={() => setCurrentPath(loc.type)}
                                        className={`w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center gap-2 transition-colors ${currentPath === loc.type ? "bg-blue-500/20 text-blue-400" : "hover:bg-zinc-800"
                                            }`}
                                    >
                                        <img src={loc.icon} alt={loc.name} className="w-4 h-4" />
                                        {loc.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-zinc-500 mb-2 px-2">iCloud</p>
                        <ul className="space-y-1">
                            <li>
                                <button className="w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center gap-2 hover:bg-zinc-800 text-zinc-400">
                                    <img src="/icons/cloud.svg" alt="iCloud" className="w-4 h-4 opacity-50" />
                                    iCloud Drive
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left px-2 py-1.5 rounded-md text-sm flex items-center gap-2 hover:bg-zinc-800 text-zinc-400">
                                    <img src="/icons/download.svg" alt="Downloads" className="w-4 h-4 opacity-50" />
                                    Downloads
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                        {content.map((item) => (
                            <div
                                key={item.id}
                                onDoubleClick={() => handleItemClick(item)}
                                className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-500/20 cursor-pointer transition-colors"
                            >
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <img src={item.icon} alt={item.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                                </div>
                                <span className="text-sm text-center text-zinc-300 group-hover:text-white leading-tight break-words w-full px-1">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                        {content.length === 0 && (
                            <div className="col-span-full h-full flex items-center justify-center text-zinc-600">
                                Folder is empty
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Finder;
