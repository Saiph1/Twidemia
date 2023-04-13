import "@/styles/globals.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);
  if (Component.admin) {
    return (
      <SessionProvider session={session}>
        <Admin>{getLayout(<Component {...pageProps} />)}</Admin>
      </SessionProvider>
    );
  } else if (Component.verify) {
    return (
      <SessionProvider session={session}>
        <Verify>{getLayout(<Component {...pageProps} />)}</Verify>
      </SessionProvider>
    );
  } else if (Component.login) {
    return (
      <SessionProvider session={session}>
        <Login>{getLayout(<Component {...pageProps} />)}</Login>
      </SessionProvider>
    );
  } else if (Component.noLogin) {
    return (
      <SessionProvider session={session}>
        <NoLogin>{getLayout(<Component {...pageProps} />)}</NoLogin>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    );
  }
}

function Login({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  console.log("session");
  console.log(session);
  console.log(status);
  if (status === "loading") {
    return <></>;
  }
  if (session.verified) {
    console.log("nani");
    router.push("/");
    return <></>;
  }
  return children;
}

function Verify({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  if (status === "loading") {
    return <></>;
  }
  if (!session.verified) {
    router.push("/verify");
    return <></>;
  }
  return children;
}

function NoLogin({ children }) {
  const { status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <></>;
  } else if (status === "authenticated") {
    router.push("/");
    return <></>;
  }
  return children;
}

function Admin({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <></>;
  } else if (!session.admin) {
    router.push("/");
    return <></>;
  }
  return children;
}
