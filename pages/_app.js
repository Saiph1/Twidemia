import "@/styles/globals.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  if (Component.login) {
    return (
      <SessionProvider session={session}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ 
    required: true,
    onUnauthenticated() {
      signIn();
    }
  })
  if (status === "loading") {
    return <></>;
  }
  return children;
}
