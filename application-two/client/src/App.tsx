import toast, { Toaster } from "react-hot-toast";
import Dashboard from "./components/Dashboard/Dashboard";
import Threshold from "./components/Threshold/Threshold";
import NavBar from "./components/Navbar/Navbar";

function App() {
  toast.success("Welcome to the Weather App!");
    toast( 
    "Click on these cards to checkout the aggregated results of the day!\n\nIt is updated at every hour, hence it gives a better understanding of the weather conditions.",
    {
      duration: 6000,
    }
  );
  return (
    <div className="overflow-hidden bg-secondary/10">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex flex-col justify-center items-center w-screen h-full overflow-hidden">
        <NavBar />
        <Threshold />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
