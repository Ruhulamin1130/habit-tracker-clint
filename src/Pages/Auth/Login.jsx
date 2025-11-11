import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }

    toast.info("Logging in...");

    signInUser(email, password)
      .then((result) => {
        toast.success("Logged in successfully!");
        event.target.reset();
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };

  const handleGoogleSignIn = () => {
    toast.info("Signing in with Google...");
    signInWithGoogle()
      .then((result) => {
        toast.success("Signed in successfully with Google!");
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error("Google sign-in failed: " + error.message);
      });
  };

  return (
    <div className="card bg-base-100 my-10 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn text-white mt-4 rounded-full bg-linear-to-r from-pink-500 to-red-600">
              Login
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5] mt-4 flex items-center justify-center gap-2"
        >
          <FaGoogle />
          Login with Google
        </button>

        <p className="text-center mt-4">
          New to our website? Please{" "}
          <Link
            className="text-blue-500 hover:text-blue-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
