import Head from "next/head";
import dbConnect from "../lib/dbConnect";
import mongoose from "mongoose";
import { getCsrfToken, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
// https://flowbite.com/blocks/marketing/login/

export default function Login({ csrfToken, error, providers }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [Dark, setDark] = useState(false); // Default white theme, used in rendering the toggle button.

  /*
  // Just a simple example for testing backend
  const handleclick = () => {
    fetch("api/user", { method: "POST" }).then(() => console.log("success."));
  };
  */

  if (!providers.credentials) throw new Error("provider not supported");

  function handleSubmit(event) {
    const data = {
      email_uid: event.target.email_uid.value,
      password: event.target.password.value,
    };
  }

  // handle function for the button click event, setting the class of the container to dark, tailwind uses this to determine the dark scheme.
  function handledark() {
    document.getElementById("login_container").className = Dark ? "" : "dark";
  }

  // set error message
  useEffect(() => {
    if (error === "CredentialsSignin") {
      setErrorMessage("Please check your email or password");
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Twidemia Login</title>
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <main class="" id="login_container">
        <section
          className={`${
            Dark ? "dark-fancy-background" : "light-fancy-background"
          } min-h-[100vh]`}
        >
          <button
            onClick={() => {
              setDark(!Dark);
              handledark();
            }}
          >
            {Dark && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
                style={{ margin: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            )}
            {!Dark && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
                style={{ margin: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                />
              </svg>
            )}
          </button>
          <div class="flex flex-col items-center justify-start md:justify-start px-6 mx-auto py-12 lg:py-0">
            <a
              href="#"
              class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            ></a>

            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Login in to your account
                </h1>
                <form
                  class="space-y-4 md:space-y-6"
                  method="post"
                  action="/api/auth/callback/credentials"
                  onSubmit={handleSubmit}
                >
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <br />
                  <div>
                    <label
                      for="email_uid"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email / User ID
                    </label>
                    <input
                      type="text"
                      name="email_uid"
                      id="email_uid"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="StudentID@link.cuhk.edu.hk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {errorMessage ? (
                    <div className="text-red-500"> Error : {errorMessage}</div>
                  ) : (
                    ""
                  )}
                  <div class="flex items-center justify-between">
                    <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        />
                      </div>
                      <div class="ml-3 text-sm">
                        <label
                          for="remember"
                          class="text-gray-500 dark:text-white"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="forgot"
                      class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-800 dark:text-white"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                  >
                    Login
                  </button>

                  <p
                    class="text-sm font-light text-gray-500 dark:text-gray-400"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Don’t have an account yet? &nbsp;{" "}
                    <Link
                      href="/signup"
                      class="font-medium text-primary-600 hover:underline dark:text-white"
                    >
                      {" "}
                      Sign up
                    </Link>
                  </p>
                </form>
    {

      /*
                <button
                  class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                >
                  Backend testing button
                </button>
                */
                }
              </div>
            </div>
          </div>
        </section>
        {/* Sidebar */}

        {/* Model */}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  let isDbConnected = false;
  try {
    // Try to connect the DB.
    if (await dbConnect()) isDbConnected = true;
  } catch (e) {
    // If it cannot connect to DB, output log to console by using error flag.
    console.error(e);
  }

  // Show the mongoose connection status in back end.
  console.log(mongoose.connection.readyState);

  // Return all post and login status by props.
  return {
    props: {
      isDbConnected,
      csrfToken: await getCsrfToken(context),
      providers: await getProviders(context),
      error: context.query.error || null,
    },
  };
}

Login.noLogin = true;
