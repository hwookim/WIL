# Hoisting

변수 및 함수 선언이 컴파일 단계에서 메모리에 저장되며 해당 부분이 최상단으로 옮겨진 것처럼 보이는 현상

아래와 같은 코드가 실행된다.
```javascript
print("HI");

function print(value) {
  console.log(value);
}
```

변수의 경우에는 초기화된 값이 아닌 선언 자체만 호이스팅되고 해당 라인을 지날 때 초기화가 진행된다.

```javascript
print(str + " 1"); // undefind 1 <= >var str; print(str + " 1");

var str = "HI";

print(str + " 2"); // HI 2

function print(value) {
  console.log(value);
}
```

`let`과 `const`의 경우에는 호이스팅은 일어나지만 해당 라인에 도달할 때까지 변수에 엑세스할 수 없게 된다.

```javascript
console.log(str); // Uncaught ReferenceError: str is not defined
const str = "HI";
```

[MDN](https://developer.mozilla.org/ko/docs/Glossary/Hoisting)