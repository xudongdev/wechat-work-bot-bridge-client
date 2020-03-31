import { useMutation } from "@apollo/react-hooks";

import { UPDATE_WEBHOOK } from "../constants/webhook";

export default () => useMutation(UPDATE_WEBHOOK);
