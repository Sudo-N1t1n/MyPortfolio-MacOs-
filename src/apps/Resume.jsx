import React from "react";
import Window from "../components/Window";

const Resume = () => {
    return (
        <Window id="resume" title="Resume.pdf" minWidth={600} minHeight={800}>
            <div className="w-full h-full bg-[#525659]">
                <iframe
                    src="/resume.pdf"
                    className="w-full h-full border-none"
                    title="Resume"
                />
            </div>
        </Window>
    );
};

export default Resume;
