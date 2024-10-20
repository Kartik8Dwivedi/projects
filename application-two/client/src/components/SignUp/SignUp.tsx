import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    setError("");

    toast
      .promise(
        axios.post(import.meta.env.VITE_BACKEND_URI + `/register`, {
          name,
          email,
          password,
        }),
        {
          loading: "Registering...",
          success: <b>Registration successful!</b>,
          error: <b>Could not register.</b>,
        }
      )
      .then(() => {
        // Navigate only if registration is successful
        navigate("/signin");
      })
      .catch((error) => {
        // Show error toast and set the error message on failure
        toast.error("Signup failed, please try again.");
        setError(error.message || "Signup failed, please try again.");
      });
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" htmlFor="name-input">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name-input" // Add the id attribute to the input element
                  placeholder="name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email-input">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  id="email-input" // Add the id attribute to the input element
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
                  id="password-input" // Add the id attribute to the input element
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="confirm-password-input">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="confirm-password-input" // Add the id attribute to the input element
                  placeholder="confirm password"
                  className="input input-bordered"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="mt-4">
              <p>
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-500">
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
