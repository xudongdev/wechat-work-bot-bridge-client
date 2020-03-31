import { useMutation } from "@apollo/react-hooks";

import { GET_WEBHOOKS, REMOVE_WEBHOOK } from "../constants/webhook";

export default () =>
  useMutation(REMOVE_WEBHOOK, {
    update(cache, { data: { removeWebhook } }) {
      try {
        const { webhooks } = cache.readQuery({ query: GET_WEBHOOKS });
        cache.writeQuery({
          query: GET_WEBHOOKS,
          data: {
            webhooks: webhooks.filter(
              webhook => webhook.id !== removeWebhook.id
            )
          }
        });
      } catch (err) {
        // ...
      }
    }
  });
