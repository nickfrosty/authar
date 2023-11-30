const SITE_URL = "https://authar";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    "/dashboard*",
    "/api*",
    // "/sitemap-generated.xml", // <= exclude custom dynamic sitemap
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/api", "/dashboard"],
      },
    ],
    additionalSitemaps: [
      // `${SITE_URL}/sitemap-generated.xml`, // add custom dynamic sitemap
    ],
  },
};
