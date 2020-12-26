const fs = require('fs')
const globby = require('globby')

async function generateSiteMap() {
  const pages = await globby([
    //'pages/**/*.tsx',
    //'!pages/**/[id].tsx',
    //'!pages/_*.tsx',
    //'out/blogs/*.html',
    '.next/server/pages/**/*.html',
    '.next/serverless/pages/**/*.html'
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">   
      ${pages
        .map(page => {
          const path = page
            .replace('/index', '')
            .replace('.next/serverless/pages', '')
            .replace('.next/server/pages', '')
            .replace('.html', '')
          return `
      <url>
        <loc>${`https://kawa.dev${path}`}</loc>
      </url>
              `
        })
        .join('')}
  </urlset>
  `

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSiteMap()