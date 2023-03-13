import { getCsrfToken, getProviders } from "next-auth/react"

export default function SignIn({ csrfToken, error, providers}) {
  if (!providers.credentials)
    throw new Error('provider not supported')

  let error_message = ""
  if (error === 'CredentialsSignin') {
    error_message = 'Please check your email or password'
  }
  return (
    <>
      <a>Either signin with username=password, or use a registered username and password</a>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} /><br/>
        <label>
          Username:
        <input name='username' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"required/>
        </label><br/>
        <label>
          Password:
        <input name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="xxxxxxxxxxx"required/>
        </label><br/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign in
        </button>
      </form>
      {error ? (<div className='text-red-500'> Error : {error_message}</div>) : ""}
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: await getProviders(context),
      error: context.query.error || null,
    },
  }
}
