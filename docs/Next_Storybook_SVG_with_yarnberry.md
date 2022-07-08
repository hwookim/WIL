# Use Svg on Next.js and Storybook with yarn berry


### 요약
@svgr/webpack 설치 및 storybook 설정 추가  
storybook webpack 5 업그레이드  
process 패키지 추가  
[샘플 코드](https://github.com/hwookim/nextjs-practice/tree/use_svg)

---

Next.js에서 svg를 쓰려고 하니 storybook에서는 아래와 같은 오류가 발생했다.  
실행 자체는 문제 없이 되는데, svg를 이용하는 컴포넌트에 접근하면 발생한다.

## @svgr/webpack 설정 추가

```shell
Failed to execute 'createElement' on 'Document': The tag name provided ('static/media/src/assets/icon/Icon.svg') is not a valid name.

Error: Failed to execute 'createElement' on 'Document': The tag name provided ('static/media/src/assets/icon/Icon.svg') is not a valid name.
    at createElement (http://localhost:6006/vendors~main.iframe.bundle.js:43084:34)
    at createInstance (http://localhost:6006/vendors~main.iframe.bundle.js:44281:20)
    at completeWork (http://localhost:6006/vendors~main.iframe.bundle.js:53553:28)
    at completeUnitOfWork (http://localhost:6006/vendors~main.iframe.bundle.js:56896:16)
    at performUnitOfWork (http://localhost:6006/vendors~main.iframe.bundle.js:56871:5)
    at workLoopSync (http://localhost:6006/vendors~main.iframe.bundle.js:56791:5)
    at renderRootSync (http://localhost:6006/vendors~main.iframe.bundle.js:56754:7)
    at performSyncWorkOnRoot (http://localhost:6006/vendors~main.iframe.bundle.js:56377:18)
    at http://localhost:6006/vendors~main.iframe.bundle.js:45416:26
    at unstable_runWithPriority (http://localhost:6006/vendors~main.iframe.bundle.js:117400:12)
```

next를 위해 `@svgr/webpack`을 설치해뒀으니 `next.config.js`와 같이 storybook 설정도 바꿔보자.

```js
// /.storybook/main.js

module.exports = {
  webpackFinal: async (config) => {
    //...다른 설정 생략
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });
    
    return config;
  }
};
```

storybook에서 기존에 svg에 대한 처리 모듈이 있어 기존 것을 삭제하고 추가하는 방식으로 진행해야한다. ~~기본 모듈은 왜 안되는걸까 대체~~

이제 실행을 해보면...  
실행이 안된다!

### Webpack 5로 업그레이드

```shell
ERROR in ./src/assets/svg/Icon.svg
Module build failed (from ./.yarn/cache/@svgr-webpack-npm-6.1.1-3f08f8975a-7ac1859424.zip/node_modules/@svgr/webpack/dist/index.js):
TypeError: this.getOptions is not a function
    at Object.svgrLoader ([project path]/.yarn/cache/@svgr-webpack-npm-6.1.1-3f08f8975a-7ac1859424.zip/node_modules/@svgr/webpack/dist/index.js:83:24)
 @ ./src/components/Component.tsx 11:0-51 42:40-49
 @ ./__stories__/components/Component.stories.tsx
 @ ./__stories__ sync ^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$
 @ ./.storybook/generated-stories-entry.js
...생략
```

next에서는 잘되는데 왜 storybook에서는 안될까...  
next는 webpack5를 이용하고 storybook의 기본 빌더는 webpack4인 게 차이가 있을까? 해서 storybook의 기본 빌더를 5로 업그레이드하기로 했다.

찾아보니 storybook 개발진이 올려둔 [webpack5로 업그레이드 하는 방법](https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324) 이 있다.
잘 읽어보고 따라하자.
webpack5와 관련된 두가지 storybook 패키지를 설치하고 `main.js`를 변경하자.
```shell
yarn add -D @storybook/builder-webpack5 @storybook/manager-webpack5
```

```js
// /.storybook/main.js
module.exports = {
  //...
  core: {
    builder: 'webpack5',
  },
  //...
}
```

위의 두가지만 하면 오류가 여전히 발생한다.  
```shell
Error: Qualified path resolution failed - none of those files can be found on the disk.
//...
```
추측하건데, yarn berry가 하위 패키지를 제대로 읽지 못해 생기는 것 같다.  
의존성이 제대로 명시되지 않으면 없는 취급하는 건 yarn berry의 목적이다! 정말 필요한 의존성만 쓰기 위해서!

마지막에 나오는 [Yarn resolutions](https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324#yarn-resolutions) 에 따라서 설정해주자.  
모든 설정을 다 똑같이 넣을 필요는 없고, 안쓰는 것들은 빼도 된다. 난 아래와 같이 추가했다.

```json
{
  "resolutions": {
    "webpack": "^5.0.0",
    "webpack-dev-middleware": "^4.1.0",
    "webpack-virtual-modules": "^0.4.2"
  }
}
```

이제 그럼 또 새로운 오류가 날 반겨준다. ㅋㅋㅋㅋㅋㅋㅋㅋㅋ

```shell
//...
ModuleNotFoundError: Module not found: Error: Can't resolve 'process/browser.js' in '/[project path]/.yarn/cache/es6-shim-npm-0.35.6-aa3f39c793-31b27a7ce0.zip/node_modules/es6-shim'
//...
```

가장 중요한 부분은 이거다. process 패키지에 접근을 할 수 없다!  
아마 이것도 yarn berry의 문제인 것 같다. 쉽지않다.

### process 패키지 추가

패키지에 접근을 못하니, 접근하기 쉽게 그냥 설치해버리자.

```shell
yarn add -D process
```

검색한 stackoverflow 글에선 추가적으로 설정을 하라고 하긴 하는데, 별도 설정 없어도 잘 된다.

이젠 진짜로 실행이 잘 된다!!!!!
![](https://user-images.githubusercontent.com/45786387/178015943-302b8a92-ea99-43ab-b8a7-a7d60f47a16a.png)

---
[Storybook: Failed to execute 'createElement' on svg files using @svgr/webpack](https://stackoverflow.com/questions/61498644/storybook-failed-to-execute-createelement-on-svg-files-using-svgr-webpack)
[Storybook experimental Webpack 5 support](https://gist.github.com/shilman/8856ea1786dcd247139b47b270912324#yarn-resolutions)
[Webpack 5 - Uncaught ReferenceError: process is not defined](https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined)