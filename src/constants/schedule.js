import { gql } from "apollo-boost";

import { BOT_FRAGMENT } from "./bot";

export const SCHEDULE_FRAGMENT = gql`
  ${BOT_FRAGMENT}

  fragment ScheduleFragment on Schedule {
    id
    name
    cron
    code
    enable
    createdAt
    updatedAt
    bots {
      ...BotFragment
    }
  }
`;

export const GET_SCHEDULES = gql`
  ${SCHEDULE_FRAGMENT}

  query schedules {
    schedules {
      ...ScheduleFragment
    }
  }
`;

export const CREATE_SCHEDULE = gql`
  ${SCHEDULE_FRAGMENT}

  mutation createSchedule($input: CreateScheduleInput!) {
    createSchedule(input: $input) {
      ...ScheduleFragment
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  ${SCHEDULE_FRAGMENT}

  mutation updateSchedule($id: ID!, $input: UpdateScheduleInput!) {
    updateSchedule(id: $id, input: $input) {
      ...ScheduleFragment
    }
  }
`;

export const REMOVE_SCHEDULE = gql`
  ${SCHEDULE_FRAGMENT}

  mutation removeSchedule($id: ID!) {
    removeSchedule(id: $id) {
      ...ScheduleFragment
    }
  }
`;

export const SET_SCHEDULE_BOTS = gql`
  ${SCHEDULE_FRAGMENT}

  mutation setScheduleBots($id: ID!, $botIds: [ID!]!) {
    setScheduleBots(id: $id, botIds: $botIds) {
      ...ScheduleFragment
    }
  }
`;
