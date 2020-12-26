const fs = require('fs')
const globby = require('globby')

async function generateSiteMap() {
  const pages = await globby([
    //'pages/**/*.tsx',
    //'!pages/**/[id].tsx',
    //'!pages/_*.tsx',
    'out/blogs/*.html'
  ])
  console.log("pages", pages)

  const sitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://kawa.dev</loc>
      </url>         
      ${pages
        .map(page => {
          const path = page
            .replace('pages', '')
            .replace('out', '')
            .replace('.tsx', '')
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