import { useMutation } from "@apollo/react-hooks";

import { SET_WEBHOOK_BOTS } from "../constants/webhook";

export default () => useMutation(SET_WEBHOOK_BOTS);
