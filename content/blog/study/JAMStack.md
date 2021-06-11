---
title: '📝 JAMstack과 정적 웹'
date: 2021-06-12 12:21:13
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/thumb_JAMstack.png'
description: '블로그를 만들면서 알게된 개념들'
tags: ['JAMstack', 'SSG', 'Gatsby', 'Netlify']
draft: false
---
## JAMstack이란?

잼스택이란 Javascript, APIs, Markup의 약자로, 일종의 웹 사이트 구현 방법론이다.
클라이언트 관련 처리는 Javascript가 담당하고, DB나 서버 관련 기능은 API로 대체하고, SSG(Static Site Generator)로 Markup을 미리 만들어 두는 개념을 말한다.
잼스택은 2018년 클라우드 및 웹 호스팅 업체인 Netlify에서 `정적 웹` 추세에 맞춰 제안한 웹 개발 패러다임이다.
잼스택의 목적은 최신 기술을 통해 웹 사이트 빌드와 통합을 더욱 빠르고 용이하게 하는 데 있다.


## 동적 웹과 LAMP, MEAN 스택
잼스택 이전에 LAMP, MEAN 스택이 있었다.
LAMP 스택은 Linux 운영체제, Apache 웹 서버, MySQL, PHP/Python의 약자를 딴 조합이다. 오랫동안 공인된 전통적인 웹 구조라고 할 수 있다.
MEAN 스택은 MongoDB, ExpressJS, AngularJS, NodeJS라는 자바스크립트 프레임워크를 이용한 웹 구조를 뜻한다.
LAMP 스택과 MEAN 스택으로 이루어진 legacy web은 동적이고 인터랙티브한 웹사이트를 생성할 수 있지만 24시간 상주하는 웹 서버를 필요로 하며, 복잡한 구조 만큼이나 보안에 신경을 써야하는 단점이 있다.

동적 웹은 정적 웹에 대비되는 개념으로 사용자(클라이언트) 요청에 따라 동적으로 다른 내용을 보여주는 웹 사이트를 말한다.
사용자가 URL을 통해 파라미터를 전달하면, 웹 서버를 거쳐 웹 앱 서버(WAS)에 가닿아서 요청을 처리하고 반환하는 방식이다. 


## 정적 웹과 JAMstack
정적 웹은 사용자의 요청에 항상 같은 내용을 보여주는 웹 사이트를 말한다.
웹 서버의 파일 시스템 어딘가에 만들어져 있는 HTML 문서를 보여주는 방식이다.

2010년대 중반 정적 웹 인기에 힘입어 제킬(Jeckyll), 휴고(Hugo), 개츠비(Gatsby)와 같은 정적 사이트 생성기(SSG)가 생겨나기 시작했다.
SSG의 부흥은 잼스택의 부흥과 같다. 잼스택 아키텍처는 동적 웹이 아닌 정적 웹에 적합한 구조이기 때문이다.

Gatsby SSG와 netlify 웹 호스팅 서비스를 이용하면 아주 쉽게 잼스택 구조를 구현해볼 수 있다.

You can also use static site generators to create JAMStack sites.


## MPA/SPA, CSR/SSR, 그리고 SSG





<!-- ## LAMP 스택, MEAN 스택

잼스택 이전에 LAMP 스택과 MEAN 스택이 있었다. 
LAMP 스택은 Linux 운영체제, Apache 웹 서버, MySQL, PHP/Python의 약자를 딴 조합이다. 오랫동안 공인된 전통적인 웹 구조라고 할 수 있다.
MEAN 스택은 MongoDB, ExpressJS, AngularJS, NodeJS라는 자바스크립트 프레임워크를 이용한 웹 구조를 뜻한다.
LAMP 스택과 MEAN 스택으로 이루어진 legacy web은 24시간 상주하는 웹 서버를 필요로 하며, 복잡한 구조 만큼이나 보안에 신경을 써야하는 단점이 있었다.
이에 반해 잼스택은 간소화된 구조와 CDN을 기반으로 빠른 속도, 보안성,  -->






# References
[오픈소스 블로그 기술의 새 바람! 정적 페이지란?](https://blog.lgcns.com/2336)

[잼스택, 웹 개발을 뒤집는 정적 웹사이트 혁명](https://www.itworld.co.kr/news/156752?page=0,1)

[정적 페이지와 동적 페이지](https://webhotpy.tistory.com/6)

[잼스택 소개: 안전한 고성능 사이트 만들기](https://blog.daum.net/followyourdream/10086854)

[JAM Stack 개념 정리하기](https://pks2974.medium.com/jam-stack-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-17dd5c34edf7)

https://velog.io/@kysung95/SSR-vs-CSR-%EB%8B%B9%EC%8B%A0%EC%9D%98-%EC%84%A0%ED%83%9D%EC%9D%80-feat.-ssg


