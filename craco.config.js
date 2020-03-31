/* eslint-disable import/no-extraneous-dependencies */
require("dotenv/config");

const _ = require("lodash");
const { DefinePlugin } = require("webpack");

module.exports = {
  devServer: {
    proxy: {
      "/graphql": process.env.SERVER_URL,
      "/webhooks/*/send": process.env.SERVER_URL
    }
  },
  webpack: {
    plugins: [
      new DefinePlugin({
        "process.env": JSON.stringify(
          _.pick(process.env, ["NODE_ENV", "SERVER_URL"])
        )
      })
    ]
  }
};
