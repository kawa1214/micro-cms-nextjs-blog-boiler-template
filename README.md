## MicroCms Next js Blog Boiler Template

### ⚡️ Features
- ✏️ Syntax Highlighting
- 🦊 SEO friendly
- 🎨 Integrate with Tailwind CSS
- 🤖 GoogleAnalytics
- 📖 Pagination
- 🖼 Featured image
- ☪ Lazyload images
- 🛴 Scrollable table of contents



### 🚀 Upcoming Features
- [ ] Tag Page
- [ ] Dark mode

### Getting started

#### micro cms API構成

blogs

|FieldId|表示名|種類|必須項目|
|----|----|----|----|
|title|タイトル|テキストフィールド|true|
|icon|絵文字のアイコン|テキストフィールド|true|
|body|内容|リッチエディタ|true|
|tags|タグ|複数コンテンツ参照|false|


tags

|FieldId|表示名|種類|必須項目|
|----|----|----|----|
|name|タグ名|テキストフィールド|true|

.env.development.local
```
API_KEY=xxxx-xxxx-xxxx-xxxx
ENDPOINT=https://id.microcms.io/api/v1 
```

./static/general.ts
```typescript
export const title: string = "header title"
export const githubLink: string = "https://github.com/yourid"
export const footerText: string = "© 2020 title"
```

### License
Licensed under the MIT License, Copyright © 2020
See [LICENSE](https://github.com/kawa1214/micro-cms-nextjs-blog-boiler-template/blob/main/LICENSE) for more information.
