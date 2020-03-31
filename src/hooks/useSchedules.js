import { useQuery } from "@apollo/react-hooks";
import { GET_SCHEDULES } from "constants/schedule";

export default () => {
  const result = useQuery(GET_SCHEDULES);

  return {
    ...result.data,
    ...result
  };
};
