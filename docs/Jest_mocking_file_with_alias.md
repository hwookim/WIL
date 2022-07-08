# Jest mocking file with alias

jest에서는 svg나 css같은 파일들을 읽어오지 못한다.  
babel등의 설정을 통해서 해결할 수도 있지만, 프로덕션에서 babel을 쓰지 않는다면 굳이 설치하긴 좀 그렇다.  

해당 확장자를 읽으려할 때, 읽을 수 있는 파일을 대신 보내주자!  

```js
// jest.config.js
module.exports = {
  //...
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  //...
};
```

```js
// ./__mocks__/styleMock.js
module.exports = {};

// ./__mocks__/fileMock.js
module.exports = 'test-file-stub';
```

아주 쉽다.

하지만 alias랑 사용할 때 주의할 점이 있다.

```js
module.exports = {
  //...
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
  },
  //...
};
```

`/__mocks__` 에 대한 설정이 `/__mocks__/styleMock.js`, `/__mocsk__/fileMock.js`에 대한 설정보다 위로 온다면,  
jest는 자식에 대한 설정을 인식하지 않는다.

무조건 **하위 파일이 더 위로** 와야한다!!!!!  
그러니 순서를 꼭 주의하도록 하자.

요로콤 되어야 한다는 말이다.

```js
module.exports = {
  //...
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mocks/(.*)$': '<rootDir>/__mocks__/$1',
    '^@tests/(.*)$': '<rootDir>/__tests__/$1',
  },
  //...
};
```

위의 상황에서도 만일 `/__mocks__`와 `/__test__` 폴더가 `/src` 아래에 존재한다면 또 순서가 바뀌어야한다.  
이런 잔 실수가 오류를 불러오면, 의외로 해결방법을 찾기 매우 힘들다,,,,

---

[Jest Docs](https://jestjs.io/docs/webpack#handling-static-assets)
[moduleNameMapper issue comment](https://github.com/facebook/jest/issues/4262#issuecomment-362269632)