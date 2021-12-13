# next/image with Storybook, Jest

[샘플코드](https://github.com/hwookim/nextjs-practice/tree/next_image)

## [next/image](https://nextjs.org/docs/api-reference/next/image)

resizing, 최적화 등을 지원  
이미지 개수가 빌드 시간에 영향을 주지 않게 됨

`width, height` 혹은 `layout="fill"`을 옵션으로 명시해야함  
-> 명시하지 않으면 exception 발생!

외부 이미지를 이용할 경우 사전에 `next.config.js`에 도메인을 명시해야 src에 이용이 가능하다.
```js
//next.config.js
module.exports = {
  images: {
    domains: ['avatars.githubusercontent.com', 'localhost'],
  },
};
```

## With Storybook

최적화 작업을 진행하지 않도록 설정해줘야한다.
`preview.js`에서 모든 `next/image` 컴포넌트가 최적화를 진행하지 않도록 설정할 수 있다. 

```jsx
//preview.js
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
```

## With Jest

`next/image`를 이용하면 랜더링 시 최적화에 의해서 `src` 속성이 최적화되어 변경된 값으로 반영된다.  
이에 props에 따른 이미지 출력, 선택에 따른 이미지 변화 등을 테스트할 수 없게 된다.

이를 테스트하기 위해서는 `next/image`의 컴포넌트가 아니라 단순 `img`태그로 mocking해   
테스트를 우회해서 진행할 수 있도록 변경해야한다.

```jsx
jest.mock('next/image', () => function MockImage(props) {
  return <img {...props} />;
});
```

mocking 시 주의할 점이 하나 있는데, `next/image`를 mocking해야하기 때문에  
위의 코드를 해당 컴포넌트의 import 보다 먼저 해야한다.

```tsx
import { MockImage } from '@mocks/MockComponents';
jest.mock('next/image', () => MockImage);

import React from 'react';
import ImageComponent from '@/components/ImageComponent';
import { render } from '@testing-library/react';
```
이런 식으로!