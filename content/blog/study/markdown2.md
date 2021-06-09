---
title: MarkDown 문법 정리
date: 2020-03-18 22:03:94
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/1200px-Markdown-mark.svg.png'
description: '테스트2 (AWS S3)'
tags: ['BCSD', '회고']
draft: false
---

![MarkDown logo](https://drive.google.com/uc?export=view&id=1KyoLjc8JuwWmvOb4T_k4B0-IyVGS_KfA)

# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6

이탤릭체는 *별표* 혹은 _언더바_를 사용하세요.

두껍게는 **더블별표** 혹은 __더블언더바__를 사용하세요.

**_이탤릭+두껍게_**

취소선은 ~~물결표시(tilde)~~를 사용하세요.

<u>밑줄</u>은 `<u></u>`를 사용하세요.


1. 순서가 필요한 목록
2. 순서가 필요한 목록
    - 순서가 필요하지 않은 목록(서브)
    - 순서가 필요하지 않은 목록(서브)
3. 순서가 필요한 목록
    1. 순서가 필요한 목록(서브)
    2. 순서가 필요한 목록(서브)

- 순서가 필요하지 않은 목록에 사용 가능한 기호
    - 대쉬 (hypen)
    * 별표 (asterisks)
    + 더하기 (plus sign)


[GOOGLE](https://google.com)

here is [NAVER]

[참조 링크]

[DAUM] here

[NAVER]:https://naver.com "링크설명"
[DAUM]:https://daum.net
[참조 링크]: https://daum.net

![대체 텍스트 입력란](./images/박재욱.jpg)
[![gatsby](./images/hello.png)](https://kr.vuejs.org)

```
마크다운 이미지 코드 ![]()를 링크 코드[]() 묶어주면 이미지에 링크를 걸 수 있다.
```

### 백틱(`)을 사용하여 코드 강조하기.

`background` 얍얍 `얍얍얍`

#### 블록(block) 코드 강조

`를 세 번 이상 입력하고 코드 종류도 함께 적는다.

```html
<a html="https://www.google.co.kr/">GOOGLE</a>
```
```html{2}
<a html="https://www.google.co.kr/">GOOGLE</a>
<a html="https://www.naver.com/">NAVER</a>

```

### 표(Table)
<table> 태그로 변환됩니다.

헤더 셀을 구분할 때 3개 이상의 `-`(hyphen/dash) 기호가 필요합니다.

헤더 셀을 구분하면서 `:`(Colons) 기호로 셀(열/칸) 안에 내용을 정렬할 수 있습니다.
ㅊ
가장 좌측과 가장 우측에 있는 `|`(vertical bar) 기호는 생략 가능합니다.

값 | 의미 | 기본값
---|:---:|---:
`static` | 유형(기준) 없음 / 배치 불가능 | `static`
`relative` | 요소 **자신**을 기준으로 배치 |
`absolute` | 위치 상 **_부모_(조상)요소**를 기준으로 배치 |
`fixed` | **브라우저 창**을 기준으로 배치 |


### 인용문(blockQuote)

> 남의 말이나 글에서 직접 또는 간접으로 따온 문장.  
>  _(네이버 국어 사전)_


> 인용문을 작성하세요!
>> 중첩된 인용문(nested blockquote)을 만들 수 있습니다.
>>> 중중첩된 인용문 1
>>> 중중첩된 인용문 2
>>> 중중첩된 인용문 3

### 수평선

각 기호를 3개 이상 입력하세요


---
(Hyphens)

***
(Asterisks)

___
(Underscores)

### 줄바꿈

`<br>` 혹은 띄어쓰기 2번