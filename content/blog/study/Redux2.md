---
title: '📝 Redux(2) - 활용 예시'
date: 2021-06-17 21:33:13
category: 'study'
thumbnail: 'https://gatsby-blog-images.s3.ap-northeast-2.amazonaws.com/thumb_redux.png'
description: '코드를 중심으로 살펴보는 Redux 활용법'
tags: ['Redux', 'react-redux']
draft: false
---

*본 게시글은 책 <리액트를 다루는 기술 개정판> 17장 '리덕스를 사용하여 리액트 애플리케이션 상태 관리하기'를 정리한 내용입니다*

# 1. 프로젝트 소개

간단한 프로젝트를 통해서 리덕스 사용법을 익혀보도록 하자. 숫자를 올리고 내릴수 있는 카운터 기능, 할 일 목록을 등록하고 체크하고 삭제할 수 있는 Todo 기능을 react + redux 조합으로 구현한 프로젝트다. 완성된 모습은 아래와 같다.

![](./images/redux/react-redux2.jpeg)

## Presentational & Container 컴포넌트
리액트-리덕스 프로젝트에서는 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트를 분리하는 패턴을 주로 사용한다고 한다. `프레젠테이셔널 컴포넌트`는 주로 상태 관리가 이루어지지 않고, 그저 props를 받아 와서 화면에 UI를 보여 주기만 하는 컴포넌트를 말한다. `컨테이너 컴포넌트`는 리덕스와 연동되어 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치하기도 하는 컴포넌트를 말한다.
![사진 출처 : https://the-1.tistory.com/8](./images/redux/react-redux.png)

## Ducks 패턴
본 프로젝트의 파일 구조는 아래와 같다. `Ducks 패턴`으로 불리는 아래 파일 구조는, **액션 타입/액션 생성자/리듀서**를 `모듈`에 모아두는 방식이다.

```directory {4}
src/
|---App.js
|---index.js
|---components/ (Presentational Components)
|   |---Counter.js
|   |---Todos.js
|---containers/ (Container Components)
|   |---CounterContainer.js
|   |---TodosContainer.js
|---modules/
|   |---counter.js
|   |---index.js
|   |---todos.js
```


CRA로 리액트 프로젝트를 생성한 뒤 redux, react-redux 라이브러리를 설치한다.
```bash
yarn create react-app react-redux-tutorial
cd react-redux-tutorial
yarn add redux react-redux
```

# 2. UI(Presentational 컴포넌트) 준비하기
Todos.js 파일에 TodoItem, Todos 두 개 컴포넌트를 작성하였는데 취향에 따라 파일 두 개로 분리해도 좋다. Counter, Todos 컴포넌트를 작성한 후 App 컴포넌트에 렌더링한다. 이후 브라우저에 정상 출력된 것을 확인.

```jsx{3}
// components/Counter.js
import React from 'react';

const Counter = ({ number, onIncrease, onDecrease }) => {
    return (
        <div>
            <h1>{number}</h1>
            <div>
                <button onClick={onIncrease}>+1</button>
                <button onClick={onDecrease}>-1</button>
            </div>
        </div>
    );
};

export default Counter;
```

```jsx
// components/Todos.js
import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input type="checkbox"/>
            <span>예제 텍스트</span>
            <button>삭제</button>
        </div>
    );
};

const Todos = ({
    input,  // 인풋에 입력되는 텍스트
    todos,  // 할 일 목록이 들어있는 객체
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,

}) => {
    const onSubmit = e => {
        e.preventDefault();
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input/>
                <button type="submit">등록</button>
            </form>
            <div>
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
                <TodoItem />
            </div>
        </div>
    );
};

export default Todos;
```

```jsx
// App.js
import React from 'react';
import Counter from './components/Counter';
import Todos from './components/Todos';

function App() {
  return (
  <div>
    <Counter number={0} />
    <hr />
    <Todos />
  </div>
  );
}

export default App;

```

# 3. 모듈 만들기
리덕스 관련 코드를 작성한다. 모듈에는 액션 타입/액션 생성자/리듀서 코드를 작성해야 한다.
## counter 모듈 만들기
### 1) 액션 타입 정의하기
```jsx
// modules/counter.js
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```
액션 타입은 대문자로 정의하고, 액션 타입 이름의 충돌 방지를 위해 **'모듈 이름/액션 이름'** 형태로 정의한다.


### 2) 액션 생성자 만들기
```jsx {5,6}
// modules/counter.js
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
```
액션 생성자에는 expxort 키워드를 붙여서 추후 다른 파일에서 불러올 수 있도록 한다.

### 3) 초기 상태 및 리듀서 함수 만들기
```jsx
// modules/counter.js
(...)

const initialState = {
    number: 0
};

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

export default counter;
```
리듀서 함수는 현재 상태를 참조해서 상태를 업데이트하고 새로운 객체를 생성해서 반환하게끔 구성한다.

## todos 모듈 만들기
### 1) 액션 타입 정의하기
```jsx
// modules/todos.js
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록
const TOGGLE = 'todos/TOGGLE'; // todo 체크를 토글
const REMOVE = 'todos/REMOVE'; // todo를 제거
```


### 2) 액션 생성자 만들기

```jsx
// modules/todos.js
(...)
export const changeInput = input => ({
    type: CHANGE_INPUT,
    input
});

let id = 3; // insert가 호출될 때마다 1씩 더해진다
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false
    }
});

export const toggle = id => ({
    type: TOGGLE,
    id
});

export const remove = id => ({
    type: REMOVE,
    id
});
```

### 3) 초기 상태 및 리듀서 함수 만들기
```jsx
// modules/todos.js
(...)
const initialState = {
    input: '',
    todos:[
        {
            id:1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id:2,
            text: '리액트와 리덕스 사용하기',
            done:false
        }
    ]
};

function todos(state = initialState, action){
    switch(action.type){
        case CHANGE_INPUT:
            return{
                ...state,
                input: action.input
            };
        case INSERT:
            return{
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case TOGGLE:
            return{
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id ? {...todo, done: !todo.done}: todo
                )
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}

export default todos;
```

## 루트 리듀서 만들기

```jsx
// modules/index.js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
    counter, 
    todos,
});

export default rootReducer;
```
리덕스에서 제공하는 `combineReducers` 유틸 함수를 이용하여 루트 리듀서를 만든다.


# 4. 리액트 App에 Redux 적용하기
```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import rootReducer from './modules';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
```
`store`를 파라미터로 받는 `Provider` 컴포넌트로 App 컴포넌트를 감싸주면서 리액트 프로젝트에 리덕스를 적용한다. Provider 컴포넌트는 `react-redux` 패키지에서 가져온다.
또 `Redux DevTools`를 적용하여 웹 브라우저상에서 디버깅시 리덕스 개발자 도구를 활용할 수 있다. `redux-devtools-extension` 패키지 설치만으로 적용할 수 있는 것은 아니고, 웹 브라우저상에서 확장 프로그램 또한 설치해야 한다.

PROVIDER??????????????????????

# 5. Container Components 만들기
컨테이너 컴포넌트는 리덕스 스토어와 연동되어 상태를 받아 오고...

## 1) CounterContainer 만들기
```jsx
// containers/CounterContainer.js
import React from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = ({ number, increase, decrease }) => {
    return (
        <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    );
};

const mapStateToProps = state => ({
    number: state.counter.number,
});
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
CounterContainer 컴포넌트는 `react-redux`에서 제공하는 `connect` 함수를 사용해서 리덕스와 연동한다. 

connect?????????????? connect 함수는... subscribe...

`connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)`

`mapStateToProps`는 리덕스 스토어 안의 **상태**를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수이고, `mapDispatchToProps`는 **액션 생성 함수**를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수다. 

즉, '연동할 컴포넌트' 부분에 CounterContainer 컴포넌트를 넣으면 스토어의 상태와 액션 생성 함수가 props로 CounterContainer에 전해지는 것이다. 위 예제에선 mapStateToProps에서 반환한 number, mapDispatchToProps에서 반환한 increase()와 decrease()가 CounterContainer의 props로 전해진다.

mapStateToProps와 mapDispatchToProps를 정의할때 파라미터로 전달하는 state, dispatch는 각각 스토어가 지닌 상태와 스토어의 내장 함수(dispatch)를 의미한다.

이제 아래와 같이 CounterContainer 컴포넌트를 App에 넣어주자.

```jsx {4,9}
// App.js
import React from 'react';
import Todos from './components/Todos';
import CounterContainer from './containers/CounterContainer';

const App = () => {
    return (
        <div>
            <CounterContainer />
            <hr />
            <Todos />
        </div>
    );
};

export default App;
```

여기까지 코드를 작성했다면 카운터의 +1, -1버튼이 정상 작동하는 것을 확인할 수 있다. 버튼을 눌렀을 때의 작동 과정을 추론해보자면 다음과 같다. 

1. modules/counter.js에서 작성한 액션과 리듀서 함수는 modeuls/index.js의 루트 리듀서에 담겨진다. 이 루트 리듀서는 ./index.js에서 스토어를 생성할 때 스토어의 파라미터로 전달되고, 해당 스토어가 `<Provider>` 컴포넌트를 통해 `<App>`의 상위에 위치하게 됨으로써(리액트 프로젝트에 리덕스를 연동) 모든 컴포넌트에서 스토어를 참조할 수 있게 된다. 

2. components/Counter.js에 작성되어 있는 +1, -1 button을 누르면 버튼에 할당되어 있는 onincrease 함수를 통해서 스토어에 `dispatch(action)` 동작을 취한다.

3. 스토어의 리듀서가 상태 변화를 야기하면 스토어와 `connect`되어 있는 `<CounterContainer>`가 mapStateToProps를 통해 전달받은 상태를 다시 modules/counter.js에 전달하고, 리렌더링 되어 화면에 출력되는 과정을 생각해볼 수 있다.

### connect 함수 간략화하기
위에서 작성한 `connect` 함수 코드는 아래와 같이 간략하게 작성할 수 있다. 기존에는 mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용했다면, 아래는 connect 함수 내부에 익명 함수 형태로 선언하는 방식이다.

```jsx {7,8,9,10,11,12}
// containers/CounterContainer.js
(...)
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
각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 조금 번거로울 수 있다. 특히 액션 생성 함수의 개수가 많아지면 더욱 번거롭다. 그럴 땐 `redux`에서 제공하는 `bindActionCreators` 유틸 함수를 사용해서 간략화할 수 있다.

```jsx {8,9,10,11,12,13,14,15,16}
// containers/CounterContainer.js
import { bindActionCreators }  from 'redux';
(...)
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
```

아래와 같이 작성하면 connect 함수가 bindActionCreators 작업을 대신해주기 때문에 bindActionCreators를 생략할 수 있다. mapDispatchToProps에 해당하는 파라미터를 함수 형태가 아닌 **액션 생성 함수로 이루어진 객체** 형태로 넣어주는 방법이다.

```jsx {5,6,7,8,9}
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

## 2) TodosContainer 만들기
```jsx
import React from 'react';
import { connect } from 'react-rdux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

const TodosContainer = ({
    input,
    todos,
    changeInput,
    insert,
    toggle,
    remove,
}) =>{
    return (
        <Todos
            input={input}
            todos={todos}
            onChangeInput={changeInput}
            onInsert={insert}
            onToggle={toggle}
            onRemove={remove}
        />
    );
};

export default connect(
    // 비구조화 할당을 통해 todos를 분리하여 
    // state.todos.input 대신 todos.input을 사용
    ({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
    }),
    {
        changeInput,
        insert,
        toggle,
        remove,
    },
)(TodosContainer);
```

마찬가지로 `<App>` 컴포넌트에서 기존 `<Todos>` 컴포넌트 출력하는 코드를 `<TodosContainer>` 컴포넌트를 출력하게끔 고친다.

```jsx {4,11}
// App.js
import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodosContainer  from './containers/TodosContainer';

const App = () => {
    return (
        <div>
            <CounterContainer />
            <hr />
            <TodosContainer />
        </div>
    );
};

export default App;
```

```jsx {7,8,9,10,12,13,14,15,16,31,32,34,37,38,41,42,43,44,45,46}
// components/Todos.js
import React from 'react';

const TodoItem = ({ todo, onToggle, onRemove }) => {
    return (
        <div>
            <input
                type="checkbox"
                onClick={() => onToggle(todo.id)}
                checked={todo.done}
                readOnly={true}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                {todo.text}
            </span>
            <button onClick={() => onRemove(todo.id)}>삭제</button>
        </div>
    );
};

const Todos = ({
    input,
    todos,
    onChangeInput,
    onInsert,
    onToggle,
    onRemove,
}) => {
    const onSubmit = e => {
        e.preventDefault();
        onInsert(input);
        onChangeInput(''); // 등록 후 인풋 초기화
    };
    const onChange = e => onChangeInput(e.target.value);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={input} onChange={onChange} />
                <button type="submit">등록</button>
            </form>
            <div>
            {todos.map(todo =>(
                <TodoItem
                    todo={todo}
                    key={todo.id}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            ))}
            </div>
        </div>
    );
};

export default Todos;
```

![](./images/redux/react-redux3.jpeg)







# 6. redux-actions 라이브러리 활용하기