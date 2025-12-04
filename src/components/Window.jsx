import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindow from "../hooks/useWindow";
import { X, Minus, Maximize2 } from "lucide-react";

const Window = ({ id, title, children, minWidth = 600, minHeight = 400 }) => {
    const { windows, closeWindow, focusWindow, minimizeWindow } = useWindow();
    const windowState = windows[id];
    const windowRef = useRef(null);
    const headerRef = useRef(null);

    // Position and Size State
    const [position, setPosition] = useState({ x: 100 + Math.random() * 50, y: 50 + Math.random() * 50 });
    const [size, setSize] = useState({ width: minWidth, height: minHeight });

    // Dragging State
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Resizing State
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null); // 'e', 's', 'se', etc.

    // Opening animation
    useGSAP(() => {
        if (windowState.isOpen && !windowState.isMinimized) {
            gsap.fromTo(
                windowRef.current,
                { scale: 0.95, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [windowState.isOpen]);

    // --- Dragging Logic ---
    const handleMouseDown = (e) => {
        if (e.target.closest('button')) return;

        focusWindow(id);
        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    // --- Resizing Logic ---
    const handleResizeMouseDown = (e, direction) => {
        e.stopPropagation();
        focusWindow(id);
        setIsResizing(true);
        setResizeDirection(direction);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            } else if (isResizing) {
                const rect = windowRef.current.getBoundingClientRect();

                if (resizeDirection.includes('e')) {
                    const newWidth = Math.max(minWidth, e.clientX - rect.left);
                    setSize(prev => ({ ...prev, width: newWidth }));
                }
                if (resizeDirection.includes('s')) {
                    const newHeight = Math.max(minHeight, e.clientY - rect.top);
                    setSize(prev => ({ ...prev, height: newHeight }));
                }
                // Add more directions (n, w, ne, sw, nw) if needed, but se/e/s is usually enough for basic resizing
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
            setResizeDirection(null);
        };

        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, dragOffset, resizeDirection, minWidth, minHeight]);

    if (!windowState.isOpen || windowState.isMinimized) return null;

    return (
        <div
            ref={windowRef}
            className="fixed rounded-xl shadow-2xl border border-zinc-700/50 bg-[#1c1c1e]/90 backdrop-blur-xl flex flex-col pointer-events-auto"
            style={{
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                zIndex: windowState.zIndex,
            }}
            onMouseDown={() => focusWindow(id)}
        >
            {/* Window Header */}
            <div
                ref={headerRef}
                onMouseDown={handleMouseDown}
                className="h-10 bg-zinc-800/50 border-b border-zinc-700/30 flex items-center px-4 select-none cursor-default shrink-0"
            >
                <div className="flex gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 flex items-center justify-center text-black/0 hover:text-black/60 transition-colors"
                    >
                        <X size={8} strokeWidth={4} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/80 flex items-center justify-center text-black/0 hover:text-black/60 transition-colors"
                    >
                        <Minus size={8} strokeWidth={4} />
                    </button>
                    <button
                        className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 flex items-center justify-center text-black/0 hover:text-black/60 transition-colors"
                    >
                        <Maximize2 size={8} strokeWidth={4} />
                    </button>
                </div>
                <div className="flex-1 text-center text-sm font-medium text-zinc-400 truncate px-4">
                    {title}
                </div>
                <div className="w-14"></div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative">
                {children}
            </div>

            {/* Resize Handles */}
            {/* Right */}
            <div
                className="absolute top-0 right-0 w-1 h-full cursor-e-resize hover:bg-blue-500/50 transition-colors z-50"
                onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
            />
            {/* Bottom */}
            <div
                className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize hover:bg-blue-500/50 transition-colors z-50"
                onMouseDown={(e) => handleResizeMouseDown(e, 's')}
            />
            {/* Bottom-Right Corner */}
            <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-blue-500/50 transition-colors z-50 rounded-br-xl"
                onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
            />
        </div>
    );
};

export default Window;
