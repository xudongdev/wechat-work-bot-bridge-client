import { gql } from "apollo-boost";

import { BOT_FRAGMENT } from "./bot";

export const WEBHOOK_FRAGMENT = gql`
  ${BOT_FRAGMENT}

  fragment WebhookFragment on Webhook {
    id
    name
    code
    createdAt
    updatedAt
    bots {
      ...BotFragment
    }
  }
`;

export const GET_WEBHOOKS = gql`
  ${WEBHOOK_FRAGMENT}

  query webhooks {
    webhooks {
      ...WebhookFragment
    }
  }
`;

export const CREATE_WEBHOOK = gql`
  ${WEBHOOK_FRAGMENT}

  mutation createWebhook($input: CreateWebhookInput!) {
    createWebhook(input: $input) {
      ...WebhookFragment
    }
  }
`;

export const UPDATE_WEBHOOK = gql`
  ${WEBHOOK_FRAGMENT}

  mutation updateWebhook($id: ID!, $input: UpdateWebhookInput!) {
    updateWebhook(id: $id, input: $input) {
      ...WebhookFragment
    }
  }
`;

export const REMOVE_WEBHOOK = gql`
  ${WEBHOOK_FRAGMENT}

  mutation removeWebhook($id: ID!) {
    removeWebhook(id: $id) {
      ...WebhookFragment
    }
  }
`;

export const SET_WEBHOOK_BOTS = gql`
  ${WEBHOOK_FRAGMENT}

  mutation setWebhookBots($id: ID!, $botIds: [ID!]!) {
    setWebhookBots(id: $id, botIds: $botIds) {
      ...WebhookFragment
    }
  }
`;
