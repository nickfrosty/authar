/*
  General constants for use throughout the site
*/

export const SITE = {
  name: "Authar",
  url:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3000"
      : "https://authar",
};

export const TWITTER = {
  handle: "@username",
  username: "username",
  url: "https://twitter.com/username",
};

export const GITHUB = "https://github.com/nickfrosty/authar";
