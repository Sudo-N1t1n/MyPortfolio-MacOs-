import { useContext } from "react";
import { WindowContext } from "../context/WindowContext";

const useWindow = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error("useWindow must be used within a WindowProvider");
    }
    return context;
};

export default useWindow;
