import { useMutation } from "@apollo/react-hooks";

import { SET_SCHEDULE_BOTS } from "../constants/schedule";

export default () => useMutation(SET_SCHEDULE_BOTS);
