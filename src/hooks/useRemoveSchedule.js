import { useMutation } from "@apollo/react-hooks";

import { GET_SCHEDULES, REMOVE_SCHEDULE } from "../constants/schedule";

export default () =>
  useMutation(REMOVE_SCHEDULE, {
    update(cache, { data: { removeSchedule } }) {
      try {
        const { schedules } = cache.readQuery({ query: GET_SCHEDULES });
        cache.writeQuery({
          query: GET_SCHEDULES,
          data: {
            schedules: schedules.filter(
              schedule => schedule.id !== removeSchedule.id
            )
          }
        });
      } catch (err) {
        // ...
      }
    }
  });
