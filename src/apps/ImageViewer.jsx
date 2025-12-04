import React from "react";
import Window from "../components/Window";
import useWindow from "../hooks/useWindow";

const ImageViewer = () => {
    const { windows } = useWindow();
    const windowState = windows['imgfile'];
    const data = windowState?.data;

    if (!data) return null;

    return (
        <Window id="imgfile" title={data.name} minWidth={600} minHeight={500}>
            <div className="w-full h-full bg-[#1c1c1e] flex items-center justify-center p-4">
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="max-w-full max-h-full object-contain shadow-2xl"
                />
            </div>
        </Window>
    );
};

export default ImageViewer;
