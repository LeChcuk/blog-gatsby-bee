---
title: '👨‍💻 블로그 제작 일지(1)'
date: 2021-06-12 12:21:13
category: 'development'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/dotBlog.png'
description: '그치만.. 이렇게라도 기록해 두지 않으면 까먹고 말 게 분명한걸'
tags: ['JAM Stack', 'SSG', 'Gatsby', 'Netlify']
draft: false
---

# 1. Gatsby Starter Template으로 블로그 만들기

[gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/README.ko.md)


```sh
npm i -g gatsby-cli
gatsby new my-blog-starter https://github.com/JaeYeopHan/gatsby-starter-bee
```

```sh
npm start
```

## 커스터마이징

# 2. Netlify로 블로그 배포하기

## Git Repo 생성


# 구글 SEO 등록하기

잘 정리된 [블로그]를 적극 참고했다.

```sh
npm add gatsb netlify-plugin-sitemap
```

[Google Search Console]에 접속.

```sh
"scripts": {
    "build": " gatsby build && cp google어쩌구.html public/",
    ...
  },
```

```sh
yarn build
gatsby serve
```
`localhost:9000/google어쩌구.html` 


[블로그]: (https://dyjh-blog.netlify.app/posts/2020-gatsby-blog-seo)
[Google Search Console]: (https://search.google.com/search-console/about?hl=ko)


# References

https://blog.lgcns.com/2336
https://pks2974.medium.com/jam-stack-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-17dd5c34edf7
https://www.itworld.co.kr/news/156752
