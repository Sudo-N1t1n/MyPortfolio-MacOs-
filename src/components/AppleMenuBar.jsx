import dayjs from 'dayjs'
import React from 'react'
import { navIcons, navLinks } from "#constants";
import useWindow from "../hooks/useWindow";

const Navbar = () => {
    const { toggleWindow } = useWindow();
    const [isOnline, setIsOnline] = React.useState(true);
    const [showContactMenu, setShowContactMenu] = React.useState(false);
    const [isDark, setIsDark] = React.useState(true); // Default to dark

    React.useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/5 px-4 py-1.5 flex justify-between items-center text-xs select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer group">
                    <img src="/images/logo.svg" alt="logo" className="w-4 h-4 brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
                    <p className="font-bold text-white/90 group-hover:text-white transition-colors">Nitin's Portfolio</p>
                </div>

                <ul className="flex gap-4">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} className="relative">
                            {name === "Contact" ? (
                                <div
                                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                                    onClick={() => setShowContactMenu(!showContactMenu)}
                                >
                                    {name}
                                    {showContactMenu && (
                                        <div className="absolute top-6 left-0 bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl p-2 min-w-[200px] flex flex-col gap-1">
                                            <a
                                                href="mailto:nicenitinnagr@gmail.com"
                                                className="block px-3 py-2 hover:bg-blue-500/50 rounded-md text-white transition-colors"
                                            >
                                                Email: nicenitinnagr@gmail.com
                                            </a>
                                            <div className="h-px bg-white/10 my-1" />
                                            <a
                                                href="https://github.com/Sudo-N1t1n"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-3 py-2 hover:bg-blue-500/50 rounded-md text-white transition-colors"
                                            >
                                                GitHub: github.com/Sudo-N1t1n
                                            </a>
                                            <a
                                                href="https://linkedin.com/in/nitinnotfound"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block px-3 py-2 hover:bg-blue-500/50 rounded-md text-white transition-colors"
                                            >
                                                LinkedIn: linkedin.com/in/nitinnotfound
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    onClick={() => toggleWindow(type)}
                                    className="cursor-pointer text-gray-300 hover:text-white transition-colors"
                                >
                                    {name}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
                    title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDark ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300 group-hover:text-yellow-200"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 group-hover:text-white"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    )}
                </button>

                <button
                    onClick={() => setIsOnline(!isOnline)}
                    className="flex items-center gap-2 bg-white/10 px-2 py-0.5 rounded-full border border-white/5 hover:bg-white/20 transition-all cursor-pointer"
                >
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-colors ${isOnline ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]'}`}></div>
                    <span className="text-[10px] font-medium text-white/90 w-10 text-center">{isOnline ? 'Online' : 'Busy'}</span>
                </button>

                <ul className="flex gap-3">
                    {navIcons.map(({ id, img }) => (
                        <li key={id}>
                            <img
                                src={img}
                                className="w-4 h-4 brightness-0 invert opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                                alt={`icon-${id}`}
                            />
                        </li>
                    ))}
                </ul>
                <time className="text-white/90 font-medium text-xs ml-2">{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}

export default Navbar