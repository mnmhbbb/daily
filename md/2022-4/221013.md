2022.10.13.Thu.

(사이드) jQuery와 sessionStorage를 사용하여 상황에 맞는 게시글 양식 자동 채우기

- [상황] 특정 댓글의 신고 버튼을 클릭할 경우, 해당 댓글의 유저 이름과 댓글 내용을 sessionStorage에 담아야 함
- jQuery에서 제공하는 메서드들을 활용하여 간단하게 오브젝트를 만들고 string 객체로 변환하여 sessionStorage에 저장

```javascript
$(document).on('click', '.report', function () {
  const nickname = $(this).parent().prev().find('.name').text(); // 닉네임
  const content = $(this).parent().prev().find('.contents').text(); // 내용
  const obj = {
    nickname,
    content,
  };
  sessionStorage.setItem('report', JSON.stringify(obj)); // sessionStorage에 저장
  window.location.href = '/?pn=mypage.form'; // 페이지 이동
});
```

- 게시글 작성 페이지로 넘어와서, 최초 렌더링이 끝난 후 sessionStorage에 저장된 값이 있는지 체크하여 글 양식을 자동 채움

```javascript
$(function () {
  const reportComment = JSON.parse(sessionStorage.getItem(JSON.parse('"report"')));

  // 댓글 신고 양식
  if (reportComment) {
    const url = document.referrer; // 이전 페이지 url
    const content = `[게시글URL]\n${url}\n\n작성자: ${reportComment.nickname}\n내용: ${reportComment.content}\n\n[신고사유]\n`;
    $('input[name=_title]').val('댓글신고');
    $('input[name=_title]').text('댓글신고');
    $('textarea[name=_content]').text(content);
    $('textarea[name=_content]').val(content);
  }
});
```
