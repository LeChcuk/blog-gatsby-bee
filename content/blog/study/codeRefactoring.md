---
title: '📝 React Redux 코드 리팩토링 '
date: 2021-08-20 22:57:13
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/react-redux.png'
description: '코드짤 때 헷갈리기 쉬운 문법들을 정리했다'
tags: ['redux-actions', 'Immer','Redux-toolkit']
draft: false
---


# 1. (모듈) redux-actions

`redux-actions`는 리덕스의 **액션 생성 함수(액션 생성자)**와 **리듀서**를 좀 더 간편하게 작성할 때 사용되는 라이브러리다.

## 1) createAction()

```jsx {10,11,12}
import { createAction } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 기존 액션 생성 방식
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// createAction()을 활용한 액션 생성 방식
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE); 
```

`createAction()`의 파라미터로 액션 타입을 전달하여 액션 객체를 만들어냈다.


아래와 같이 `createAction()`의 두 번째 파라미터로 payload 생성 함수를 전달해서 액션 객체에 payload를 덧붙일 수 있다.

```jsx {5,6,7,8,9}
import {createAction} from 'redux-actions';

const WRITE_POST = 'write/WRITE_POST';

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
    title,
    body,
    tags,
}));
```

그러면 다음과 같은 액션 객체가 생성된다.

```
{ type: write/WRITE_POST, payload:{title:'', body:'', tags:''}}
```

이렇게 생성된 `writePost` 액션 생성자는 다른 컴포넌트에서 `dispatch(writePost({props 또는 state})` 형태로 사용한다.

## 2) handleActions()


```jsx {25,26,27,28,29,30,31,32}
import { createAction, handleActions } from 'redux-actions';

// 액션 타입 선언 및 액션 생성자 생략...

const initialState = {
    number: 0
};

// 기존 리듀서 생성 방식
function counter(state = initialState, action){
    switch(action.type){
        case INCREASE:
            return {
                number: state.number +1        
            };
        case DECREASE:
            return {
                number: state.number -1
            };
        case default:
            return state;
    }
}

// handelActions()를 활용한 리듀서 생성 방식
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1}),
    [DECREASE]: (state, action) => ({ number: state.number - 1}),
  },
  initialState,
);

```

`handleActions()`의 첫 번째 파라미터로 각 액션에 대한 업데이트 함수를 넣고, 두 번째 파라미터로 초기 상태를 전달한다.

payload를 갖는 액션 객체가 dispatch되었을 때 `handleActions()`에서 이 payload를 다루는 방법은 아래와 같다.
앞서 `createAction()`으로 만든 액션 객체가 payload라는 객체로 title,body와 같은 추가 데이터를 관리하고 있음을 확인했다. 따라서 이 데이터에 접근하기 위해서는 번거롭더라도 action.payload와 같이 사용해야 한다.


```jsx {14,15,16}
// 초기상태 정의
const initialState = {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
};

const wrtie = handleActions(
  {
    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, action}) => ({
        ...state,
        post: action.payload // here!
    }),
  }
);
```

아래와 같이 객체 비구조화 할당을 통해서 action 값의 payload 이름을 새로 설정해주면 action.payload가 어떤 값을 의미하는지 좀 더 쉽게 파악할 수 있다.

```jsx {4,5,6}
const wrtie = handleActions(
  {
    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
        ...state,
        post,
    }),
  }
);
```


# 2. (모듈) Immer

리듀서에서 상태를 업데이트할 때는 불변성을 지켜야 한다.
일반적인 상황에서는 spread 연산자(...)와 배열 내장 함수를 활용해서 불변성을 지킨다.
하지만 객체의 깊이가 깊어질수록 불변성을 지키기가 까다로워진다.

```jsx
// {somewhere:{...}, foo:1}
const object = {
  somewhere: {
    deep: {
      inside:3,
      array: [1,2,3,4]
    },
    bar: 2
  },
  foo: 1
};

// somewhere.deep.inside 값을 4로 바꾸기
let nextObject = {
  ...object,
  somewhere: {
    ...object.somewhere,
    deep: {
      ...object.somewhere.deep,
      inside:4
    }
  }
};
```

이렇게 전개 연산자를 자주 사용한 것은 기존에 가지고 있던 다른 값은 유지하면서 원하는 값을 새로 지정하기 위함이다.
그런데 이렇게 작업하는 것은 번거롭다. 가독성 또한 좋지 않다.
immer를 사용하면 더 편리하고 가독성 좋게 코드를 작성할 수 있다.

`produce()`의 첫 번째 파라미터는 수정하고 싶은 상태이고, 
두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수다.

두 번째 파라미터로 전달되는 함수 내부에서 값을 변경하면,
`produce` 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해 준다.
예시를 살펴보도록 하자.

```jsx
import produce from 'immer';

const originalState = [
  {
    id: 1,
    todo: '전개 연산자와 배열 내장 함수로 불변성 유지하기',
    checked: true,
  },
  {
    id: 2,
    todo: 'immer로 불변성 유지하기',
    checked: false,
  }
];

const nextState = produce(originalState, draft => {
  // id가 2인 항목의 checked 값을 true로 변경하기
  const todo = draft.find(t => t.id === 2); // id가 2인 항목 찾기
  todo.check = true;

  // 배열에 새로운 데이터 추가하기
  draft.push({
    id: 3,
    todo: '일정 관리 앱에 immer 적용하기',
    checked: false,
  });
})
```

`immer` 라이브러리의 핵심은 '불변성에 신경 쓰지 않는 것처럼 코드를 작성하되 불변성 관리는 제대로 해주는 것'이다.

`immer`는 복잡한 리듀서의 코드를 간략화하는 데도 유용하다.

```jsx
// Immer를 사용하지 않은 기존 리듀서
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input}),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? {...todo, done: !todo.done } : todo
      ),
    }),
  },
  initialState,
);

import produce from 'immer';

// Immer를 사용한 리듀서
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input;
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        draft.todos.push(todo);
      }),
  },
  initialState,
);
```

다만 `[CHANGE_INPUT]`과 같이 짧은 업데이트 함수의 경우에는 immer를 적용하는 것이 오히려 가독성을 해칠 수 있다.

# 3. (모듈) Redux-toolkit

`Redux Toolkit`은 기존 리덕스 로직의 개선안이다.
리덕스를 사용하기 위해 작성해야만 했던 보일러 플레이트 코드를 대폭 줄이고 단순화했다.
리듀서, 액션타입, 액션 생성자, 초기상태를 `slice`로 통합하여 리덕스 사용을 편리하게 해준다.
Redux Toolkit을 활용하면 앞서 소개한 redux-actions와 Immer가 필요없어진다.


```bash
yarn add react-redux @reduxjs/toolkit
```

```jsx
// app/store.js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```
`configureStore()`는 기존 리덕스 `createStore()`에 몇몇 기능을 더해서 개발자의 편의를 도모한 함수다.
`configureStore()`를 통해서 리덕스 스토어를 만들면, Redux DevTools extension이 자동으로 활성화된다.

```jsx {5,6,9}
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

리덕스 스토어를 `<Provider>` 컴포넌트에 넣음으로써 리액트 프로젝트에 리덕스 스토어를 제공한다.

```jsx
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

`Slice()`의 파라미터로 슬라이스의 이름, 초기 상태, 상태를 어떻게 업데이트할 것인지에 관한 리듀서 함수가 필요하다. 리듀서 함수는 한 개 또는 그 이상이 올 수 있다.

슬라이스가 생성되면 액션 생성자와 리듀서 함수를 내보낼 수 있다.

리덕스는 상태 업데이트 시 불변성을 지켜줘야 한다.
Redux Toolkit의 `createSlice()`와 `createReducer()`는 내부에 `Immer`가 동작한다.

```jsx
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

```

이후 `<counterSlice>`의 리듀서 함수 `counterReducer`를 가져와 스토어에 추가한다.
스토어에게 이 slice reducer function을 이용해서 상태 업데이트를 관리하라고 명령하는 셈이다.

`configureSrore()`는 여러개의 리듀서 함수가 파라미터로 전해졌을 때 자동으로 결합(combine)한다.

이제 스토어는 이 리듀서 함수를 통해서 전역에서 상태를 업데이트할 수 있다.
다른 리액트 컴포넌트에서 `Redux Hooks`인 `useSelector()`, `useDispatch()`를 사용하여 리덕스 상태와 액션들을 제어할 수 있다.




# 4. (컨테이너) 리덕스 스토어와 연동하기

UI(Presentational Components)에서 리덕스 스토어 내부의 상태와 리듀서를 사용하기 위해서는 연결이 필요하다.
이 연결은 `react-redux`에서 제공하는 `connect()` 혹은 `Hooks`을 통해 (Container Components에서) 이루어진다.

## 1) connect()

`connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)`

`mapStateToProps`는 리덕스 스토어 내부의 상태를 컴포넌트의 props로 넘겨주는 역할의 함수고,
`mapDispatchToProps`는 액션 생성자(혹은 dispatch)를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수다.

```jsx
import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

// number가 <CounterContainer>의 props로 전달된다
const mapStateToProps = state => ({ 
    number: state.counter.number,
});

// increase(), decrease()가 <CounterContainer>의 props로 전달된다
const mapDispatchToProps = dispatch => ({ 
    increase: () => {
        dispatch(increase());
    },
    decrease: () => {
        dispatch(decrease());
    },
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CounterContainer);
```

아래와 같이 `connect()` 내부에서 익명 함수 형태로 선언하는 방식도 있다.

```jsx
export default connect(
    state => ({
        number: state.counter.number,
    }),
    distpatch => ({
        increase: () => dispatch(increase()),
        decrease: () => dispatch(decrease()),
    }),
)(CounterContainer);


```

액션 생성 함수를 각각 호출하고 dispatch로 감싸는 번거로운 작업을 `bindActionCreators` 유틸 함수를 통해서 생략할 수 있다.

```jsx
import { bindActionCreators }  from 'redux';

export default connect(
    state => ({
        number: state.counter.number,
    }),
    dispatch =>
        bindActionCreators(
            {
                increase,
                decrease,
            },
            dispatch,
        ),
)(CounterContainer);

// 굳이 bindActionCreators 함수를 선언하고 명시할 필요 없이,
// 아래와 같이 작성하면 이 작업을 connect가 대신해 준다.
export default connect(
    state => ({
        number: state.counter.number,
    }),
    {
        increase,
        decrease,
    },
)(CounterContainer);
```

## 2) react-redux Hooks

`useSelector(상태 선택 함수)`는 `mapStateToProps()`와 유사하다.
리덕스 스토어 내부의 상태를 컴포넌트의 props로 넘겨주는 역할을 한다.

아래 예제에서는 루트리듀서에서 `write`를 가져와 write의 상태들을 본 컴포넌트의 props로 넘겨주고 있다.

`useDispatch()`는 `mapDispatchToProps()`와 유사하다.
리덕스 스토어 내장함수인 dispatch를 가져와 사용할 수 있게 해준다.

```jsx
import React from 'react';
import WriteActionButtons from '../../components/write/WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import { writePost, updatePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, tags, post, postError, originalPostId } = useSelector(
        ({ write }) => ({
            title: write.title,
            body: write.body,
            tags: write.tags,
            post: write.post,
            postError: write.posstError,
            originalPostId: write.originalPostId,
        }),
    );

    // 포스트 등록
    const onPublish = () => {
        if (originalPostId) {
            dispatch(updatePost({ title, body, tags, id: originalPostId }));
            return;
        }
        dispatch(
            writePost({
                title,
                body,
                tags,
            }),
        );
    };
};
```

## 3) connect와 Hooks의 차이

`connect` 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우,
해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 해당 컴포넌트의 props가 바뀌지 않았다면 자동으로 리렌더링이 방지되어 성능이 최적화된다.

하지만 `useSelector`를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로 이루어지지 않는다.
React.memo를 컨테이너 컴포넌트에 사용하는 등의 신경을 써 주어야 한다.
<br>
---

# References

<리액트를 다루는 기술 개정판>(김민준, 2019)

[리덕스 잘 쓰고 계시나요?][1]

[Redux Toolkit][2]

[1]:https://ridicorp.com/story/how-to-use-redux-in-ridi/
[2]:https://redux-toolkit.js.org/
