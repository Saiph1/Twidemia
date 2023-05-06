import Head from "next/head";
import dbConnect from "../lib/dbConnect";
import mongoose from "mongoose";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
// https://flowbite.com/blocks/marketing/login/

export default function Forgot() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [Dark, setDark] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();

    const sid = event.target.email_uid.value;
    const email = sid + "@link.cuhk.edu.hk";
    // check if sid is 10 digit with regular expression
    let isnum = /\d{10}/.test(sid);
    if (!isnum) {
      setMessage("Please enter a valid student ID.");
      setError(true);
      return;
    }
    console.log("email verification. ");
    const endpoint = "/api/token";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        type: "forgot",
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (!result.success) {
      setMessage("Account not registered.");
      setError(true);
    } else {
      setMessage(`An email has been sent to ${email}.`);
      setError(false);
    }
  }

  function handledark() {
    document.getElementById("container").className = Dark ? "dark" : "";
  }

  return (
    <>
      <Head>
        <title>Twidemia Login</title>
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <main class="" id="container">
        <section class="bg-gray-50 dark:bg-gray-900 min-h-screen">
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
              <div class="p-6 space-y-4 md:space-y-3 sm:p-8">
                <h1
                  class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Reset password
                </h1>
                <p class="text-gray-500 dark:text-gray-400 text-sm text-center">
                  A 6 digits token will be send to your CUHK email.
                </p>
                <form
                  class="space-y-4 md:space-y-6"
                  method="post"
                  action="/api/auth/callback/credentials"
                  onSubmit={handleSubmit}
                >
                  <br />
                  <div>
                    <label
                      for="email_uid"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Input your student ID :
                    </label>
                    <input
                      type="text"
                      name="email_uid"
                      id="email_uid"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your Student ID"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                  >
                    Send
                  </button>
                </form>
                {message ? (
                  <div className={error ? "text-red-500" : "text-gray-900"}>
                    {" "}
                    {message}
                  </div>
                ) : (
                  ""
                )}
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
    },
  };
}

Forgot.noLogin = true;
