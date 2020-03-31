import { useQuery } from "@apollo/react-hooks";
import { GET_WEBHOOKS } from "constants/webhook";

export default () => {
  const result = useQuery(GET_WEBHOOKS);

  return {
    ...result.data,
    ...result
  };
};
