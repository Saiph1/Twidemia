import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";

async function createUser(data) {
  const endpoint = "/api/auth/signup";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, options);
  const result = await response.json();

  if (!result.user) {
    console.log(result.message);
    throw new Error(result.message || "Something went wrong!");
  }
  return result;
}

// https://flowbite.com/blocks/marketing/login/
export default function Signup() {
  const router = useRouter();

  const { status, data: session } = useSession();

  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirm: event.target.password_confirm.value,
    };
    if (data.password.length < 4) {
      setMessage("Password length should be at least 4");
      setError(true);
      return;
    }
    if (data.password != data.password_confirm) {
      console.log(data.password);
      console.log(data.password_confirm);
      setMessage("Password are not same");
      setError(true);
      return;
    }
    try {
      const result = await createUser(data);
      setMessage(
        `Success! please go to home page to login.\nRedirecting in ${5} seconds ...`
      );
      setError(false);
      setTimeout(5000);
      router.push("/");
    } catch (error) {
      setMessage(error.message);
      setError(true);
      return;
    }
  }

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
                        type="email"
                        name="email"
                        id="email"
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
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
