import { openNotificationWithIcon } from "@/app/(userroute)/_components/TostProvider";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { redirect } from "next/navigation";

const getClient = (token?: string) => {
  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_ENDPOIN,
  });

  // const errorLink = onError(({ graphQLErrors, networkError }) => {
  //   console.log(graphQLErrors, "graphQLErrors");
  //   if (graphQLErrors)
  //     graphQLErrors.forEach(({ message, locations, path }) =>
  //       // openNotificationWithIcon()
  //       console.log(
  //         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //       )
  //     );
  //   if (networkError) console.log(`[Network error]: ${networkError}`);
  // });

  const errorLink = onError((options) => {
    const { graphQLErrors, networkError, response } = options;

    if (networkError && networkError?.statusCode === 405) {
      if (networkError?.result?.message) {
        openNotificationWithIcon("error", networkError?.result?.message);
      }
      redirect("login");
    }

    if (graphQLErrors?.length > 0) {
      const isForBidden = graphQLErrors?.[0]?.extensions?.code === "FORBIDDEN";

      if (!isForBidden) {
        openNotificationWithIcon("error", graphQLErrors?.[0]?.message);
      }
    } else {
      openNotificationWithIcon("error", "Something went wrong!");
    }

    if (response) {
      response?.errors?.map((error) => {
        const { message: errorMessage, locations, path, extensions } = error;

        // commenting for future use - SENTRY_INIT
        // Sentry?.captureException(
        //   new Error(
        //     `[Response error]: Message: ${errorMessage}, Location: ${locations}, Path: ${path}`,
        //   ),
        // );
        if (extensions?.code === "SESSION_EXPIRED") {
          redirect("/login");
        }
        if (extensions?.code === "FORBIDDEN") {
          redirect("/access-denied");
        }

        if (
          extensions?.code === "UNAUTHENTICATED" ||
          extensions?.code === 405 ||
          extensions?.code === "INVALID_TOKEN" ||
          extensions?.exception?.name === "JsonWebTokenError"
        ) {
          redirect("/login");
        }

        // eslint-disable-next-line no-console
        return console?.log(
          `[Response error]: Message: ${errorMessage}, Location: ${locations}, Path: ${path}`
        );
      });
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console?.log(`[Network error]: ${networkError}`);
      // commenting for future use - SENTRY_INIT
      // Sentry?.captureException(new Error(`[Network error]: ${networkError}`));
    }
  });

  const authMiddleware = setContext((operation, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: from([authMiddleware, httpLink, errorLink]),
    cache: new InMemoryCache(),
  });
};

export default getClient;
