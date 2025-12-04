import React from "react";
import Window from "../components/Window";
import { techStack } from "#constants";

const Terminal = () => {
    return (
        <Window id="terminal" title="Terminal — -zsh — 80x24" minWidth={600} minHeight={400}>
            <div className="w-full h-full bg-[#1c1c1e] p-4 font-mono text-sm text-zinc-300 overflow-auto">
                <div className="mb-4">
                    <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="text-zinc-400">neofetch</span>
                </div>

                <div className="flex gap-4">
                    <div className="text-blue-500 hidden sm:block">
                        <pre>{`
      _   _ 
     | \\ | |
     |  \\| |
     | . \` |
     | |\\  |
     |_| \\_|
                        `}</pre>
                    </div>
                    <div>
                        <p><span className="text-blue-400 font-bold">Nitin</span>@<span className="text-blue-400">MacBook-Pro</span></p>
                        <p>------------------</p>
                        <p><span className="text-blue-400 font-bold">OS</span>: macOS Sequoia 15.1</p>
                        <p><span className="text-blue-400 font-bold">Host</span>: MacBook Pro</p>
                        <p><span className="text-blue-400 font-bold">Uptime</span>: 24 hours</p>
                        <p><span className="text-blue-400 font-bold">Packages</span>: {techStack.reduce((acc, cat) => acc + cat.items.length, 0)} (npm)</p>
                        <p><span className="text-blue-400 font-bold">Shell</span>: zsh 5.9</p>
                        <br />
                        <p><span className="text-green-400 font-bold">Skills:</span></p>
                        {techStack.map((stack, i) => (
                            <div key={i} className="ml-4">
                                <span className="text-yellow-400">{stack.category}:</span> {stack.items.join(", ")}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <span className="text-green-400">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
                </div>
            </div>
        </Window>
    );
};

export default Terminal;
