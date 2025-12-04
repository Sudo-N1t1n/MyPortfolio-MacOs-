import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps } from "#constants";
import useWindow from "../hooks/useWindow";

gsap.registerPlugin(useGSAP);

const Dock = () => {
    const dockRef = useRef(null);
    const { windows, toggleWindow } = useWindow();

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = Array.from(dock.querySelectorAll("[data-dock-icon]"));

        const maxScale = 1.4; // smaller magnification
        const spread = 90;    // slightly tighter spread

        const handleMouseMove = (e) => {
            const mouseX = e.clientX;

            icons.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;

                const distance = Math.abs(mouseX - centerX);
                const clamped =
                    1 - Math.min(distance, spread) / spread; // 0..1

                const intensity = Math.max(0, clamped);
                const scale = 1 + (maxScale - 1) * intensity;
                const lift = 8 * intensity;

                gsap.to(btn, {
                    scale,
                    y: -lift,
                    duration: 0.18,
                    ease: "power3.out",
                });
            });
        };

        const handleMouseLeave = () => {
            icons.forEach((btn) => {
                gsap.to(btn, {
                    scale: 1,
                    y: 0,
                    duration: 0.25,
                    ease: "power2.inOut",
                });
            });
        };

        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", handleMouseLeave);
        };
    });

    const handleMouseEnter = (e) => {
        gsap.to(e.currentTarget, {
            y: -10,
            duration: 0.3,
            ease: "back.out(2)",
        });
    };

    const handleMouseLeaveIcon = (e) => {
        gsap.to(e.currentTarget, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <div className="pointer-events-none fixed bottom-4 left-0 right-0 z-30 flex justify-center">
            <div
                ref={dockRef}
                className="
          pointer-events-auto
          flex items-end gap-2
          px-3 py-2
          rounded-2xl
          bg-zinc-900/75
          border border-zinc-700/60
          shadow-[0_16px_40px_rgba(0,0,0,0.65)]
          backdrop-blur-2xl
        "
            >
                {dockApps.map((app) => (
                    <button
                        key={app.id}
                        data-dock-icon
                        onClick={() => app.canOpen && toggleWindow(app.id)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeaveIcon}
                        className="
              group
              relative
              flex items-center justify-center
              focus:outline-none
            "
                    >
                        {/* Mac-style label above icon on hover */}
                        <span
                            className="
                pointer-events-none
                absolute
                -top-10
                px-2 py-[2px]
                rounded-md
                bg-zinc-900/95
                text-[10px] md:text-xs
                text-zinc-100
                opacity-0
                translate-y-1
                group-hover:opacity-100
                group-hover:translate-y-0
                transition-all
                whitespace-nowrap
                shadow-[0_4px_12px_rgba(0,0,0,0.5)]
              "
                        >
                            {app.label || app.name}
                        </span>

                        <div
                            className="
                h-9 w-9
                md:h-10 md:w-10
                rounded-2xl
                overflow-hidden
                shadow-lg shadow-black/40
              "
                        >
                            <img
                                src={`/images/${app.icon}`}
                                alt={app.name}
                                className="h-full w-full object-contain"
                                draggable="false"
                            />
                        </div>

                        {/* Open Indicator */}
                        {windows[app.id]?.isOpen && (
                            <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full opacity-80" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dock;
