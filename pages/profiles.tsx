import React, { useEffect } from "react";
import { NextPageContext } from "next";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  toast.success("Successfully logged in!");

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  useEffect(() => {
    toast.success("Successfully logged in!");
  }, []);

  return (
    <div className="flex items-center h-full justify-center bg-gray-800">
      <div className="flex flex-col text-center">
        <div className="text-3xl md:text-6xl text-white mb-4">
          User: <span className="font-bold">{user?.name}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 mt-10">
        <div onClick={() => router.push("/")}>
          <div className="group flex-row width-44 mx-auto">
            <div className="max-w-xs transition duration-300 ease-in-out hover:scale-110 mb-10 ml-10">
              <img src="/images/avtar.png" alt="User Avatar" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Profiles;
