import React from "react";
import Window from "../components/Window";
import { socials } from "#constants";

const Contact = () => {
    return (
        <Window id="contact" title="Contact" minWidth={400} minHeight={500}>
            <div className="w-full h-full bg-[#1c1c1e] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-zinc-700 shadow-xl">
                    <img src="/images/profile.png" alt="Profile" className="w-full h-full object-cover" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Let's Connect!</h2>
                <p className="text-zinc-400 mb-8 max-w-xs">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {socials.map((social) => (
                        <a
                            key={social.id}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors group"
                        >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: social.bg }}>
                                <img src={social.icon} alt={social.text} className="w-5 h-5 invert brightness-0" />
                            </div>
                            <span className="text-zinc-200 font-medium group-hover:text-white">{social.text}</span>
                        </a>
                    ))}
                </div>
            </div>
        </Window>
    );
};

export default Contact;
