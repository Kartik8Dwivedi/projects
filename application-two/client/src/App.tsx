import axios from "axios";

function App() {
  const token = localStorage.getItem("token");

  axios
    .get(import.meta.env.VITE_BACKEND_URI + `/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <>
      <div>
        <p className="text-red-600">Hello there</p>
      </div>
    </>
  );
}

export default App;
