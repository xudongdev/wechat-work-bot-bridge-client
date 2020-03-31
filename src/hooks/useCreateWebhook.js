import { useMutation } from "@apollo/react-hooks";

import { CREATE_WEBHOOK, GET_WEBHOOKS } from "../constants/webhook";

export default () =>
  useMutation(CREATE_WEBHOOK, {
    update(cache, { data: { createWebhook } }) {
      try {
        const { webhooks } = cache.readQuery({ query: GET_WEBHOOKS });
        cache.writeQuery({
          query: GET_WEBHOOKS,
          data: { webhooks: webhooks.concat([createWebhook]) }
        });
      } catch (err) {
        // ...
      }
    }
  });
