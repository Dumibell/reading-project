


## **1. 사이트 링크**
https://dumibell.github.io/reading-project/#/

<br/>



## **2. 프로젝트 소개**

### ✨매일 책 읽는 습관을 기르기 위한 프로젝트입니다✨<br/>
친구들과 독서모임을 하던 중, 독후감 작성만을 위한 웹페이지가 있으면 좋겠다는 생각에 시작하게 되었습니다.<br/>
- 블로그 형태로 글을 작성할 수 있으며, 그동안 작성한 글을 모아서 볼 수 있습니다.<br/>
- 좋아요 기능을 추가하여 내가 좋아요를 누른 글들만 따로 모아서 볼 수도 있습니다.<br/>
- 작성한 글의 개수에 따라 인증 뱃지를 다르게 주어 독후감을 많이 쓸수록 등급이 올라가는 형태의 기능을 만들어보았습니다. <br/>
- 검색창에 책 제목이나 내용을 검색해 원하는 게시글만 볼 수도 있습니다.

<br/>


## **3. 개발 인원 및 기간**

- 개발기간 : 2022/10/31 ~ 2022/11/12
- 개발 인원

  - 프론트엔드(1명): 조예지
  - 백엔드(1명): 조예지

<br/>


## **4. 적용 기술**

#### Front-End
<img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/TailwindCss-14263D?style=for-the-badge&logo=TailwindCss&logoColor=white"/>

#### Back-End
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
<br/>


## **5. 구현 기능**
### 1. 로그인/회원가입 기능
 - 모달창으로 구현
 - Firebase의 Authentication을 이용.
 - 
#### 1) 로그인
 - 로그인을 하지 않아도 메인 화면과 남들이 작성한 글을 볼 수 있지만, 글을 작성하거나 좋아요를 누르는 기능은 로그인을 한 사용자만 이용할 수 있도록 구현.
 - Firebase에서 제공하는 기능을 통해 구글로그인, 또는 이메일주소와 패스워드로 로그인이 가능함.
 - 입력한 메일주소/비밀번호가 없거나 일치하지 않을 경우 alert("일치하는 회원정보가 없습니다")

#### 2) 회원가입
  - 정규식을 이용해 유효성 검사 진행
  - 회원가입시 이름도 같이 입력해 updateProfile() 메서드를 이용해 displayName이 바로 업데이트되도록 구현.


### 2. 메인 페이지
#### 1) Nav바
  - 로그인을 안했을 경우엔 Login, 로그인을 했을 경우엔 myPage로 보이도록 구현
#### 2) 게시글
  - 최신순 클릭시 createdAt으로 OrderBy
  - 인기순 클릭시 like로 OrderBy
  - card 컴포넌트에 보여지는 내용을 담고 map함수를 이용해 메인화면에서 요약된 게시글을 볼 수 있도록 구현
#### 3) 좋아요
  - 좋아요를 누른 사용자의 uid가 배열에 담기도록 구현.
  - 이미 좋아요 배열에 사용자의 uid가 포함되어 있는 게시글(이미 내가 해당 게시물에 좋아요를 누른 경우)은 한번 더 클릭시 좋아요가 취소되도록 구현.
### 3. 글 작성
⬇️ 글 작성시 저장되는 db구조
```js
await addDoc(collection(dbService, "writings"), {
        title: title,
        text: text,
        createdAt: Date.now(),
        createdDate: `${date.getFullYear()}.${
          date.getMonth() + 1
        }.${date.getDate()}`,
        like: 0,
        whoLikesIt: [],
        uid: userObj.uid,
        attachmentURL,
        name: userObj.displayName,
      });
```
 - 
### 4. 검색 창
### 5. 마이페이지
#### 1) 프로필
#### 2) 내가 작성한 글
#### 3) 좋아요 한 글


## **Reference**

- 이 프로젝트는 
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
