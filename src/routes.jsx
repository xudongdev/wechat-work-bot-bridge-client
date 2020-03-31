import AuthLayout from "layouts/AuthLayout";
import DashboardLayout from "layouts/DashboardLayout";
import React from "react";
import { Redirect } from "react-router-dom";
import Bots from "views/Bots";
import Login from "views/Login";
import Schedules from "views/Schedules";
import Webhooks from "views/Webhooks";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      {
        path: "/auth",
        exact: true,
        component: () => <Redirect to="/auth/login" />
      },
      {
        path: "/auth/login",
        exact: true,
        component: Login
      }
    ]
  },
  {
    path: "*",
    component: DashboardLayout,
    routes: [
      {
        path: "/bots",
        exact: true,
        component: Bots
      },
      {
        path: "/schedules",
        exact: true,
        component: Schedules
      },
      {
        path: "/webhooks",
        exact: true,
        component: Webhooks
      },
      {
        component: () => <Redirect to="/webhooks" />
      }
    ]
  }
];

export default routes;
