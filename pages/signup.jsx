import Head from "next/head";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

// create user
async function createUser(data) {
  const endpointUser = "/api/auth/signup";
  const optionsUser = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const responseUser = await fetch(endpointUser, optionsUser);
  const resultUser = await responseUser.json();

  if (resultUser.user) {
    console.log(resultUser.user);
    const endpointToken = "/api/token";
    const optionsToken = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        type: "verify",
      }),
    };

    const responseToken = await fetch(endpointToken, optionsToken);
    const resultToken = await responseToken.json();

    if (!resultToken.token) {
      throw new Error(resultToken.message || "Something went wrong!");
    }
  } else {
    throw new Error(resultUser.message || "Something went wrong!");
  }
}

// https://flowbite.com/blocks/marketing/login/
export default function Signup() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [Dark, setDark] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    let errorTmp = false;
    let messageTmp = "";
    const data = {
      email: event.target.email.value,
      username: event.target.username.value,
      userId: event.target.userId.value,
      password: event.target.password.value,
      year: event.target.year.value,
      faculty: event.target.faculty.value,
      password_confirm: event.target.password_confirm.value,
    };
    // input validation
    let emailFormat = /^\d{10}@link.cuhk.edu.hk$/.test(data.email);
    if (!emailFormat) {
      messageTmp = "Please use a cuhk email that ends with @link.cuhk.edu.hk\n";
      errorTmp = true;
    }
    if (data.password.length < 4) {
      messageTmp = "Password length should be at least 4\n";
      errorTmp = true;
    }
    if (data.password != data.password_confirm) {
      messageTmp = "Passwords are not same\n";
      errorTmp = true;
    }
    setMessage(messageTmp);
    setError(errorTmp);
    if (errorTmp) return;
    else
      try {
        setMessage("Loading...");
        setError(false);
        await createUser(data);
        setMessage(
          "Success! Please check your email to verify your account.\n"
        );
        signIn("credentials", {
          redirect: false,
          password: data.password,
          email_uid: data.email,
        });
        setError(false);
        setTimeout(10000);
        // router.push("verify");
      } catch (error) {
        setMessage(error.message);
        setError(true);
        return;
      }
  }

  function handledark() {
    document.getElementById("signup_container").className = Dark ? "dark" : "";
  }

  return (
    <>
      <Head>
        <title>Twidemia Login</title>
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      <main class="" id="signup_container">
        <section
          className={`${
            Dark ? "light-fancy-background" : "dark-fancy-background"
          } min-h-[100vh]`}
        >
          <button
            onClick={() => {
              setDark(!Dark);
              handledark();
            }}
          >
            {!Dark && (
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
            {Dark && (
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
            >
              {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
                Flowbite     */}
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up your account
                </h1>
                <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="StudentID@link.cuhk.edu.hk"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="username"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="username"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="userId"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your userId
                    </label>
                    <input
                      type="userId"
                      name="userId"
                      id="userId"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="userId"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="faculty"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your faculty
                      <select
                        name="faculty"
                        id="faculty"
                        class="placeholder:text-gray-300 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option disabled selected value>
                          {" "}
                          -- Select your faculty --{" "}
                        </option>
                        <option value="Faculty of Arts">Faculty of Arts</option>
                        <option value="Faculty of Business Adminstration">
                          Faculty of Business Adminstration
                        </option>
                        <option value="Faculty of Education">
                          Faculty of Education
                        </option>
                        <option value="Faculty of Engineering">
                          Faculty of Engineering
                        </option>
                        <option value="Faculty of Law">Faculty of Law</option>
                        <option value="Faculty of Medicine">
                          Faculty of Medicine
                        </option>
                        <option value="Faculty of Science">
                          Faculty of Science
                        </option>
                        <option value="Faculty of Social Science">
                          Faculty of Social Science
                        </option>
                        <option value="Graduate School">Graduate School</option>
                        <option value="Other Academic Units">
                          Other Academic Units
                        </option>
                      </select>{" "}
                    </label>
                  </div>
                  <div>
                    <label
                      for="year"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your admission year
                    </label>
                    <input
                      type="number"
                      name="year"
                      // value="2023"
                      min="2000"
                      max="2050"
                      id="year"
                      class="placeholder:text-gray-300 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      placeholder="Your password •••"
                      class="placeholder:text-gray-300 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="password_confirm"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm your password
                    </label>
                    <input
                      type="password"
                      name="password_confirm"
                      id="password_confirm"
                      placeholder="Your password •••"
                      class="placeholder:text-gray-300 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  {message ? (
                    <div className={error ? "text-red-500" : "text-gray-900"}>
                      {" "}
                      {message}
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    class=" w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                  >
                    Sign up
                  </button>
                </form>
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

Signup.noLogin = true;
