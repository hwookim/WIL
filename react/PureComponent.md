# PureComponent

`React.Component`에서 `shouldComponentUpdate()`의 역할이 미리 정의되어있는 클래스형 컴포넌트  
얕은 비교를 통해 재렌더링되는 횟수를 줄인다. 

props나 state가 object인 경우 얕은 비교에 의해서 실제 값이 변경되지 않았음에도 object의 reference가 달라 리렌더링될 수 있고,  
반대로 값이 실제로는 변했으나 obejct의 reference는 변하지 않아 리렌더링 되지 않을 수도 있다.

## 얕은 비교 (Shallow Compare)

숫자나 문자열 같은 scalar 값은 값을 비교함  
Object는 **reference**만 검사

```js
// shallow compare
'a' === 'a' //true

const A = {
  value: {
    hi: 'hi',
  },
}

const B = Object.assign({}, ...a);

A.value === B.value // false

```

## 지금 써야하나?

functional component가 처음 나왔을 당시엔 리렌더링에 대한 최적화가 되어있지않아서,  
PureComponent를 통해 최적화를 진행하는 일이 많았다. (그래서 글을 찾아보면 죄다 17~18년도다.)

functional component에서 PureComponent의 역할을 할 수 있도록 하는 [recompose](https://github.com/acdlite/recompose) 의 깃헙에 들어가면 서두에 이런 글이 있다.

> Hi! I created Recompose about three years ago. About a year after that, I joined the React team. Today, we announced a proposal for Hooks. Hooks solves all the problems I attempted to address with Recompose three years ago, and more on top of that. I will be discontinuing active maintenance of this package (excluding perhaps bugfixes or patches for compatibility with future React releases), and recommending that people use Hooks instead. Your existing code with Recompose will still work, just don't expect any new features. Thank you so, so much to @wuct and @istarkov for their heroic work maintaining Recompose over the last few years.

현재는 hooks로 모두 해결이 가능하다는 얘기다.

생소한 개념이라 공부하긴 했는데, 쓸 일은 없을 것 같다...! 

---

[shallow compare 부터 React.PureComponent 까지](https://ideveloper2.tistory.com/159)