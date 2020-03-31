import { useQuery } from "@apollo/react-hooks";
import { GET_BOTS } from "constants/bot";

export default () => {
  const result = useQuery(GET_BOTS);

  return {
    ...result.data,
    ...result
  };
};
