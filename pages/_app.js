import "@/styles/globals.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  if (Component.admin) {
    return (
      <SessionProvider session={session}>
        <Admin>
          <Component {...pageProps} />
        </Admin>
      </SessionProvider>
    );
  } else if (Component.verify) {
    return (
      <SessionProvider session={session}>
        <Verify>
          <Component {...pageProps} />
        </Verify>
      </SessionProvider>
    );
  } else if (Component.login) {
    return (
      <SessionProvider session={session}>
        <Login>
          <Component {...pageProps} />
        </Login>
      </SessionProvider>
    );
  } else if (Component.noLogin) {
    return (
      <SessionProvider session={session}>
        <NoLogin>
          <Component {...pageProps} />
        </NoLogin>
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

function Login({ children }) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  if (status === "loading") {
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
  } else if (!session.user.admin) {
    router.push("/");
    return <></>;
  }
  return children;
}
