---
title: '📝 MarkDown 문법 정리'
date: 2021-06-10 01:03:31
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/thumb_MarkDown.svg.png'
description: '.md 문서 작성법을 알아보자'
tags: ['마크다운', 'MarkDown', '.md']
draft: false
---

![MarkDown logo](https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/thumb_MarkDown.svg.png)


# 1.마크다운이란?

마크업 언어의 일종으로, 일반 텍스트 문서의 양식을 편집하는 데 주로 쓰인다.


HTML 등 다른 문서형태로의 변환이 용이하다.


💡 정형화된 표준이 존재하지 않기 때문에 에디터에 따라 결과물이 달라질 수 있다.

# 2.마크다운 문법
## 2.1 제목
제목은 `<h1>`~`<h6>` 태그로 변환된다.

```MarkDown
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
```

제목1과 제목2는 아래와 같이 사용할수도 있다.


```MarkDown
제목 1
=====

제목 2
-----
```

## 2.2 강조(Emphasis)

 | 의미 | 마크다운 | 실행결과
---|:---:|---:
`기울여쓰기(italic)` | \*별표 혹은 _언더바로 감싸준다 | *이탤릭*
`두껍게(bold)` | \**더블별표 혹은 __더블언더바 | **bold**
`취소선(del)` | ~~물결표시(tilde)  | ~~취소선~~
`밑줄` | `<u></u>` | <u>밑줄</u>
`수평선` | *** or --- or ___  |


## 2.3 목록(List)

```MarkDown
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
```

## 2.4 링크(Link)

링크는 `<a>`로 변환된다.


종류 | 마크다운 | 실행결과
--- | --- | ---
인라인 링크 | `[링크](https://www.google.co.kr "부연설명")` | [Google](https://www.google.co.kr "구글")
참조 링크 | `[링크1][1] & [1]: https://google.com "부연설명")` | 검색엔진은 [Google][1]이 있다. 
url 링크 | `<google.com/> & <example@example.com> ` | <https://google.com>
내부 링크 | `[링크](#id)` | [링크](https://google.com "구글")


<!-- 참조 링크 지정 -->
[1]:https://google.com "구글"


## 2.5 이미지(images)

`<img>`로 변환된다.


```bash
![이미지 이름](이미지 주소 "부연 설명")
```
종류 | 마크다운 | 실행결과
--- | --- | ---
이미지 | `![gatsby](./images/hello.png)` | ![gatsby](./images/hello.png)
이미지에 링크 걸기 | `[![gatsby](./images/hello.png)](https://gatsby.com)` | [![gatsby](./images/hello.png)](https://gatsby.com)


> 마크다운 이미지 코드 `![]()`를 링크 코드`[]()`로 묶어주면 이미지에 링크를 걸 수 있다.

## 2.6 백틱(`)을 이용한 코드(Code) 강조

`<code>`로 변환된다.

종류 | 마크다운 | 실행결과
--- | --- | ---
인라인 | \`background\` | `background`
블록 | \`\`\`html(코드 종류 기재) (코드 작성) \`\`\` | 


```MarkDown
    ```html
    <a href="https://www.google.co.kr/" target="_blank">GOOGLE</a>
    ```

    ```css {2}
    .list > li {
    position: absolute;
    top: 40px;
    }
    ```
```

```css {2}
    .list > li {
    position: absolute;
    top: 40px;
    }
```

## 2.7 표(Table)

`<table>`로 변환된다.

### - 표 구조

```MarkDown
| First Header  | Second Header | Third Header         |
| :------------ | :-----------: | -------------------: |
| First row     | Data          | Very long data entry |
| Second row    | **Cell**      | *Cell*               |
| Third row     | Cell that spans across two columns  ||
```

<!-- | First Header  | Second Header | Third Header         |
| :------------ | :-----------: | -------------------: |
| First row     | Data          | Very long data entry |
| Second row    | **Cell**      | *Cell*               |
| Third row     | Cell that spans across two columns  || -->

### - 열 병합(Column spanning)
```MarkDown
| Column 1 | Column 2 | Column 3 | Column 4 |
| -------- | :------: | -------- | -------- |
| No span  | Span across three columns    |||
```


> 표 내부에서 줄 바꿈을 하기 위해서는 `<br/>`을 사용한다.


## 2.8 인용문(blockQuote)

`<blockquote>`로 변환된다.

`>` 기호를 사용한다.


> 남의 말이나 글에서 직접 또는 간접으로 따온 문장.  
>  _(네이버 국어 사전)_


> 인용문을 작성하세요!
>> 중첩된 인용문(nested blockquote)을 만들 수 있습니다.
>>> 중중첩된 인용문 1
>>> 중중첩된 인용문 2
>>> 중중첩된 인용문 3

## 2.9 각주(Footnotes)
`[^내용]`


본문의 특정 문구를 보충 설명하기 위한 용도. 주로 내용의 출처를 밝힐 때 사용.

```MarkDown
에릭 레이먼드는 파이썬을 배운지 하루만에 원하는 프로그램을 작성할 수 있었다고 한다. [^myfootnote]

[^myfootnote]: 에릭 레이먼드는 프로그래밍 경험이 많은 구루 프로그래머이다.  
보통 사람은 파이썬을 배우고 사용하는 데 1주일 정도의 적응 시간이 필요할 것이다.
```

ex) 에릭 레이먼드는 파이썬을 배운지 하루만에 원하는 프로그램을 작성할 수 있었다고 한다. [^myfootnote]

[^myfootnote]: 에릭 레이먼드는 프로그래밍 경험이 많은 구루 프로그래머이다. 보통 사람은 파이썬을 배우고 사용하는 데 1주일 정도의 적응 시간이 필요할 것이다.

## 2.10 수평선

각 기호를 3개 이상 입력하세요

`-`(Hyphens)

`*`(Asterisks)

`_`(Underscores)

## 2.11 줄바꿈

`<br>` 혹은 띄어쓰기 2번


## References

https://eungbean.github.io/2018/06/11/How-to-use-markdown/


https://heropy.blog/2017/09/30/markdown/

<br/>
<br/>
<br/>
<br/>

각주 [^myfootnote]