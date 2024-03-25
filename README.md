# DevCamp - 1주차

## 정리

[노션](https://www.notion.so/1-00429314afce45069ea927f3d545ed44?pvs=4#bdf46f98922c44b582fbc28d618c05b7)에 추가 정리 하였습니다. 틀린 내용이나 부실하다면 알려주십시오.

### 진행사항

~~취소선~~: 완료  
_기울임_: 지연

### 3월 18일[월] (D+0)
**오늘 할 일**
1. ~~shadcn/ui, zod, React Hook Form공부하기~~

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
### 3월 19일[화] (D+1)
**오늘 할 일**
1. ~~화면 구성하기~~

###화면 구성
![Alt text](https://github.com/wltjd1688/devcamp-login-logout/blob/main/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-03-19%2001.18.05.png)

- Ligth/Dark/System 구현
- 레이아웃 구현
- 유효성 검사 구현
- 버튼 구현 및 화면 넘겨짐 구현

### 3월 20일[수] (D+2)

> **오늘 할 일**
>
> 1. 회원가입 기능 및 구성요소, 디자인등 구상
>    - ~~회원가입 페이지를 tabs를 이용해서 2개로 작성할 예정~~
>    - ~~1페이지에 이름, 닉네임, 이메일, 성별(toggle-group사용), 주민번호앞자리, 연락처,~~ _주소입력 칸 추가_
>    - ~~2페이지에 비밀번호, 비밀번호 확인,~~ 추가질문(_관심분야[bedge], 자기소개[textarea]) 추가_
>    - _3페이지는 다이얼 로그를 이용한 회원가입 성공을 알리는 용도로 추가_
>    - _로그인 페이지에서 회원가입하기 버튼을 클릭하면 오른쪽 그림이 왼쪽으로 이동하면서 왼쪽의 로그인폼을 가리고 오른쪽의 회원가입 폼을 띄움_
>    - ~~회원가입 폼은 Tabs로 구성할 예정(2-1, 2-2페이지)~~
>
> **문제점 및 추가사항**
>
> - 로그인 페이지 구현 => 회원가입으로 넘어갈 페이지가 필요해서 간단하게만 구현함
> - ~~react hook form을 한 페이지에 2개 사용할려고 하려고 했으나 구현하지 못함~~  
>   => 유효성 검사를 진행함에 있어 빠진 부분이 있으면 form의 submit이 작동하지 않아서 문제가 일어난 것
> - _*login, singup 파일로 따로 구현할려고 했으나, 많은 양의 import와 변수들 간의 관계를 구성하는데 어려움을 느껴 컴포넌트화 실패, 추후 개선할 예정*_

### 3월 21일[목] (D+3)

> **오늘 할 일**
>
> 1.  로그인 구현

### 3월 24일[일] (D+4)

> **오늘 할 일**
>
> 1. 배포해보기(AWS)
>    1. 인스턴스 생성(EC2에서 인스턴스 생성하기)
>       1. 이름: devcamp_first
>       2. 애플리케이션 및 OS 이미지: Ubuntu
>          - Amazon Machine Image(AMI)에서 프리 티어 사용
>       3. 인스턴스 유형도 프리 티어 사용(t2.micro)
>       4. 키 페어(로그인) 생성
>       5. 네트워크 설정
>          - 보안 그룹 생성에서
>             - 다음에서 SSH 트래픽 허용
>             - 이너넷에서 HTTP 트래픽 허용
>       6. 인스턴스 시작버튼 클릭
>    2. 생성한 인스턴스에서 보안탭에 들어가 인바운드 규칙 편집을 통해 3000포트를 허용한다.
>    3. 터미널에 들어가서 배포전 준비를 한다.
>       - 터미널에서 aws랑 연동시킴
>          ```
>          sudo chmod 400 [위에서 생성한 키 페어 경로를 포함해 작성하거나 마우스로 끌어오기]
>          ssh -i [키 페어가져오기, 방법은 위와 동일] ubuntu@[AWS에 적혀있는 아이피(퍼블릭 IPv4 주소)적기]
>          ```
>       - 패키지 매니저 최신으로 업데이트
>          ```
>          sudo apt update
>          sudo apt upgrade
>          sudo apt-get update
>          sudo apt-get upgrade
>          ```
>       - nvm 설치
>          ```
>          // nvm 설치
>          curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
>          // nvm 활설화
>          . ~/.nvm/nvm.sh
>          // 최신 버전의 node 설치
>          nvm install node
>          또는 
>          nvm install -- lts
>          ```
>       - node랑 npm버전이 출력되는지 확인
>         ```
>         ~$ node -v
>         v20.11.1
>         ~$ npm -v
>         10.2.4
>         ```
>       - git clone 으로 프로젝트 복사하기
>         ```
>         git clone [https//....]
>         ```
>       - 프로젝트 폴더에 들어가서 빌드하고 시작해보기
>         ```
>         npm build
>         npm start
>         ```
> 2. 무중단 배포(pm2)
>    - pm2설치
>      ```
>      npm install pm2 -g
>      ```
>    - pm2시작
>      ```
>      pm2 start npm -- start
>      ```

# DevCamp - 2주차

## 3월 25일[월] (D+5)

**오늘 할 일**

1.  shadcn 기반으로 결제 페이지 구상   
- - -   
## 결제 페이지 구상

### 필수 구성요소

- 주문 상품 정보
    - [value]상품 이름
    - [value]최소 정보 및 갯수
    - [value]가격
- 주문자 정보
    - [value]이름, 전화번호, 추가 전화번호
        - 회원가입시   
            주문자 정보 가져오기
        - 비회원일시   
            주문자 정보 입력 창 띄우기   
           결제 후 회원가입 권유하기
    - [button] 주문자 정보 수정 버튼
        - [model] 주문자 정보 수정 모달
- 배송 정보
    - [value]배송지 위치
    - [button]배송지 변경 버튼
        - 배송지 검색 모달 만들기
    - [check box]해당 배송지 기본배송지로 설정
    - [input or select]배송 메모
- 쿠폰/포인트
    - 쿠폰
        - [feat]원단위 쿠폰
        - [feat]퍼센트 단위 쿠폰
        - [button]쿠폰 변경버튼
    - 포인트
        - [input]사용 포인트 입력칸
        - [button]전액 사용 버튼
        - [value]보유 포인트 알려주는 칸
        - [check box]상품 구매하면서들어오는 포인트 사용하기
- 최종 결제금액
    - [value]원가, 사용 포인트, 적용 쿠폰가, 배송비, 총 결제금액(강조)
- [group]결제수단
    - [카드 등록..?]간편하게 카드 결제
    - 복잡하게 카드 결제
    - toss
    - 휴대폰 결제
    - 계좌이체/무통장입금
- [check box]구매 확인용 체크박스
    - 주소 맞는지 잘 확인해라 - 선물주거나 할때
    - 결제확인 서비스
- [button] 결제하기

웹에서는 가능한 한페이지로 구성할 예정   
앱크기의 화면에서는 한줄로 길게 만들 예정
