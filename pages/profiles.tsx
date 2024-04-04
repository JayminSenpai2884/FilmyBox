import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast.success("Successfully logged in!✅");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg animate__animated animate__fadeInUp flex flex-col items-center gap-10">
        <div className="flex items-center gap-10 mt-10">
          <div
            onClick={() => router.push("/")}
            className="group flex-row width-44 mx-auto cursor-pointer"
          >
            <div className="max-w-xs transition duration-300 ease-in-out hover:scale-110 mb-10 ml-10">
              <img
                src="/images/avtar.png"
                alt="User Avatar"
                className="rounded-full shadow-lg w-64 h-64"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2w">
            <div className="text-3xl md:text-6xl text-white">
              <span className="font-bold">{user?.name}</span>
            </div>
            <div className="text-2xl md:text-4xl text-white">
              <span className=" text-2xl">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Profiles;
