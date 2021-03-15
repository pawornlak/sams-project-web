import { ApolloClient } from "apollo-client"

import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import fetch from "isomorphic-unfetch"
import withApollo from "next-with-apollo"
import cookie from "cookie"
import { createUploadLink } from 'apollo-upload-client'

const uri = "https://sams-project-api.herokuapp.com/graphql/"
const client = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link: createUploadLink({
    uri,
  }),
});
const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext((_, { headers }) => {
  // Get token from cookies แต่ว่า next เป็น serverside rendering จึงเก็บไว้ใน local ไม่ได้ จึงเก็บไว้ใน cookies

  let cookies

  // Server side
  if (headers) {
    cookies = cookie.parse(header.cookie || "")
  }

  // Client side
  if (typeof window !== "undefined") {
    cookies = cookie.parse(document.cookie || "")
  }

  const token = (cookies && cookies.jwt) || ""

  //const token = JSON.parse(localStorage.getItem("jwt"))

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    },
    client: {client},
  }
})

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
    })
  },
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     )
  //   }
  // }
)