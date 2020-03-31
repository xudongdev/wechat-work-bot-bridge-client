import { message } from "antd";
import ApolloClient from "apollo-boost";

const { SERVER_URL } = process.env;

export default new ApolloClient({
  uri: `${SERVER_URL}/graphql`,
  request: operation => {
    const token = localStorage.getItem("token");
    if (token) {
      operation.setContext({ headers: { authorization: `Bearer ${token}` } });
    }
  },
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors && graphQLErrors.length > 0) {
      message.error(graphQLErrors[0].message.error);

      graphQLErrors.some(graphQLError => {
        if (graphQLError.message.statusCode === 401) {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
          return true;
        }

        return false;
      });
    }
  }
});
