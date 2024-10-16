import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

function App() {

  return (
    <>
      <div className="flex justify-center items-center pt-10">
        <NavBar />
      </div>
      <div className="flex justify-center items-center pt-14">
        <HeroSection />
      </div>
    </>
  );
}

export default App
