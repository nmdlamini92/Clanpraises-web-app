import { test, expect } from '@playwright/test';
import Sitemapper from 'sitemapper'; // npm install sitemapper

test('All sitemap URLs should return 200 OK', async ({ request }) => {
  test.setTimeout(44560_000);

  const sitemap = new Sitemapper();
  // Fetch URLs from your local or staging deployment
  const { sites } = await sitemap.fetch('http://localhost:3000/sitemap.xml');
  
  for (const url of sites) {
    const response = await request.get(url);
    expect(response.status(), `URL PASSED: ${url}`).toBe(200);
  }
});