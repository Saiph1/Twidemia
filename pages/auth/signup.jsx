import { useRouter } from "next/router"
import { useState } from "react";

async function createUser(data) {
  const endpoint = '/api/auth/signup';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(endpoint, options);
  const result = await response.json();

  if (!result.user) {
    console.log(result.message)
    throw new Error(result.message || 'Something went wrong!');
  }
  return result;
}

export default function SignupForm() {
  // Handles the submit event on form submit.
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [error, setError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      const result = await createUser(data);
      setMessage("success! please go to home page to login")
      setError(false)
      // router.push('/');
    } catch (error) {
      setMessage(error.message)
      setError(true)
      return;
    }
  }

  return (
    // We pass the event to the handleSubmit() function on submit.
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User Name</label>
        <input name='username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"required/>

        <label htmlFor="password">Password</label>
        <input name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="xxxxxxxxxxx"required/>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign in
        </button>
      </form>
      <div className={`colors ${error? "text-red-500" : "text-black-500"}`}>{message}</div>
    </>
  )
}
