import "../styles/globals.scss";
import AuthProvider from "../appState/AuthProvider";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "../apollo/apolloclient";
import fetch from "isomorphic-unfetch";
import cookie from "cookie";
import Cookies from "js-cookie";

const QUERY_USER = {
  query: `
    query {
      getOneUser
      {
        name
      }
    }
  `,
};

function MyApp({ Component, pageProps, apollo, user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps;
  }

  const { headers } = ctx.req;
  console.log(ctx.req.headers);

  const cookies = headers && cookie.parse(headers.cookie || "");

  const token = cookies && cookies.jwt;
  console.log(token);

  if (!token) {
    if (router.pathname === "/post" || router.pathname === "/profile") {
      ctx.res.writeHead(302, { Location: "/login" })
      ctx.res.end()
    }
    return null
  }

  const response = await fetch("http://localhost:4000/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || "",
    },
    body: JSON.stringify(QUERY_USER),
  });

  if (response.ok) {
    const result = await response.json();
    return { user: result.data.getOneUser };
  } else {
    if (router.pathname === "/post" || router.pathname === "/profile") {
      ctx.res.writeHead(302, { Location: "/login" })
      ctx.res.end()
    }

    return null;
  }
};

export default apolloClient(MyApp);
