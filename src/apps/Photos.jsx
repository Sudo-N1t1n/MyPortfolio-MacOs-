import React from "react";
import Window from "../components/Window";
import { gallery } from "#constants";

const Photos = () => {
    return (
        <Window id="photos" title="Photos" minWidth={700} minHeight={500}>
            <div className="flex h-full bg-[#1c1c1e]">
                {/* Sidebar */}
                <div className="w-48 bg-zinc-900/50 backdrop-blur-md p-4 border-r border-zinc-700/50 hidden md:block">
                    <p className="text-xs font-semibold text-zinc-500 mb-2 px-2">Library</p>
                    <ul className="space-y-1">
                        <li>
                            <button className="w-full text-left px-2 py-1.5 rounded-md text-sm bg-blue-500/20 text-blue-400">
                                All Photos
                            </button>
                        </li>
                        <li>
                            <button className="w-full text-left px-2 py-1.5 rounded-md text-sm text-zinc-400 hover:bg-zinc-800">
                                Favorites
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Grid */}
                <div className="flex-1 p-4 overflow-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.map((item) => (
                            <div key={item.id} className="aspect-square bg-zinc-800 rounded-lg overflow-hidden">
                                <img src={item.img} alt={`Gallery ${item.id}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Photos;
