# Closure

함수와 함수가 선언된 어휘적 환경의 조합

내부 함수에서 외부 함수의 context에 접근할 수 있도록 함

```js
const store = (()=> { // 외부 함수
  const state = {
    todos: [],
    // ...
  };
  
  const getTodos = () => { // 내부 함수
    return state.todos;
  }
  
  const setTodos = (todos) => { // 내부 함수
    state =  {
      todos,
      ...state,
    }
  };
  
  return {
    state,
    getTodos,
    setTodos,
  };
})();
```

위와 같은 코드에서 `store`는 즉시 실행되는 외부 함수이고 `getTodos`, `setTodos`는 내부 함수다.  
외부 함수와 외부 함수의 지역 변수는 이를 사용하는 내부 함수가 소멸될 때까지 소멸되지 않고 유지된다.

즉시 실행되는 외부 함수의 실행이 종료되더라도, `state`라는 외부 함수에서 정의된 지역 변수에 계속 접근이 가능하다는 것이다.    
자바스크립트에서는 함수를 리턴하고, 리턴하는 함수가 **클로저**를 형성하기 때문 

```js
const createStore = () => {
  // store의 외부 함수 내용과 동일
};

const store1 = createStore();
const store2 = createStore();
```

`store1`과 `store2`는 각각이 클로저이며 서로 다른 context를 갖게 된다.  
같은 함수에서 파생되었지만 둘 사이에 연관관계는 생기지 않는다.

## Closure Scope Chain

모든 클로저에는 세가지 범위가 존재한다.

- 지역 범위 (Local Scope, Own Scope)
- 외부 함수 범위 (Outer Functions Scope)
- 전역 범위 (Global Scope)

