# Jest에서 Keypress 테스트하기

`fireEvent.keyDown()`은 `key`로 이벤트의 옵션을 설정해도 작동하지만, `keyPress`는 그렇지 않다.  
`fireEvent.keyPress()`에는 `charCode`가 필수적이다.(`charCode`만 넣어도 작동한다.)

추가적으로 `code`는 넣으나 마나 테스트에는 영향을 미치지 않는다.

아래와 같이 작성한 테스트는 통과한다.

```javascript
import React from "react";
import { render, fireEvent } from "@testing-library/react";

//...
  it("keypress enter to input, run method onInsert and clear value", () => {
    const onInsert = jest.fn();
    const { getByPlaceholderText } = render(<TodoInput onInsert={onInsert} />);
    const input = getByPlaceholderText("할일을 추가해주세요");

    fireEvent.change(input, {
      target: { value: "Let's TDD" },
    });

    fireEvent.keyPress(input, {
      key: "Enter", // 안넣어도 됨
      code: 13, // 안넣어도 됨
      charCode: 13, // 필수
    });

    expect(onInsert).toBeCalledWith("Let's TDD");
    expect(input).toHaveValue("");
  });
//...
```

## e. key, code, charCode

Enter  
e.key === "Enter"  
e.code === 13  
e.charCode === 13

charCode는 [Deprecated](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode)되었다고 한다. 하지만 jest에서 테스트하기 위해서는 charCode를 써야한다...?

# 공부해야 할 것

세가지 방법의 차이

어떤 방식으로 확인하는 것이 브라우저 호환에 유리한가?

---
[fireEvent.keyPress not fire in test](https://github.com/testing-library/react-testing-library/issues/269#issuecomment-455854112)