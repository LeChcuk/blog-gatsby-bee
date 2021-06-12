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


# 4. 구글 SEO 최적화

잘 정리된 [블로그]를 적극 참고했다.

## Sitemap.xml 생성

sitemap은 구글 웹 크롤러가 내 블로그를 크롤링하기 위한 이정표 역할을 한다고 한다.
```javascript
 plugins: [
     ...
    'gatsby-plugin-sitemap',
    ...
  ]
```
```sh
npm add gatsby-plugin-sitemap
gatsby develop
```
`localhost:8000/sitemap.xml` 에 접속하여 sitempa이 생성된 것을 확인


## Google Search 콘솔 등록

1. [Google Search Console]에 접속
2. 우측 URL 접두어를 선택하고 인증용 html 파일을 다운
3. html 파일을 루트폴더에 복사한뒤 package.json을 아래와 같이 수정
```javascript
// package.json
"scripts": {
    "build": " gatsby build && cp google어쩌구.html public/",
    ...
  },
```

```sh
yarn build
gatsby serve
```
4. `localhost:9000/google어쩌구.html`로 접속하여 인증용 HTML 내용이 잘 출력되는지 확인
5. Git에 커밋 후 푸시하여 netlify에 publish. 이후 구글 서치 콘솔로 와서 인증 완료.

# 5. Naver SEO 최적화

[네이버 사이트 간단 체크]에 접속하여 블로그 URL을 입력하고 결과를 확인한다. robots.txt 항목에만 문제가 있는 것을 확인할 수 있다. robots는 구글의 sitemap과 유사한 개념인 것 같다.

> robots.txt는 검색로봇에게 사이트 및 웹페이지를 수집할 수 있도록 허용하거나 제한하는 국제 권고안입니다.

`yarn build` `gatsby serve` 입력 후 `http://localhost:9000/robots.txt`에 접속하여 확인. 깃에 커밋하여 netlify에 publish된 것을 확인.

## robots.txt 작성
`npm add gatsby-plugin-robots-txt` 


[블로그]: (https://dyjh-blog.netlify.app/posts/2020-gatsby-blog-seo)
[Google Search Console]: (https://search.google.com/search-console/about?hl=ko)
[네이버 사이트 간단 체크]: (https://searchadvisor.naver.com/tools/sitecheck)

# References

https://blog.lgcns.com/2336
https://pks2974.medium.com/jam-stack-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-17dd5c34edf7
https://www.itworld.co.kr/news/156752
