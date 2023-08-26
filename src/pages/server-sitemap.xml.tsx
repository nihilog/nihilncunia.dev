import { GetServerSideProps } from 'next';
import { ISitemapField, getServerSideSitemapLegacy } from 'next-sitemap';
import {
  getArchive, getCategories, getListMetadata, getSeries, getTags
} from '../utils/mdx';
import { dateFormat } from '../utils/date';

export default function Sitemap() { }

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const siteUrl = 'https://nihilncunia.dev';

  const categories = getCategories().map((category) => ({
    loc: `${siteUrl}/categories/${category.name}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1,
  }));

  const tags = getTags().map((tag) => ({
    loc: `${siteUrl}/tags/${tag.name}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1,
  }));

  const series = getSeries().map((series) => ({
    loc: `${siteUrl}/series/${series.name}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1,
  }));

  const posts = getListMetadata().map((post) => ({
    loc: `${siteUrl}/posts/${post.id}`,
    lastmod: `${dateFormat(post.updated, 'YYYY-MM-DDTHH:mm:ss.SSS')}Z`,
    changefreq: 'daily',
    priority: 1,
  }));

  const archive = getArchive().map((item) => ({
    loc: `${siteUrl}/posts/${item.name}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1,
  }));

  const fields = [ ...posts, ...categories, ...tags, ...series, ...archive, ] as ISitemapField[];

  return getServerSideSitemapLegacy(ctx, fields);
};
