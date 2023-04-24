# Storybook Addon Cookie 제작기

[storybook-addon-cookie](https://github.com/hwookim/storybook-addon-cookie)를 기획부터 배포, 이후 버전 업데이트까지 했던 과정을 어느정도 남기는 글.  
면접 볼 때 가장 많이 나왔던 이야기라 한 번 정리해본다.

## 개발 배경

storybook을 사용해 UI를 확인해 개발하던 중 브라우저의 쿠키값에 관여하는 컴포넌트를 작성하게 되었다.  
사용자에 대한 세션, 토큰값은 `document.cookie`에 저장해두고 그에 따라서 해더의 값이 바뀌는 거였다.

어쨋거나 로그인 된 경우 / 로그인되지 않은 경우의 두 가지를 확인해야하는데,  
이를 위해서는 cookie 값을 브라우저 개발자도구를 통해 삭제하고 새로고침하고, 다시 만들고 새로고침하고 하는 번거로운 작업이 이어졌다.  
매번 귀찮으니 조금이라도 자동화할만한 툴이 있나 찾아봤을 때는 직접적으로 도움되는 결과가 없었다.(쿠키에 관한 동화책 이야기가 더 많았다.)  
storybook 레포에 올라온 [한가지 이슈](https://github.com/storybookjs/storybook/issues/3932)가 있었는데, 여기서 provider 같은 걸 만들라는 이야기가 그나마 도움이 되었다.

좀 더 찾다가 storybook 공식문서에서 [decorator](https://storybook.js.org/docs/6.0/react/writing-stories/decorators)라는 것을 찾아서 적용하기로 했다.  
[Context for mocking](https://storybook.js.org/docs/6.0/react/writing-stories/decorators#context-for-mocking) 항목을 보니 Provider mocking 뿐만 아니라 component story의 렌더링 전에 별도의 로직을 추가해 `document.cookie`를 임의로 조작할 수 있을 것 같았다.  
preview 파일을 통해서 전역에 설정할 수도 있어서 한 번 만들어두면 프로젝트 내에서는 편하게 쓸 수 있어보였다.

만든 결과물은 간단했다.  
각 story 마다 parameter로 cookie를 받을 수 있게하고, 있는 경우에는 cookie를 받은 parameter대로 설정하도록 했다.  
당시 프로젝트에서는 cookie를 유틸함수를 통해서 호출했기 때문에 [alias를 이용해서 아예 대체된 cookie를 이용했다.](https://github.com/retrospective6/TILBox/blob/main/client/.storybook/main.js)  
그래서 데코레이터도 `document.cookie`에 접근하지 않고 직접 선언한 객체에 접근해 쿠키값을 지정했다.

당시 만들었던 [deocrator](https://github.com/retrospective6/TILBox/blob/main/client/__mocks__/cookie.ts)와 사용했던 [스토리](https://github.com/retrospective6/TILBox/blob/main/client/__stories__/components/common/Layout.stories.tsx#enroll-beta)

해당 프로젝트에서는 한 번 만들어서 잘 썼었다.(프로젝트가 중단되긴 했지만)  
근데 다른 프로젝트를 진행할 때, 같은 문제가 또 발생했고 일단 이전 프로젝트의 코드를 긁어와서 해결했다.  
아무리 생각해도 이후 storybook을 써서 cookie와 관련된 컴포넌트를 건드릴 때마다 같은 일이 발생할 것 같았다.  
다시 찾아봐도 관련된 라이브러리도 없길래 직접 만들기로 했다.
