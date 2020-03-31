import { useMutation } from "@apollo/react-hooks";

import { UPDATE_SCHEDULE } from "../constants/schedule";

export default () => useMutation(UPDATE_SCHEDULE);
