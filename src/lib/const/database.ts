/**
 * Assorted constants used in tandem with the database
 */

/**
 * List of usernames that are not allowed to be created
 *
 * note: this list should include the page routes that the site uses
 */
export const USERNAME_BLACKLIST = [
  // comment for better diffs
  "authar",
  "author",
  "admin",
  "api",
  "help",
  "blog",
  "dashboard",
  "settings",
  "account",
  "manage",
  "features",
  "login",
  "logout",
  "signin",
  "signout",
];

/**
 * List of post slugs that are not allowed to be created
 *
 * todo: should this include the list of blacklisted usernames as well?
 * when subdomains and custom domains are supported, these slug (and usernames)
 * will likely be used for root page routes
 */
export const POST_SLUG_BLACKLIST = [
  // comment for better diffs
  "local",
  "err",
  "error",
  "edit",
  "archive",
  "coffee",
  "tip",
  "tags",
  "search",
  "followers",
  "members",
  "message",
  "messages",
  "chat",
  "dm",
  "subscribers",
  "posts",
  "comments",
  "likes",
];
