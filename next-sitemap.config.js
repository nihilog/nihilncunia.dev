const siteUrl = 'https://nihilncunia.dev';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  exclude: [
    '/404',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [ '/404', ],
      },
      { userAgent: '*', allow: '/', },
    ],
  },
};
