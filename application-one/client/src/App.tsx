import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <div className="flex justify-center items-center pt-10">
        <NavBar />
      </div>
      <div className="flex justify-center items-center pt-14">
        <HeroSection />
      </div>
    </>
  );
}

export default App;
