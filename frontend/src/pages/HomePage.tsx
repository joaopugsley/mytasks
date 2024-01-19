import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <h1 className="text-4xl font-bold mb-3 text-center">Welcome to MyTasks</h1>
      <p className="text-lg text-gray-700 mb-5">
        Your personal task manager
      </p>
      <Link
        to={!isAuthenticated ? "/register" : "/tasks"}
        className="px-6 py-3 bg-black text-white rounded-md shadow-md transition duration-300 hover:bg-gray-900"
      >
        Get Started
      </Link>
    </main>
  );
};

export default HomePage;
