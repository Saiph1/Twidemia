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
  // Just a simple example for testing backend
  const handleclick = () => {
    fetch("api/user", { method: "POST" }).then(() => console.log("success."));
  };

  if (!providers.credentials) throw new Error("provider not supported");

  const router = useRouter();
  const { status, data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(event) {
    const data = {
      email_uid: event.target.email_uid.value,
      password: event.target.password.value,
    };
    // front end checking can be done here. currently there is no checking
    if (data.email_uid === "catch it") {
      event.preventDefault();
      setErrorMessage("catch some problem in email / uid");
    }
  }

  // set error message
  useEffect(() => {
    if (error === "CredentialsSignin") {
      setErrorMessage("Please check your email or password");
    }
  }, []);

  if (status === "loading") {
    return <></>;
  } else if (status === "authenticated") {
    router.push("/");
  } else
    return (
      <>
        <Head>
          <title>Twidemia Login</title>
          <link rel="icon" href="/Twidemia-logo.png" />
        </Head>

        <main>
          <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a
                href="#"
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Flowbite     */}
              </a>
              <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                        placeholder="name@company.com"
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
                      <div className="text-red-500">
                        {" "}
                        Error : {errorMessage}
                      </div>
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
                        href="#"
                        class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-800 dark:text-white"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Login
                    </button>

                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <Link
                        href="/signup"
                        class="font-medium text-primary-600 hover:underline dark:text-white"
                      >
                        {" "}
                        Sign up
                      </Link>
                    </p>
                  </form>
                  <button
                    class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleclick}
                  >
                    Backend testing button
                  </button>
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
