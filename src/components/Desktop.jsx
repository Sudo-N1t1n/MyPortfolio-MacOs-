import React, { useRef } from "react";
import { locations } from "#constants";
import useWindow from "../hooks/useWindow";
import Finder from "../apps/Finder";
import Safari from "../apps/Safari";
import Photos from "../apps/Photos";
import Resume from "../apps/Resume";
import Terminal from "../apps/Terminal";
import Contact from "../apps/Contact";

import ImageViewer from "../apps/ImageViewer";
import TextEditor from "../apps/TextEditor";

const Desktop = () => {
    const { openWindow } = useWindow();
    const desktopRef = useRef(null);

    return (
        <div ref={desktopRef} className="absolute inset-0 z-10 pointer-events-none">
            {/* Desktop Icons */}
            <div className="absolute top-8 right-8 flex flex-col gap-6 pointer-events-auto items-end">
                {Object.values(locations)
                    .filter(loc => loc.type !== 'trash')
                    .map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => openWindow(loc.type === 'resume' ? 'resume' : 'finder', { path: loc.type })} // Resume opens Resume app, others open Finder
                            className="group flex flex-col items-center gap-1.5 w-24 focus:outline-none transition-transform duration-200 hover:scale-110 active:scale-95"
                        >
                            <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm group-hover:bg-white/10 transition-colors p-1 relative">
                                <img
                                    src={loc.icon}
                                    alt={loc.name}
                                    className="w-full h-full object-contain drop-shadow-lg"
                                />
                            </div>
                            <span className="text-xs font-medium text-white drop-shadow-md px-2 py-0.5 rounded bg-transparent group-hover:bg-blue-600/80 transition-colors text-center leading-tight">
                                {loc.name}
                            </span>
                        </button>
                    ))}
            </div>

            {/* Windows Container (pointer-events-auto handled by windows) */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                <Finder />
                <Safari />
                <Photos />
                <Resume />
                <Terminal />
                <Contact />
                <ImageViewer />
                <TextEditor />
            </div>
        </div>
    );
};

export default Desktop;
