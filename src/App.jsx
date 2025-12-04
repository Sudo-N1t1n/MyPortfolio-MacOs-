import Navbar from "#components/AppleMenuBar.jsx";
import Welcome from "#components/Welcome.jsx";
import Dock from "#components/Dock.jsx";
import Desktop from "#components/Desktop.jsx";
import { WindowProvider } from "./context/WindowContext";

const App = () => {
    return (
        <WindowProvider>
            <main className="h-screen w-screen overflow-hidden relative bg-[url('/images/wallpaper.png')] bg-cover bg-center">
                <Navbar />
                <Welcome />
                <Desktop />
                <Dock />
            </main>
        </WindowProvider>
    );
};

export default App;
