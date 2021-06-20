---
title: '📝 Redux(3) - 미들웨어 redux-thunk'
date: 2021-06-19 21:33:13
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/thumb_redux.png'
description: '리덕스 미들웨어란 무엇인지 알아보고, redux-thunk를 사용해보자'
tags: ['Redux','middleware','redux-thunk']
draft: false
---

*본 게시글은 책 <리액트를 다루는 기술 개정판> 18장 '리덕스 미들웨어를 통한 비동기 작업 관리'를 정리한 내용입니다*

# 1. 미들웨어란?

미들웨어란 리듀서가 액션을 처리하기 전에 실행되는 함수다. 리덕스 사용 시 특별히 미들웨어를 설정하지 않았다면 dispatch된 액션은 곧바로 리듀서로 보내진다. 하지만 미들웨어를 설정한 경우 미들웨어는 액션과 리듀서 사이에서 중간자 역할을 한다. 미들웨어는 상탯값 변경 시 로그를 출력하는 등 디버깅 목적(redux-logger)으로 활용되거나, 비동기 작업을 처리하기 위해 사용된다.

![](./images/redux/redux-middle.png)

미들웨어의 기본 구조는 다음과 같다.

```jsx
// 화살표 함수 작성시
const loggerMiddleware = store => next => action =>{

}

// 위와 동일한 함수 구조
const loggerMiddleware = function loggerMiddleware(store){
    return function(next){
        return function(action){
            // 미들웨어 기본 구조
        }
    }
}
```

미들웨어는 결국 **함수를 반환하는 함수를 반환하는 함수**다.
파라미터로 받아온 `store`는 리덕스 스토어 인스턴스를, `action`은 디스패치된 액션을 가리킨다.
`next` 파라미터는 함수 형태로, `next(action)`을 호출하면 다음으로 처리해야 할 미들웨어에게 액션을 넘겨준다. 만약 그다음 미들웨어가 존재하지 않으면 최종적으로 리듀서에게 액션을 넘겨준다.

리덕스에 미들웨어를 적용하는 예시를 살펴보자.
```jsx
import { createStore, applayMiddleware } from 'redux';

// 미들웨어1 정의
const middleware1 = store => next => action => { // 1
    console.log('middleware1 start');
    const result = next(action);
    console.log('middleware1 end');
    return result;
};
// 미들웨어2 정의
const middleware2 = store => next => action => {
    console.log('middleware2 start');
    const result = next(action);
    console.log('middleware2 end');
    return result;
};
// 아무일도 하지 않는 리듀서 정의
const myReducer = (state, action) => {
    console.log('myReducer)';
    return state;
};

const store = createStore(myReducer, applyMiddleware(middleware1, middleware2));
store.dispatch({ type: 'someAction' });
```

스토어를 생성할 때 `applyMiddleware` 함수의 파라미터로 앞서 정의한 미들웨어들을 전달함으로써 리덕스에 미들웨어를 적용할 수 있다. `dispatch(action)` 명령어를 통한 실행 결과는 아래와 같다.

```console
middleware1 start
middleware2 start
myReducer
middleware2 end
middlware1 end
```

액션과 스토어 중간에 위치한 미들웨어가 dispatch된 액션을 캐치하였다. middleware1의 next 함수는 middleware2를 호출하고, middleware2의 next는 그 다음 호출할 미들웨어가 존재하지 않으므로 리듀서를 호출하게 된다. **이처럼 미들웨어는 리듀서 호출 전후에 필요한 작업을 정의할 수 있다.** 액션 정보를 가로채서 변경한 후 리듀서에게 전달하거나, 특정 조건의 액션을 무시하게 할 수도 있다.

미들웨어는 위와 같이 직접 정의해서 사용하는 방법과 널리 쓰이는 미들웨어 패키지를 가져와 사용하는 방법이 있다. redux-thunk와 redux-saga는 미들웨어 패키지 중 가장 많이 사용되는 패키지여서 공부해둘 필요가 있다.

| 패키지명 | 선택 기준 | 특징 |
| --- | --- | --- |
| `redxu-thunk` | 비동기 코드의 로직이 간단할 때. | 가장 많이 사용하는 미들웨어이고 간단하게 시작할 수 있다. |
| `redux-saga` | 복잡한 비동기 로직을 구현해야 할 때. | 제네레이터를 적극 활용한다. |

redux-saga는 다음 게시글에서 다뤄보도록 한다.

# 2. redux-thunk 사용해보기 (기본)

## 1) Thunk란?

Thunk는 **특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것**을 의미한다.

> 컴퓨터 프로그래밍에서, 썽크(Thunk)는 기존의 서브루틴에 추가적인 연산을 삽입할 때 사용되는 서브루틴이다. 썽크는 주로 연산 결과가 필요할 때까지 연산을 지연시키는 용도로 사용되거나, 기존의 다른 서브루틴들의 시작과 끝 부분에 연산을 추가시키는 용도로 사용되는데...

> 썽크(Thunk)는 "고려하다"라는 영어 단어인 "Think"의 은어 격 과거분사인 "Thunk"에서 파생된 단어인데, 연산이 철저하게 "고려된 후", 즉 실행이 된 후에야 썽크의 값이 가용해지는 데서 유래된 것이라고 볼 수 있다. (위키백과)

예를 들어 주어진 파라미터에 1을 더하는 함수를 만들고 싶다면, 아래와 같이 작성할 것이다.

```jsx
const addOne = x => x + 1;
addOne(1); // 2
```

addOne을 호출했을 때 바로 1+1이 연산되는 것을 볼 수 있다. 그런데 이 연산 작업을 나중으로 미루고(thunk) 싶다면?

```jsx
const addOne = x => x + 1;
function addOneThunk(x) {
    const thunk = () => addOne(x);
    return thunk;
}

const fn = addOneThunk(1);
setTimeout(() => {
    const value = fn(); // fn이 실행되는 시점에 연산
    console.log(value);
}, 1000);
```

1초가 지나면 fn() -> addOneThunk(1)의 return값인 thunk -> addOne(x)가 호출되는 구조다.
이를 화살표 함수로만 작성한다면 아래와 같다.

```jsx
cont addOne = x => x + 1;
const addOneThunk = x => () => addOne(x);

const fn = addOneThunk(1);
setTimeout(() => {
    const value = fn(); // fn이 실행되는 시점에 연산
    console.log(value);
}, 1000);
```

`redux-thunk` 라이브러리를 사용하면 thunk 함수를 만들어서 디스패치할 수 있다. 그러면 리덕스 미들웨어가 그 함수를 전달받아 store의 dispatch와 getState를 파라미터로 넣어서 호출해준다.

다음은 redux-thunk에서 사용할 수 있는 예시 thunk 함수다.
```jsx
const sampleThunk = () => (dispatch, getState) => {
    // 현재 상태를 참조할 수 있고
    // 새 액션을 디스패치할 수도 있다.
}
```

## 2) 미들웨어 적용하기

[이전 글](https://lechuck.netlify.com/study/Redux2)에서 만든  `counter` 관련 코드에 미들웨어를 적용해보자.

![](./images/redux/counter.jpeg)

```bash
yarn add redux-thunk
```

```jsx {11}
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));

ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

```

앞서 잠깐 언급한대로 `createStore` 함수 안에 미들웨어를 파라미터로 전달받는 `applyMiddleware` 함수를 넣어준다. redux-thunk 미들웨어를 사용하기 때문에 `ReduxThunk`를 전달하였다.

## 3) Thunk 생성 함수 만들기

`redux-thunk`는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환한다. 카운터 값을 비동기적으로 변경시키는 Thunk 생성 함수를 만들어보자.

```jsx {11,12,13,14,15,16,17,18,19,20,21}
// modules/counter.js

import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 1초 뒤에 increase 혹은 decrease 함수를 디스패치함
export const increaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(increase());
    }, 1000);
};
export const decreaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000);
};

const initialState = 0;

const counter = handleActions(
    {
        [INCREASE]: state => state +1,
        [DECREASE]: state => state -1
    },
    initialState
);

export default counter;
```

Thunk 생성 함수를 아래와 같이 CounterContainer 컴포넌트에 적용한다. 그러면 카운터의 +1, -1 버튼을 눌렀을 때 1초 뒤에 적용되는 것을 볼 수 있다.

```jsx
// container/CounterContainer.js
import React from 'react';
import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from '../components/Counter';

const CounterContainer = ({ number, increaseAsync, decreaseAsync}) => {
    return (
        <div>
            <Counter number={number}
            onIncrease={increaseAsync} 
            onDecrease={decreaseAsync} />
        </div>
    );
};

export default connect(
    state => ({
        number: state.counter
    }),
    {
        increaseAsync,
        decreaseAsync
    }
)(CounterContainer);
```

# 3. redux-thunk 사용해보기 (응용)
## 1) 웹 요청 비동기 작업 처리하기
이번에는 thunk의 속성을 활용하여 웹 요청 비동기 작업을 처리해본다.
웹 요청 연습을 위해 JSONPlaceholder 에서 제공하는 가짜 API를 사용한다.

- 포스트 읽기( id는 1~100 사이 숫자)  
GET https://jsonplaceholder.typicode.com/posts/:id

- 모든 사용자 정보 불러오기  
GET https://jsonplaceholder.typicode.com/users

API 호출은 Promise 기반의 axios 라이브러리를 사용한다.

```bash
yarn add axios
```

가독성을 높이고 유지보수의 편의성 증진을 위하여 API 호출 함수를 따로 작성한다.
```jsx
// lib/api.js
import axios from 'axios';

export const getPost = id => 
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = id =>
    axios.get(`https://jsonplaceholder.typicode.com/users`);
```

이제 위 API를 사용하여 데이터를 받아와 상태를 관리할 sample이라는 리듀서를 생성해 보자.

```jsx
// modules/sample.js
import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

// 액션 타입을 선언합니다.
// 한 요청당 세 개를 만들어야 합니다.

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESSS = 'sample/GET__USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수를 생성합니다.
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치합니다.
// 파라미터 id는 store로부터 전달받는다??
export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림.
    try{
        const response = await api.getPost(id);
    }
}

```


## 2) 리팩토링

# References

[리덕스 미들웨어는 무엇인가? (1)](https://velog.io/@youthfulhps/%EB%A6%AC%EB%8D%95%EC%8A%A4-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80)

<리액트를 다루는 기술 개정판>(김민준, 2019)

<리액트 실전 프로그래밍 개정판>(이재승, 2020)