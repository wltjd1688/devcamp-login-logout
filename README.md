# 목표
shadcn/ui, Zod, React Hook Form을 공부하고  [로그인/로그아웃 페이지](https://example.sparta-devcamp.com/) 구현

## 공부 흐름 순서
1. 각 개념에 대해서 간단하게 공부 및 정리
2. 로그인 페이지를 보면서 각각이 해당 예제에서 어떻게 사용될지 정리하기
    * 로그인 페이지의 기능들을 뜯어보면서 작게 구분하기
    *  특정 기능을 어떻게 구현할지 정리하기

## 정리
[노션](https://www.notion.so/1-00429314afce45069ea927f3d545ed44?pvs=4#bdf46f98922c44b582fbc28d618c05b7)에 추가 정리 하였습니다. 틀린 내용이나 부실하다면 알려주십시오.
### [shadcn/ui 란?](https://ui.shadcn.com/)
Radix UI와 Tailwind CSS를 기반으로 개발된 재사용 가능한 UI 컴포넌트의 집합이다.

### [Zod](https://zod.dev/)
Zod는 타입스크립트를 우선하는 스키마 선언/검증 라이브러리이다.


### [React Hook Form](https://react-hook-form.com/)
간단하고 효율적인 방식으로 폼 유효성 검사와 상태 관리를 처리할 수 있게 도와줍니다.

## 구현 순서
#### 1. next.js 설치
```
npx create-next-app@latest
```
```
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```
#### 2.라이브러리 설치
shadcu/ui
```
npx shadcn-ui@latest init
```
```
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```
zod
```
npm install zod 
```
React Hook Form
```
npm install react-hook-form
```
#### 3. 화면 구성
![Alt text](https://github.com/wltjd1688/devcamp-login-logout/blob/main/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-03-19%2001.18.05.png)
* Ligth/Dark/System 구현   

* 레이아웃 구현   

* 유효성 검사 구현   

* 버튼 구현 및 화면 넘겨짐 구현   