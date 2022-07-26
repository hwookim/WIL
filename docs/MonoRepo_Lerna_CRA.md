# Lerna를 이용한 MonoRepo에서 CRA 이용하기

## 설치 및 초기화

lerna 설치 및 프로젝트 초기화

```shell
$ npm install -g lerna
$ lerna init -i
```

생성된 `lerna.json` 수정

```json
{
  "packages": ["packages/*"],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

`eslint`, `prettier` 등의 공통 의존성 추가

```shell
$ yarn add -DW eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```
`-DW`를 통해 `root` 패키지에 의존성 설치를 진행

## CRA를 통한 하위 패키지 생성

```shell
$ yarn create react-app packages/react-lab --template typescript
```

`packages` 하위에 `react-lab`이라는 패키지가 CRA를 통해 생성된다.

CRA를 이용하지 않고 패키지를 생성하려면 아래의 명령어를 이용
```shell
$ lerna create module-name
```

## 하위 패키지에 의존성 추가

```shell
$ yarn workspace module-name add package-name
```

### 로컬 패키지 설치

module-1에 module-2 설치하기

```shell
$ lerna add module-2 --scope=module-1
```

## 여러 모듈 동시 실행하기

```shell
$ lerna run start --parallel
```

별 다른 scope 지정이 없으면 모든 하위 패키지 실행