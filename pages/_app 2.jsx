import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => page);

  // if(Component.getLayout) {
  //   return (
  //     <SessionProvider session={session}>
  //       {
  //         Component.getLayout(<Component {...pageProps} />)
  //       }
  //     </SessionProvider>
  //   )
  // }
  return (
    <SessionProvider session={session}>
      {/* <Layout>
        <Component {...pageProps} />
      </Layout> */}
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}
