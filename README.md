# 뉴뉴 (Knewnew)::PC버전 🍭

<img src="https://user-images.githubusercontent.com/104430030/188837571-d895300c-0e2b-4cb9-907d-015b96852369.JPG" alt="teamKnewnew" />

## 개발 인원 및 기간

- 개발 기간 : 2022/8/16 ~ 2022/9/7 (3주)
- 개발 인원 : FE 3명, BE 3명
  - Front-end : 김광희, 손민지, 정훈조
  - Back-end : 손찬규(PM), 안상현, 음정민

## 프로젝트 소개

모바일 어플리케이션 뉴뉴(Knewnew)의 PC버전 페이지 제작을 위한 프로젝트 입니다.<br>
[뉴뉴(Knewnew)](https://play.google.com/store/apps/details?id=com.mealing.knewnnew)는 수많은 온라인 식품 선택지 속에서 유저 간 추천을 통해 원하는 식품을 손쉽게 발견할 수 있는 **데이터 기반 푸드 포털 플랫폼**입니다.<br>
식품에 대한 후기를 카테고리 별로 게시하고 조회하며 소통하는 **커뮤니티 기능에 중점**을 두고 있습니다.<br>
기존 어플리케이션 '뉴뉴(Knewnew)'는 React Native로 구현되었으나 PC버전은 React.js로 구현되어<br>
디자인 모티브만 가져왔을 뿐 개발은 초기 세팅부터 모두 직접 구현하였습니다.<br>

## 사용기술 스택

### Front-end<br>

![React Badge](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)&nbsp;
![JavaScript Badge](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)&nbsp;
![React Query Badge](https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=React&logoColor=white)&nbsp;
![StyledComponents Badge](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

### Back-end<br>

<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=Django&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;

## 협업 툴

<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=MySQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;

## 시연 영상 및 구현 사항

[🍭뉴뉴 (Knewnew)](https://youtu.be/T7NdgYqNdog)

### 메인(=리스트) 페이지

- 게시글 리스트 조회
- 무한스크롤
- 비로그인 사용자도 조회는 가능하나 수정, 삭제 등의 조작은 로그인 사용자만 가능하도록 구현<br>
  ![2022-09-07_19:24:36_video](https://user-images.githubusercontent.com/104430030/190970982-369e5461-dcb8-4c0f-b61d-a562f2c810d7.GIF)<br><br>

### 소셜 로그인

- Kakao / Naver OAuth 2.0 API를 이용한 소셜 로그인 기능 구현
- JWT를 이용한 인증과 Refresh Token을 이용한 토큰 보안 강화
- Token의 상태 관리를 하기 위해 Redux 활용<br>
  ![2022-09-07_19:24:36_video 2](https://user-images.githubusercontent.com/104430030/190971257-782fa279-ba3c-42f8-a119-0b9951913970.GIF)<br>
  ![2022-09-07_19:24:36_video 5](https://user-images.githubusercontent.com/104430030/190971401-a7cbbcc3-1620-419e-bd65-66cec3c24794.GIF)<br><br>

### 추가 정보 입력 페이지

- 회원가입 이후 추가 정보 수집 후 저장
- 최초 회원가입 시 1회만 수집되며, 이후 로그인 시에는 생략되고 바로 메인 페이지로 이동<br>
  ![2022-09-07_19:24:36_video 3](https://user-images.githubusercontent.com/104430030/190971313-ed11f89b-bc13-46e1-a8f0-e21294439dc8.GIF)<br><br>

### 글쓰기 페이지

- Form Data를 활용한 게시글 전송 기능 구현
- S3와 pre signed URL을 이용한 이미지 파일 업로드 기능 구현<br>
  ![2022-09-07_19:24:36_video 9](https://user-images.githubusercontent.com/104430030/190971685-772079d8-b102-4a1a-b5d6-4844a1388604.GIF)<br>
  ![2022-09-07_19:24:36_video 10](https://user-images.githubusercontent.com/104430030/190971700-cf86b8ef-0666-4756-b8e3-0ac9021c95c5.GIF)<br><br>

### 게시글 상세 페이지

- 게시글 조회, 삭제 기능 구현
- 이미지 슬라이더 구현
- 댓글 및 대댓글의 생성, 삭제 기능 구현<br>
  ![2022-09-07_19:24:36_video 6](https://user-images.githubusercontent.com/104430030/190971502-4727eb38-b64b-4850-85ea-6a02bef45a4b.GIF)<br>
  ![2022-09-07_19:24:36_video 12](https://user-images.githubusercontent.com/104430030/190972449-7c2533eb-5a5a-477e-8d05-d169cb266c82.GIF)<br>
  ![2022-09-07_19:24:36_video 7](https://user-images.githubusercontent.com/104430030/190971558-a9cb0f16-66ad-41a4-9e46-ec6722d63233.GIF)<br>
  ![2022-09-07_19:24:36_video 8](https://user-images.githubusercontent.com/104430030/190971570-c9b9ed94-4b37-4d55-a509-37e1de434da2.GIF)<br><br>

### 마이 페이지

- 로그인한 사용자의 정보 조회
- 로그아웃<br>
  ![2022-09-07_19:24:36_video 11](https://user-images.githubusercontent.com/104430030/190972313-31802e27-3068-4056-8182-ec9c47eb6d93.GIF)<br><br>

### 기타 페이지

- 모바일 앱 연계 모달창
- Nav / Footer
- 잘못된 접근 시 활용 가능한 404 페이지
