import { useMutation } from "@apollo/react-hooks";

import { CREATE_SCHEDULE, GET_SCHEDULES } from "../constants/schedule";

export default () =>
  useMutation(CREATE_SCHEDULE, {
    update(cache, { data: { createSchedule } }) {
      try {
        const { schedules } = cache.readQuery({ query: GET_SCHEDULES });
        cache.writeQuery({
          query: GET_SCHEDULES,
          data: { schedules: schedules.concat([createSchedule]) }
        });
      } catch (err) {
        // ...
      }
    }
  });
