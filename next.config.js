/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

module.exports = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ],
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  images: {
    domains: ["cdnjs.cloudflare.com"],
  },
  env: {
    NEXT_PUBLIC_GA_ID: "your_google_analytics_tracking_id",
    /**
     * Timout out to stop sending download requests. In case
     * there's no response back after one hour from sending the first download request
     */
    NEXT_PUBLIC_DOWNLOAD_TIMEOUT: "3600000", // 1 hour in miliseconds  //1 h = 3600000 ms
    // Timout to delete saved files from server, if their last edited date has exceeded one hour
    NEXT_PUBLIC_DELETION_TIMEOUT: "3600000", // 1 hour in miliseconds  //1 h = 3600000 ms
    // 1.01 hour is time duration to start checking if files last edited date has exceeded one hour
    NEXT_PUBLIC_DELETION_INTERVAL_DURATION: "3636000", //1.01 hour in miliseconds //1.01 h = 3636000 ms
    //delay between two download requests // sending download request every 5s
    NEXT_PUBLIC_DOWNLOAD_REQUEST_DELAY: "5000", // 5 seconds in miliseconds  // 5s = 5000
  }

};
