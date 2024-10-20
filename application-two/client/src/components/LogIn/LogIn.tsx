import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    toast
      .promise(
        axios.post(import.meta.env.VITE_BACKEND_URI + `/login`, {
          email,
          password,
        }),
        {
          loading: "Signing in...",
          success: <b>Sign in successful!</b>,
          error: <b>Could not sign in.</b>,
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Invalid email or password");
        setError("Invalid email or password");
      });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign In</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="email-input">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email-input"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password-input">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password-input"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-4">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
