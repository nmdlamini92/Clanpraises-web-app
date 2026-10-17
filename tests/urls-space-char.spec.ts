import { test, expect } from '@playwright/test';
import Sitemapper from 'sitemapper'; // npm install sitemapper

test('specified URLs should return 200 OK', async ({ request }) => {
  //test.setTimeout(560_000);

  const sitemap = new Sitemapper();
  //Fetch URLs from your local or staging deployment
  const { sites } = await sitemap.fetch('http://localhost:3000/sitemap.xml');
  
  const urlsWithSpaces = sites.filter((url) => url.includes('%'));

  console.log('URLs containing spaces:', urlsWithSpaces);
  console.log('Total URLs containing spaces:', urlsWithSpaces.length);

  expect(urlsWithSpaces).toEqual([]);
  
});