# 개인프로젝트 - 인증기능이 있는 가계부

<br><br>

## :cat2: 목차

|            [🐈 프로젝트 소개 🐈](#cat2-프로젝트-소개)             |
| :---------------------------------------------------------------: |
|            [🏠 프로젝트 구조 🏠](#house-프로젝트-구조)            |
|           [🍡 사용 기술 스택 🍡](#dango-사용-기술-스택)           |
| [🍵 기술적 고민과 트러블 슈팅 🍵](#tea-기술적-고민과-트러블-슈팅) |

<br><br>

---

<br><br>

# :cat2: 프로젝트 소개

### [🎉Vercel 배포 사이트](https://eunoh-auth-ledger.vercel.app/)

<br>

### 🐈🐕 좋은 말 할 때 로그인 해라... 😻🐶

|   프로젝트명    |           인증기능이 있는 가계부           |
| :-------------: | :----------------------------------------: |
|      분류       |                   가계부                   |
|    개발 환경    |                  React 18                  |
| 사용 라이브러리 | react-router-dom, zustand, tailwind, axios |
|    개발 기간    |          2024.06.10 ~ 2024.06.12           |

<br>

[🌙 목차로 돌아가기](#cat2-목차)

<br>

---

<br>

## :house: 프로젝트 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜api.auth.ts
 ┃ ┣ 📜api.ledger.ts
 ┃ ┗ 📜api.ts
 ┣ 📂assets
 ┃ ┗ 📜react.svg
 ┣ 📂components
 ┃ ┣ 📂Calender
 ┃ ┃ ┣ 📜Calender.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Detail
 ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Form
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜Form.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Layouts
 ┃ ┃ ┗ 📜DefaultLayout.tsx
 ┃ ┣ 📂List
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┃ ┣ 📜Card.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📜List.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Loaders
 ┃ ┃ ┣ 📜Loader.tsx
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📜loader.css
 ┃ ┣ 📂My
 ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂SignIn
 ┃ ┃ ┣ 📜SignIn.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂SignUp
 ┃ ┃ ┣ 📜SignUp.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Total
 ┃ ┃ ┣ 📜Total.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📜LedgerPage.loader.ts
 ┃ ┃ ┣ 📜LedgerPage.tsx
 ┃ ┃ ┗ 📜MyPage.tsx
 ┣ 📂data
 ┃ ┗ 📜inputs.ts
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.tsx
 ┃ ┗ 📜useLedger.tsx
 ┣ 📂query
 ┃ ┗ 📜QueryProvider.tsx
 ┣ 📂routes
 ┃ ┣ 📜ProtectedRoute.tsx
 ┃ ┗ 📜router.tsx
 ┣ 📂types
 ┃ ┗ 📜d.ts
 ┣ 📂utils
 ┃ ┣ 📜getLsMonth.ts
 ┃ ┗ 📜isValidDate.ts
 ┣ 📂zustand
 ┃ ┣ 📜auth.store.ts
 ┃ ┗ 📜ledger.store.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

<br>

[🌙 목차로 돌아가기](#cat2-목차)

<br>

---

<br>

# :dango: 사용 기술 스택

![vite](https://img.shields.io/badge/vite-5.2.12-646CFF?style=for-the-badge&logo=vite&logoColor=white) \
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) \
![react](https://img.shields.io/badge/react-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white) \
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.23.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white) \
![React](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

<br>

[🌙 목차로 돌아가기](#cat2-목차)

<br>

---

<br>

# :tea: 기술적 고민과 트러블 슈팅

### 트러블 슈팅

1. API 레이어화:

    - axios API를 클래스로 레이어화하여 Tanstack Query와 Zustand를 사용하기 편리하게 하였습니다.
    - 이를 통해 상태 관리와 데이터 fetching 로직을 분리하고, React 컴포넌트에서 쉽게 사용할 수 있도록 했습니다.

2. Redux => Zustand:

    - Redux에서 Zustand로 전환하여 보일러플레이트 코드를 줄이고 사용성을 높였습니다.
    - -Zustand의 간결한 API 덕분에 상태 관리를 더 쉽게 구현할 수 있었습니다.
    - 이로 인해 코드의 가독성과 유지보수성이 크게 향상되었습니다.

3. Tanstack Query의 staleTime 및 invalidateQueries 적용:

    - Tanstack Query의 staleTime을 Infinity로 설정하여 데이터를 무한히 캐시하도록 했습니다.
    - 데이터 변화를 감지하기 위해 mutation 시에만 invalidateQueries를 사용하여 쿼리를 무효화했습니다.
    - 이를 통해 불필요한 데이터 요청을 줄이고 성능을 최적화했습니다.

<br>

[🌙 목차로 돌아가기](#cat2-목차)

<br>

---
