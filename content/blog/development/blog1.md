---
title: '👨‍💻 블로그 제작 일지(1)'
date: 2021-06-13 01:47:13
category: 'development'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/dotBlog.png'
description: '그치만.. 이렇게라도 기록해 두지 않으면 까먹고 말 게 분명한걸'
tags: ['Gatsby', 'Netlify', 'SEO']
draft: false
---

블로그를 만들기 위해서 gatsby + netlify 조합을 선택했다.

gatsby는 React + GraphQL을 기반으로 한 SSG(정적 사이트 생성기)다. React를 공부하고 있기 때문에 여러 가지 SSG중 Next.js와 gatsby를 두고 고민했는데, 소규모의 블로그를 운영하기에 더 적합한 gatsby를 택했다. SSG에 대해서는 [이곳](https://lechuck.netlify.app/study/CSRSSG/ "SSR/CSR, 그리고 SSG")에 정리해 두었다. Netlify는 클라우드/웹 호스팅 서비스다. 요즘 많이들 사용하는 호스팅 서비스인 것 같아서 나도 한 번 써봤다.

# 1. Gatsby Starter Template으로 블로그 만들기

JBEE님이 만든 스타터 테마 [gatsby-starter-bee]를 이용해서 매우 쉽게 블로그를 만들 수 있었다.

gatsby-starter-bee를 설치하고 실행한다.
```bash
npm i -g gatsby-cli
gatsby new my-blog-starter https://github.com/JaeYeopHan/gatsby-starter-bee
```
```bash
cd my-blog-starter
npm start
```


# 2. Netlify로 블로그 배포하기

Github Repo를 생성한 뒤 Netlify에 접속하여 해당 Repo를 연동해주면 금새 사이트가 만들어진다. 블로그에 변경된 사항이 있으면 깃에 푸쉬해주는 것만으로 Netlify가 자동으로 통합하고 배포해준다.

# 3. 커스터마이징

게시글에 썸네일을 주고 싶었다. hexdrinker님의 [블로그](https://hexdrinker.dev/)를 발견하고 따라 고쳤다. 

# 4. 구글 SEO 최적화

잘 정리된 [블로그]를 적극 참고했다.
[Gatsby Blog 검색엔진 최적화](https://www.jungyu.engineer/gatsby%20blog%20search%20engine%20optimization/)도 참고했다.

## Sitemap.xml 생성

sitemap은 구글 웹 크롤러가 내 블로그를 크롤링하기 위한 이정표 역할을 한다고 한다.
```bash
 plugins: [
     ...
    'gatsby-plugin-sitemap',
    ...
  ]
```
```bash
npm add gatsby-plugin-sitemap
gatsby develop
```
`localhost:8000/sitemap.xml` 에 접속하여 sitempa이 생성된 것을 확인

## Google Search 콘솔에 등록하기

1. [Google Search Console]에 접속
2. 우측 URL 접두어를 선택하고 인증용 html 파일을 다운
3. html 파일을 루트폴더에 복사한뒤 package.json을 아래와 같이 수정

```json
// package.json
"scripts": {
    "build": " gatsby build && cp google어쩌구.html public/",
    ...
  },
```

```bash
yarn build
gatsby serve
```
4. `localhost:9000/google어쩌구.html`로 접속하여 인증용 HTML 내용이 잘 출력되는지 확인
5. Git에 커밋 후 푸시하여 netlify에 publish. 이후 구글 서치 콘솔로 와서 인증 완료.

# 5. Naver SEO 최적화

[네이버 사이트 간단 체크]에 접속하여 블로그 URL을 입력하고 결과를 확인한다. robots.txt 항목에만 문제가 있는 것을 확인할 수 있다.

> robots.txt는 검색로봇에게 사이트 및 웹페이지를 수집할 수 있도록 허용하거나 제한하는 국제 권고안입니다.

## robots.txt 작성
`npm add gatsby-plugin-robots-txt` 

`yarn build` `gatsby serve` 입력 후 `http://localhost:9000/robots.txt`에 접속하여 확인. 깃에 커밋하여 netlify에 publish된 것을 확인.

## 네이버 웹 마스터에 등록하기
네이버 웹 마스터 [사이트 등록 페이지] 에서 sitemap.html을 다운받고 구글에 등록했을 때와 똑같이 등록하면 된다.

# 결론
다음엔 ToC(Table of Contents), 맨 위로가기 버튼을 추가하는 과정을 잘 정리해서 올려보자.

[gatsby-starter-bee]:https://github.com/JaeYeopHan/gatsby-starter-bee
[블로그]:https://dyjh-blog.netlify.app/posts/2020-gatsby-blog-seo "개츠비 블로그 구글 네이버 다음 검색 노출시키기"
[Google Search Console]: https://search.google.com/search-console/about?hl=ko
[네이버 사이트 간단 체크]: https://searchadvisor.naver.com/tools/sitecheck
[사이트 등록 페이지]: https://searchadvisor.naver.com/console/board