import React from "react";
import Window from "../components/Window";
import useWindow from "../hooks/useWindow";

const TextEditor = () => {
    const { windows } = useWindow();
    const windowState = windows['txtfile'];
    const data = windowState?.data;

    if (!data) return null;

    return (
        <Window id="txtfile" title={data.name} minWidth={500} minHeight={400}>
            <div className="w-full h-full bg-[#1e1e1e] text-zinc-300 p-6 font-mono text-sm overflow-auto">
                {data.image && (
                    <div className="mb-6 flex justify-center">
                        <img src={data.image} alt="Header" className="w-32 h-32 rounded-full object-cover border-4 border-zinc-700" />
                    </div>
                )}

                {data.subtitle && (
                    <h2 className="text-xl font-bold text-white mb-4 text-center">{data.subtitle}</h2>
                )}

                {Array.isArray(data.description) ? (
                    data.description.map((line, i) => (
                        <p key={i} className="mb-4 leading-relaxed">
                            {line}
                        </p>
                    ))
                ) : (
                    <p className="leading-relaxed">{data.description}</p>
                )}
            </div>
        </Window>
    );
};

export default TextEditor;
