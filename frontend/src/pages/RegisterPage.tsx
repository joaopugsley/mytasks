import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button } from "../components/Button/Button";
import { AxiosError } from "axios";
import { api } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import { extractNestErrorMessage } from "../utils/extractNestErrorMessage";

type RegisterAPIResponse = {
  user_id: number;
  success: boolean;
  message: string;
}

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayPassword, setDisplayPassword] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // hide password
    setDisplayPassword(false);
    // start loading
    setLoading(true);
    try {
      // try create account
      const response = await api.post<RegisterAPIResponse>('/api/users/', {
        username,
        password,
        email,
      });
      // account created
      if (response.data.success === true) {
        setSuccess(true);
        setMessage(response.data.message);
      }
    } catch(err) {
      const e = err as AxiosError;
      const errorMessage = extractNestErrorMessage(e);
      setSuccess(false);
      setMessage(errorMessage);
    } finally {
      // stop loading
      setLoading(false);
    }
  }

  useEffect(() => {
    // redirect user to /tasks page
    if (isAuthenticated) {
      navigate('/tasks', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex flex-col items-center justify-center max-w-full h-screen bg-white">
      <h1 className="text-3xl font-bold mb-2 text-center">
        Create Your
        <br/>
        MyTasks Account
      </h1>
      <p className="text-lg text-gray-700 mb-2">
        or <Link to="/login" className="text-blue-900 hover:text-gray-900">sign in to your account</Link>
      </p>
      <div className="flex flex-col gap-5 justify-center items-center">
        {
          !isLoading && message !== '' ? (
            <div className={`max-w-72 h-auto mt-2 px-4 py-3 rounded-md border break-words overflow-hidden text-center ${!success ? 'border-red-300 bg-red-200' : 'border-emerald-300 bg-emerald-200'}`}>
              {message}
            </div>
          ) : <></>
        }
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
          <label htmlFor="email" className="select-none">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border bg-gray-100 rounded px-3 py-2 select-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username" className="select-none">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="border bg-gray-100 rounded px-3 py-2 select-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="select-none">Password</label>
          <div className="relative flex flex-row justify-center items-center">
            <input
              type={displayPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="border bg-gray-100 rounded px-3 py-2 pr-8 select-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="absolute right-3 w-fit h-fit hover:scale-110" onClick={() => setDisplayPassword((state) => !state)}>
              {
                displayPassword ? <GoEye/> : <GoEyeClosed/>
              }
            </button>
          </div>
          <Button type='submit' disabled={isLoading} className="mt-3">
            {isLoading ? "Creating your account..." : "Create your Account!"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;