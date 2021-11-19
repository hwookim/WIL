# Test file upload with Jest

## File Upload 방식

```tsx
// with FileReader
const reader = new FileReader();
useEffect(() => {
  reader.addEventListener('load', (evt) => {
    if (reader.result) {
      onSubmit(reader.result as string);
    }
  });
}, [reader]);

const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  const files = event.target.files as FileList;
  reader.readAsDataURL(files[0]);
};
```

```tsx
// with URL.createObjectURL
const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  event.preventDefault();
  const files = event.target.files as FileList;
  if (!files[0]) {
    return;
  }

  const file = URL.createObjectURL(files[0]);
  onSubmit(file);
};
```

### FileReader vs URL.createObjectURL

`URL.createObjectURL`이 더 빠른 속도를 보여주지만, 상황에 따라 `URL.revokeObjectURL`을 통해 메모리를 해제해줄 필요가 생긴다.

무엇보다 `URL.createObjectURL`이 `FileReader`보다 테스트하기 쉽다..! (경험적인 측면에서)

## Testing

```tsx
const DEFAULT_ARGS: ImgSelectorProps = {
  onSubmit: jest.fn(),
};

const renderImgSelector = (props: Partial<ImgSelectorProps>): RenderResult => {
  return render(<ImgSelector {...DEFAULT_ARGS} {...props} />);
};

describe('on change file input', () => {
  // 테스트를 위해 임의로 만드는 파일 객체
  const file = new File(['test'], 'test.png', { type: 'image/png' });
  
  // URL.createObjectURL을 mocking해 변경되는 파일 입력이 제대로 반영되는지 확인할 수 있도록 한다.
  // jest의 실행환경에는 global.URL 객체가 없다!! 그러니까 mocking 해야만한다!
  const mockedFileConverter = jest.fn((file) => file.toString());
  URL.createObjectURL = mockedFileConverter;

  test('run file converter', () => {
    const { getByTestId } = renderImgSelector({});
    const input = getByTestId('image-input');

    // fireEvent를 통해 input 발생 시 event 객체로 넘어갈 대상을 명시한다. 
    fireEvent.change(input, {
      target: { files: [file] },
    });
    expect(mockedFileConverter).toBeCalledWith(file);
  });

  const onSubmit = jest.fn();
  test('run onSubmit method with converted file', () => {
    const { getByTestId } = renderImgSelector({ onSubmit });
    const input = getByTestId('image-input');

    fireEvent.change(input, {
      target: { files: [file] },
    });
    // mocking을 통해 의도했던대로 파일이 제대로 입력되고 있는지 확인!
    expect(onSubmit).toBeCalledWith(file.toString());
  });
});
```

---

[FileReader vs URL.createObjectURL](https://stackoverflow.com/questions/31742072/filereader-vs-window-url-createobjecturl)