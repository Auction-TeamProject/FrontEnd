import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* css 전역변수 */
  :root {
  --primary-text-color: #000; /* 주 텍스트 색상 */
  --secondary-text-color: #555; /* 보조 텍스트 색상 */
  --muted-text-color: #888; /* 덜 중요한 텍스트 색상 */
  --background-color: rgb(238 233 233); /* 배경 색상 */
  --font-size-base: 1rem; /* 기본 폰트 크기 */
  --font-size-small: 0.9rem; /* 작은 폰트 크기 */
  --font-size-xsmall: 0.8rem; /* 매우 작은 폰트 크기 */
  --font-size-medium: 1.25rem; /* 중간 폰트 크기 */
  --font-size-large: 2rem; /* 큰 폰트 크기 */
  --primary-color: rgb(255 212 0); /* 프로젝트 아이덴티티 컬러 */
  
  }

  /* 기본 스타일 초기화 */
  * {
    padding: 0;
    margin: 0 auto;
    user-select: none;
  }

  /* input과 textarea 태그에 대해 텍스트 선택 가능하게 설정 */
  input,
  textarea {
    user-select: text;
  }

  /* 모든 요소에 box-sizing: border-box 적용 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 스크롤바 숨기기 */
  html,
  body {
    overflow-x: hidden;
  }

  body {
    /* ios에서 상단 안전영역 여유값 */
    padding-top: env(safe-area-inset-top, 20px);
    padding-bottom: env(safe-area-inset-bottom, 20px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color:var(--background-color);
  }

  /* a 태그 기본 스타일 제거 */
  a {
    padding: 0;
    margin: 0;
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  a:focus {
    outline: none;
  }

  #root {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: 425px;
    height: 100vh;
    background-color:var(--background-color);
  }

  /* button 태그 기본 스타일 제거 */
  button {
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus {
    outline: none;
  }

  /* ul 태그 기본 스타일 제거 */
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
