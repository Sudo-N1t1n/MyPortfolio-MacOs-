import React, { useState } from "react";
import Window from "../components/Window";
import { blogPosts } from "#constants";

const Safari = () => {
    // For now, let's just show a list of articles or a specific one
    // We can simulate a browser with an address bar

    return (
        <Window id="safari" title="Safari" minWidth={800} minHeight={600}>
            <div className="flex flex-col h-full bg-[#1c1c1e]">
                {/* Toolbar */}
                <div className="h-12 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 gap-4">
                    <div className="flex gap-2">
                        <button className="text-zinc-500 hover:text-zinc-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button className="text-zinc-500 hover:text-zinc-300">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 bg-zinc-900 rounded-md h-8 flex items-center px-3 text-sm text-zinc-400">
                        <span className="mr-2">🔒</span> jsmastery.com/blog
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="max-w-4xl mx-auto p-8 text-black">
                        <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>

                        <div className="grid gap-8">
                            {blogPosts.map((post) => (
                                <a key={post.id} href={post.link} target="_blank" rel="noopener noreferrer" className="block group">
                                    <div className="border border-zinc-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="h-48 bg-zinc-100 overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <p className="text-sm text-zinc-500 mb-2">{post.date}</p>
                                            <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{post.title}</h2>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Window>
    );
};

export default Safari;
