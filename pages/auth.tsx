import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bg-[url('/images/hero.jpg')]

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggalVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant == "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });

      toast.success("Successfully logged in!");
    } catch (error) {}
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();

      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/bg.jpg')] shadow-lg bg-fixed bg-cover transition">
      <div className="bg-black w-full h-full lg:bg-opacity-75 transition">
        <nav className="px-12 py-6">
          <img
            src="/images/logo.png"
            className="w-30 h-12 transition duration-300 ease-in-out transform hover:scale-110"
            alt="Logo"
            id="logo"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md isolate aspect-video w-96 rounded-xl bg-black/80 shadow-lg ring-1 ring-black/2 transition hover:bg-opacity-60">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant == "login" ? "Sign in" : "Create an account"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  type=""
                  value={name}
                ></Input>
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              ></Input>

              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              ></Input>
            </div>
            <button
              onClick={variant == "login" ? login : register}
              className="bg-blue-500 py-3 text-white rounded-md w-full mt-10 hover:bg-blue-700 transition"
            >
              {variant == "login" ? "Log in" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                  "
              >
                <FcGoogle size={40}></FcGoogle>
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant == "login"
                ? "Not have an Account for Filmybox?"
                : "Have an account Already :)"}
              <span
                onClick={toggalVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant == "login" ? "Create an Account" : "Log-in"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Auth;
