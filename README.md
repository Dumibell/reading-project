


## **1. 사이트 링크**
https://dumibell.github.io/reading-project/#/

<br/>



## **2. 프로젝트 소개**

매일 책 읽는 습관을 기르기 위한 프로젝트입니다.<br/>
친구들과 독서모임을 하던 중, 독후감 작성만을 위한 웹페이지가 있으면 좋겠다는 생각에 시작하게 되었습니다.<br/><br/>
블로그 형태로 글을 작성할 수 있으며, 그동안 작성한 글을 모아서 볼 수 있습니다.<br/>
좋아요 기능을 추가하여 내가 좋아요를 누른 글들만 따로 모아서 볼 수도 있습니다.<br/>
또한, 작성한 글의 개수에 따라 인증 뱃지를 다르게 주어 독후감을 많이 쓸수록 등급이 올라가는 형태의 기능을 만들어보았습니다. <br/>
검색창에 책 제목이나 내용을 검색해 원하는 게시글만 볼 수도 있습니다.

<br/>


## **3. 개발 인원 및 기간**

- 개발기간 : 2022/10/31 ~ 2022/11/12
- 개발 인원

  - 프론트엔드(1명): 조예지
  - 백엔드(1명): 조예지

<br/>


## **3. 적용 기술 및 구현 기능**

### **적용 기술**

- Front-End : HTML, Javascript , React , React Router, TailwindCss
- Back-End: Firebase

### **구현 기능**
#### 1. 검색창 구현
![Jul-23-2022 16-54-06](https://user-images.githubusercontent.com/100185602/189517838-9c3e8938-061b-4ed2-9669-8eb5b5eaa9bf.gif)

1) 검색 기능
 - input창이 onFocus일 때 모달창이 열리도록 구현.
 - 검색창에 입력한 값을 state에 저장
2) 날짜 선택: 캘린더 라이브러리를 이용해 구현
- 검색창 UI에 맞게 style값 조정
- 시작날짜와 끝날짜를 배열의 형태로 state에 저장
3) 인원수 선택
- 어른과 아이의 인원수를 각각 조정할 수 있도록 하고, 총 인원수를 state에 저장.
<br/><br/>

#### 2. querystring을 활용한 필터링 기능 구현
![Jul-24-2022 15-24-17](https://user-images.githubusercontent.com/100185602/189518368-8ad82413-053b-4578-9bcc-d5b4547192c5.gif)

- 숙소 카테고리, 가격, 호텔 등급, 호텔 내부시설 등을 선택할 수 있는 부분을 각각 구현 -> state에 저장
- 백엔드에서 넘겨준 end point를 query string으로 연결
<br/><br/>

### 프로젝트 회고록 주소
https://velog.io/@dumibell/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-myfaketrip


## **Reference**

- 이 프로젝트는 [마이리얼트립](https://www.myrealtrip.com/) 사이트를 참조하여 학습 목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
