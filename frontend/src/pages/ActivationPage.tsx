import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { extractNestErrorMessage } from "../utils/extractNestErrorMessage";
import { AxiosError } from "axios";

type ActivateAccountAPIResponse = {
  success: boolean;
}

const ActivationPage = () => {
  const { key } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const activateAccount = async () => {
      setLoading(true);
      try {
        await api.post<ActivateAccountAPIResponse>(`/api/users/activate?activation_key=${key}`);
        setSuccess(true);
      } catch(error) {
        console.error(error);
        const err = error as AxiosError;
        const e = extractNestErrorMessage(err);
        setError(e);
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    }
    activateAccount();
  }, [key, setLoading, setSuccess, setError]);

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <h1 className="text-4xl font-bold mb-3 text-center">Account Activation</h1>
      {
        loading ? (
          <>
            <p className="text-lg text-gray-700">
              Please wait, your account is being activated...
            </p>
          </>
        ) : (
          <>
            {
              success ? (
                <>
                  <p className="text-lg text-gray-700 mb-2">
                    Your account has been <a className="text-emerald-500 font-bold">successfully</a> activated.
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    You can now log in to access your tasks.
                  </p>
                  <Link to="/login" className="px-6 py-3 mt-3 bg-black text-white rounded-md shadow-md transition duration-300 hover:bg-gray-900">
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-700 mb-1">
                    We couldn't activate your account right now :/
                  </p>
                  <p className="text-lg text-red-600 mt-1">
                    {error}
                  </p>
                </>
              )
            }
          </>
        )
      }
    </main>
  );
};

export default ActivationPage;