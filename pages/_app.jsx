import "@/styles/globals.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";

export const UserContext = createContext();
export const TweetContext = createContext();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [users, setUsers] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [check, setCheck] = useState(1);

  async function fetchData() {
    if (users.length) {
      fetch("/api/user/")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
          // console.log("fetched all user.");
        });
    } else {
      fetch("/api/user?fast=1")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
          // console.log("fast fetched all user.");
        });
      fetch("/api/user/")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
          // console.log("fetched all user.");
        });
    }
    fetch("/api/tweet/")
      .then((res) => res.json())
      .then((data) => {
        setTweets(data.data);
        // console.log("fetched all tweets.");
      });
  }

  useEffect(() => {
    fetchData();
    const id = setInterval(async () => {
      fetchData();
      setCheck(!check);
    }, 600000); // 2 mins
    return () => clearInterval(id);
  }, [check]);

  const getLayout = Component.getLayout || ((page) => page);
  const TweetUserLayoutComponent = (
    <TweetContext.Provider value={tweets}>
      <UserContext.Provider value={users}>
        {getLayout(<Component {...pageProps} />)}
      </UserContext.Provider>
    </TweetContext.Provider>
  );

  if (Component.admin) {
    return (
      <SessionProvider session={session}>
        <Admin>{TweetUserLayoutComponent}</Admin>
      </SessionProvider>
    );
  } else if (Component.verify) {
    return (
      <SessionProvider session={session}>
        <Verify>{TweetUserLayoutComponent}</Verify>
      </SessionProvider>
    );
  } else if (Component.noVerify) {
    return (
      <SessionProvider session={session}>
        <NoVerify>{TweetUserLayoutComponent}</NoVerify>
      </SessionProvider>
    );
  } else if (Component.noLogin) {
    return (
      <SessionProvider session={session}>
        <NoLogin>{TweetUserLayoutComponent}</NoLogin>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        {TweetUserLayoutComponent}
      </SessionProvider>
    );
  }
}

function NoVerify({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <></>;
  }
  if (session?.verified) {
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
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  const router = useRouter();
  if (status === "loading") {
    return <></>;
  } else if (!session.admin) {
    router.push("/");
    return <></>;
  }
  return children;
}
