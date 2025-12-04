import React, { createContext, useState, useCallback } from "react";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

export const WindowContext = createContext(null);

export const WindowProvider = ({ children }) => {
    const [windows, setWindows] = useState(WINDOW_CONFIG);
    const [activeWindowId, setActiveWindowId] = useState(null);
    const [maxZIndex, setMaxZIndex] = useState(INITIAL_Z_INDEX + 1);

    const focusWindow = useCallback((id) => {
        setWindows((prev) => {
            if (prev[id].zIndex === maxZIndex) return prev; // Already on top

            const newMaxZIndex = maxZIndex + 1;
            setMaxZIndex(newMaxZIndex);

            return {
                ...prev,
                [id]: { ...prev[id], zIndex: newMaxZIndex, isMinimized: false },
            };
        });
        setActiveWindowId(id);
    }, [maxZIndex]);

    const openWindow = useCallback((id, data = null) => {
        setWindows((prev) => {
            const isOpen = prev[id]?.isOpen;
            if (isOpen) {
                // If already open, just focus it
                // We need to call focusWindow, but we can't call it inside setState easily without refs or effects.
                // So we'll handle the zIndex update here directly to avoid race conditions or complex effects.
                const newMaxZIndex = maxZIndex + 1;
                setMaxZIndex(newMaxZIndex);
                setActiveWindowId(id);

                return {
                    ...prev,
                    [id]: { ...prev[id], isMinimized: false, zIndex: newMaxZIndex, data: data || prev[id].data }
                };
            }

            const newMaxZIndex = maxZIndex + 1;
            setMaxZIndex(newMaxZIndex);
            setActiveWindowId(id);

            return {
                ...prev,
                [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newMaxZIndex, data },
            };
        });
    }, [maxZIndex]);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isOpen: false, data: null },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) => ({
            ...prev,
            [id]: { ...prev[id], isMinimized: true },
        }));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const toggleWindow = useCallback((id) => {
        setWindows((prev) => {
            const windowState = prev[id];
            if (windowState.isOpen && !windowState.isMinimized) {
                // If open and focused, minimize it? Or just focus if not focused?
                // Mac behavior: clicking dock icon of focused app does nothing usually, or minimizes if configured.
                // Let's say if it's the active window, we minimize it.
                // Actually standard behavior: if minimized, restore. If open but not focused, focus.
                // If open and focused, do nothing (or maybe minimize if we want that behavior).
                // Let's implement: If minimized -> restore. If not active -> focus.

                // But we don't have easy access to "activeWindowId" inside this functional update if we want to be pure.
                // We'll use the closure value.

                if (windowState.isMinimized) {
                    const newMaxZIndex = maxZIndex + 1;
                    setMaxZIndex(newMaxZIndex);
                    setActiveWindowId(id);
                    return { ...prev, [id]: { ...prev[id], isMinimized: false, zIndex: newMaxZIndex } };
                }

                // If it is already open and not minimized
                // We should check if it's the top one.
                // For simplicity in this toggle: always bring to front.
                const newMaxZIndex = maxZIndex + 1;
                setMaxZIndex(newMaxZIndex);
                setActiveWindowId(id);
                return { ...prev, [id]: { ...prev[id], zIndex: newMaxZIndex } };
            }

            // If not open, open it
            const newMaxZIndex = maxZIndex + 1;
            setMaxZIndex(newMaxZIndex);
            setActiveWindowId(id);
            return {
                ...prev,
                [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newMaxZIndex },
            };
        });
    }, [maxZIndex]);

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                openWindow,
                closeWindow,
                focusWindow,
                minimizeWindow,
                toggleWindow,
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};
