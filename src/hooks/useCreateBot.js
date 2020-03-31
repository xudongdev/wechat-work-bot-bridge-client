import { useMutation } from "@apollo/react-hooks";

import { CREATE_BOT, GET_BOTS } from "../constants/bot";

export default () =>
  useMutation(CREATE_BOT, {
    update(cache, { data: { createBot } }) {
      try {
        const { bots } = cache.readQuery({ query: GET_BOTS });
        cache.writeQuery({
          query: GET_BOTS,
          data: { bots: bots.concat([createBot]) }
        });
      } catch (err) {
        // ...
      }
    }
  });
