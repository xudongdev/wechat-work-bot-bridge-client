import { gql } from "apollo-boost";

export const BOT_FRAGMENT = gql`
  fragment BotFragment on Bot {
    id
    name
    webhookUrl
    createdAt
    updatedAt
  }
`;

export const GET_BOTS = gql`
  ${BOT_FRAGMENT}

  query bots {
    bots {
      ...BotFragment
    }
  }
`;

export const CREATE_BOT = gql`
  ${BOT_FRAGMENT}

  mutation createBot($input: CreateBotInput!) {
    createBot(input: $input) {
      ...BotFragment
    }
  }
`;

export const UPDATE_BOT = gql`
  ${BOT_FRAGMENT}

  mutation updateBot($id: ID!, $input: UpdateBotInput!) {
    updateBot(id: $id, input: $input) {
      ...BotFragment
    }
  }
`;

export const REMOVE_BOT = gql`
  ${BOT_FRAGMENT}

  mutation removeBot($id: ID!) {
    removeBot(id: $id) {
      ...BotFragment
    }
  }
`;
