---
title: Memulai
weight: 10
---

yokui adalah sistem desain dari yoiso yang bertujuan untuk membantu tim yoiso secara efisien merancang dan membangun aplikasi dan situs web yang terlihat dan terasa konsisten.

Jika Anda baru menggunakan yokui, mulailah dengan membaca FAQ dan halaman tentang tipografi, warna, kisi 8-point, dan aksesibilitas. Dengan begitu Anda akan punya gambaran tentang prinsip-prinsip di balik sistem desain.

Sistem ini diimplementasikan sebagai pustaka Figma, komponen React, dan gaya CSS yang dapat Anda sertakan dalam proyek Anda. Untuk mulai menggunakan yokui, ikuti langkah-langkah di bawah ini.

Sebagian besar materi yokui dimodifikasi dari Pivotal UI.

## For Designers
###Using the Figma team library

Jika Anda seorang desainer yang ingin memasukkan yokui ke dalam desain Anda, Anda dapat menggunakan perpustakaan tim Figma dengan mengikuti instruksi di [video ini](https://drive.google.com/open?id=1uTT_xn5t8L0w7CziG1vQA3rEoxvtpTSx).

## For Developers
###Installing from npm

The most common way to add yokui to your project is to use the [npm package](https://www.npmjs.com/package/pivotal-ui). The package includes all of yokui's CSS, Sass variables, and React components.

You will need to have Node installed. If you do not, [see here for instructions](https://docs.npmjs.com/getting-started/installing-node). Node comes with `npm` for managing dependencies, but you might prefer to use [Yarn](https://yarnpkg.com/). If you do not have an existing project, you can create one with `npm init` or `yarn init`.

We also assume that you are using a bundler like [Webpack](https://webpack.js.org/), which will allow you to import CSS directly into JavaScript files.

Once these are set up, install the `pivotal-ui` Node module in your project like this:

```bash
# if using npm:
npm install pivotal-ui

# if using yarn:
yarn add pivotal-ui
```

To use individual components, see the instructions on the pages for those components.


###Consuming CSS from a CDN

For projects that are not using npm or Webpack, like static sites built with [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/), our compiled CSS is made available via a CDN:

`http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-<VERSION>.css`

For example, CSS for version 16.0.0 is available at http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css

These files can be included with a `<link>` tag in an HTML file like this:

```html
<link rel="stylesheet" href="http://d2bsvk2etkq8vr.cloudfront.net/pui-css/pui-components-16.0.0.css">
```
