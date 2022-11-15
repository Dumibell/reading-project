<br/>

## **1. 프로젝트 소개**

### ✨매일 책 읽는 습관을 기르기 위한 개인 프로젝트입니다✨<br/>

친구들과 독서모임을 하던 중, 독후감 작성만을 위한 웹페이지가 있으면 좋겠다는 생각에 시작하게 되었습니다.<br/>

- 블로그 형태로 글을 작성할 수 있으며, 그동안 작성한 글을 모아서 볼 수 있습니다.<br/>
- 좋아요 기능을 추가하여 내가 좋아요를 누른 글들만 따로 모아서 볼 수도 있습니다.<br/>
- 작성한 글의 개수에 따라 인증 뱃지를 다르게 주어 독후감을 많이 쓸수록 등급이 올라가는 형태의 기능을 만들어보았습니다. <br/>
- 검색창에 책 제목이나 내용을 검색해 원하는 게시글만 볼 수도 있습니다.
- 프로젝트 링크👉 https://dumibell.github.io/reading-project/#/ <br/>

<br/><br/>

## **2. 개발 기간 및 인원**

- 개발 기간 : 2022/11/02 ~ 2022/11/12
- 개발 인원

  - 프론트엔드(1명): 조예지
  - 백엔드(1명): 조예지

<br/><br/>

## **3. 적용 기술**

#### Front-End

<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-14263D?style=for-the-badge&logo=TailwindCss&logoColor=white"/>

#### Back-End

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
<br/><br/>

## **4. 구현 기능**
<br/>

### 1. 로그인/회원가입

- 모달창으로 구현
- Firebase의 Authentication을 이용.

<br/>

#### 1) 로그인

![signIn](https://user-images.githubusercontent.com/100185602/201590163-04e04217-8956-4dc0-8cda-5125344cdeb1.gif)

- 로그인을 하지 않아도 메인 화면과 남들이 작성한 글을 볼 수 있지만, 글을 작성하거나 좋아요를 누르는 기능은 로그인을 한 사용자만 이용할 수 있도록 구현.
- Firebase에서 제공하는 기능을 통해 구글로그인, 또는 이메일주소와 패스워드로 로그인이 가능함.
- 입력한 메일주소/비밀번호가 없거나 일치하지 않을 경우 alert("일치하는 회원정보가 없습니다")

<br/>

#### 2) 회원가입

![signUp](https://user-images.githubusercontent.com/100185602/201590273-446dbd25-6ff0-45ca-8bdd-12ccba7d5619.gif)

- 정규식을 이용해 유효성 검사 진행
- 회원가입시 이름도 같이 입력해 updateProfile() 메서드를 이용해 displayName이 바로 업데이트되도록 구현.

<br/><br/>

### 2. 메인 페이지

#### 1) Nav바

![reading-nav](https://user-images.githubusercontent.com/100185602/201856558-a05a15a9-d555-4d24-8f35-a1c4fd0fbfe9.gif)


- useNavigate()를 이용해 페이지 이동시 경로 지정
- 로그인을 안했을 경우엔 Login, 로그인을 했을 경우엔 myPage로 보이도록 구현

<br/>

#### 2) 피드

![main-feed](https://user-images.githubusercontent.com/100185602/201590976-205d8301-d5d5-4dc7-8d32-a73d62098966.gif)

- 최신순 클릭시 createdAt으로 OrderBy
- 인기순 클릭시 like로 OrderBy
- card 컴포넌트에 보여지는 내용을 담고 map함수를 이용해 메인화면에서 요약된 게시글을 볼 수 있도록 구현

<br/><br/>

### 3. 게시글

#### 1) 글 작성

![writing](https://user-images.githubusercontent.com/100185602/201592807-d9d5dfea-1e24-48b1-b305-4abee860ed4f.gif)

⬇️ 글 작성시 저장되는 db구조

```js
await addDoc(collection(dbService, "writings"), {
  title: title,
  text: text,
  createdAt: Date.now(),
  createdDate: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`,
  like: 0,
  whoLikesIt: [],
  uid: userObj.uid,
  attachmentURL,
  name: userObj.displayName,
  visitor: 0,
});
```

⬇️ title과 text에 값이 담기는 함수

```js
const onChange = async (event) => {
  const {
    target: { name, value },
  } = event;
  if (name === "title") {
    setTitle(value);
  } else if (name === "text") {
    setText(value.replace(/\n/gi, "\\n")); //줄바꿈시 \n이 추가되어 db에 저장되도록
  }
};
```

- 줄바꿈이 반영되도록 input 태신 textarea 태그를 이용
- firestore에 db가 담길 때는 한줄의 텍스트로 저장되므로, replace함수와 정규식을 이용해 줄바꿈이 있을 때마다 text에 \n이 추가되어 저장되도록 구현.

<br/>

#### 2) 게시물 상세페이지

![detail](https://user-images.githubusercontent.com/100185602/201617250-579985a3-9a8d-434f-bb1e-d5149a55c556.gif)

- useParams를 이용해 상세페이지 연결
- 글 작성시 줄바꿈에 의해 추가한 \n이 다시 줄바꿈되어 보이도록 구현.
- 사용자 본인이 작성한 글일 경우 수정/삭제 버튼과 조회수가 나타나도록 구현.

<br/><br/>

### 4. 검색 창

![searchbox](https://user-images.githubusercontent.com/100185602/201595072-0374feb4-4cbd-4211-96dc-7fcf3533d197.gif)

- includes()를 이용해 검색한 내용이 포함된 게시글만 렌더링되도록 구현

  <br/><br/>

### 5. 마이페이지

#### 1) 프로필

![profile](https://user-images.githubusercontent.com/100185602/201596029-79bd1fef-c5bd-4b53-b501-e9ece7d97d68.gif)

- 이름 수정
- 작성글 수에 따라 등급 분류
- 로그아웃 기능

<br/>

#### 2) 내가 작성한 글 / 좋아요 한 글

![mypage](https://user-images.githubusercontent.com/100185602/201595710-b0125536-4e00-44b0-b8c8-372dad7f9280.gif)

- filter()와 includes()를 사용해 사용자가 작성한 글과 좋아요 한 글을 마이페이지에서 모아 볼 수 있도록 구현.

<br/><br/>

<img width="1467" alt="스크린샷 2022-11-15 오후 4 25 09" src="https://user-images.githubusercontent.com/100185602/201855625-4d70bbb1-b59d-4682-89d4-e380dcecccb2.png">

- 작성한 글 / 좋아요 한 글이 아예 없을 경우 위 이미지가 랜더링되도록 구현.

<br/><br/>

### 6. 기타 기능

#### 1) 좋아요

![like](https://user-images.githubusercontent.com/100185602/201591221-9849e747-ac54-4a3c-8105-9c7a9ac9eef5.gif)

```js
const plusLike = (event) => {
  updateDoc(itemRef, { like: item.like + 1 });
  updateDoc(itemRef, { whoLikesIt: arrayUnion(userObj.uid) });
};

const minusLike = (event) => {
  updateDoc(itemRef, { like: item.like - 1 });
  updateDoc(itemRef, { whoLikesIt: arrayRemove(userObj.uid) });
};

const clickLikeButton = async () => {
  if (userObj) {
    if (item.whoLikesIt.includes(userObj.uid)) {
      minusLike();
    } else {
      plusLike();
    }
  } else {
    alert("로그인이 필요한 서비스입니다.");
    setLoginModal(true);
  }
};
```

- 좋아요를 누른 사용자의 uid가 배열에 담기도록 구현.
- 좋아요 배열에 사용자의 uid가 없을 경우 like 부분 +1, 좋아요 배열에 사용자 uid 추가
- 좋아요 배열에 사용자의 uid가 있을 경우 like 부분 -1, 좋아요 배열에서 사용자 uid 제거
  
  <br/>

#### 2) 조회수

![조회수](https://user-images.githubusercontent.com/100185602/201621812-467e16c0-df4b-43bc-94cf-f28e77f8c2b8.gif)

```js
if (userObj.uid !== item.uid) {
  updateDoc(itemRef, { visitor: item.visitor + 1 }); //다른 사용자들이 눌렀을 때만 조회수 집계
}
```

- 다른 사용자의 게시물을 누를 때마다 기존 조회수 +1
- 사용자 본인이 작성한 게시물일 경우 상세페이지에서 조회수를 확인할 수 있도록 구현

<br/>

#### 3) 반응형

![반응형](https://user-images.githubusercontent.com/100185602/201598920-24be9883-093a-4d99-b650-7af0411d78c2.gif)

- media query 사용

<br/>

#### 4) 관리자 계정

- 관리자 계정을 따로 만들어 uid가 관리자의 uid일 때는 모든 글의 수정/삭제 버튼과 조회수가 나타나도록 구현.
  <br/>
