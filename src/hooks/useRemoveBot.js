import { useMutation } from "@apollo/react-hooks";

import { GET_BOTS, REMOVE_BOT } from "../constants/bot";
import { GET_WEBHOOKS } from "../constants/webhook";

export default () =>
  useMutation(REMOVE_BOT, {
    update(cache, { data: { removeBot } }) {
      try {
        const { bots } = cache.readQuery({ query: GET_BOTS });
        cache.writeQuery({
          query: GET_BOTS,
          data: {
            bots: bots.filter(bot => bot.id !== removeBot.id)
          }
        });
      } catch (err) {
        // ...
      }

      try {
        const { webhooks } = cache.readQuery({ query: GET_WEBHOOKS });
        cache.writeQuery({
          query: GET_WEBHOOKS,
          data: {
            webhooks: webhooks.map(webhook => {
              return {
                ...webhook,
                bots: webhook.bots.filter(bot => bot.id !== removeBot.id)
              };
            })
          }
        });
      } catch (err) {
        // ...
      }
    }
  });
