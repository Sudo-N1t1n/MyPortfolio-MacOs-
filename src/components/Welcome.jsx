import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Make it overall thicker and with a very small weight range
const FONT_WEIGHT = {
    subtitle: { min: 320, max: 420, default: 380 },
    title:    { min: 430, max: 540, default: 500 }, // solid-looking "portfolio"
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{
                display: "inline-block",
                fontVariationSettings: `"wght" ${baseWeight}`,
            }}
        >
      {char === " " ? "\u00A0" : char}
    </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHT[type];

    const animateLetter = (letter, weight, intensity, duration = 0.25) => {
        gsap.to(letter, {
            duration,
            ease: "power3.out",
            fontVariationSettings: `"wght" ${weight.toFixed(0)}`,
            y: -3 * intensity,             // very subtle lift
            scale: 1 + 0.04 * intensity,   // gentle scale so nothing gets chopped
            transformOrigin: "center bottom",
        });
    };

    const handleMouseMove = (e) => {
        letters.forEach((letter) => {
            const rect = letter.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2;
            const letterCenterY = rect.top + rect.height / 2;

            const dx = e.clientX - letterCenterX;
            const dy = e.clientY - letterCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxEffectDistance = 110;
            const clamped =
                1 - Math.min(distance, maxEffectDistance) / maxEffectDistance;

            const intensity = Math.max(0, clamped); // 0–1

            // Slight, tasteful variation: hover goes a bit *thinner*, but not too much
            const weight = base - (base - min) * intensity;

            animateLetter(letter, weight, intensity);
        });
    };

    const handleMouseLeave = () => {
        // Smooth, non-choppy return
        letters.forEach((letter) => {
            gsap.to(letter, {
                duration: 0.7,
                ease: "power2.inOut",
                fontVariationSettings: `"wght" ${base}`,
                y: 0,
                scale: 1,
                transformOrigin: "center bottom",
            });
        });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const cleanups = [];
        cleanups.push(setupTextHover(titleRef.current, "title"));
        cleanups.push(setupTextHover(subtitleRef.current, "subtitle"));

        return () => {
            cleanups.forEach((fn) => typeof fn === "function" && fn());
        };
    });

    return (
        <section id="welcome" className="px-8 py-16 overflow-visible">
            <p ref={subtitleRef}>
                {renderText(
                    "Hey! Nitin here, welcome to my",
                    "text-3xl font-georama",
                    FONT_WEIGHT.subtitle.default
                )}
            </p>

            <h1
                ref={titleRef}
                className="mt-7 leading-none overflow-visible"
            >
                {renderText(
                    "portfolio",
                    "text-9xl italic font-georama",
                    FONT_WEIGHT.title.default
                )}
            </h1>

            <div className="small-screen mt-6 text-sm opacity-70">
                this portfolio is designed for tablet and desktop screens only and may
                not work properly on small screens
            </div>
        </section>
    );
};

export default Welcome;
