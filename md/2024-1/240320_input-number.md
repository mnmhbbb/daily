2024.03.20.Wed.

### 인증번호 input 개선하기

회사 모바일 서비스 중 하나가 로그인 이후 인증번호 입력이 필수인데, 일반 키보드로 입력받고 있어서 개선하고자 함.

1. `inputmode="numeric"` 추가하여 숫자 키보드로 노출. type은 text로 유지
   - 참조:
     - 영국 정부에서는 다음과 같이 전환하기로 했다고 함
     - `<input type="number">` to `<input type="text" inputmode="numeric" pattern="[0-9]*">`
       [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)
2. ~~더 강력하게 `pattern="[0-9]*"` 추가~~
   - 6자리만 입력 가능하게 `pattern="\d{6}"` 로 제한하는 것이 더 좋을 듯.
3. 인증번호 문자가 도착하면 자동으로 입력되도록 사용자 경험 개선
   - `autocomplete="one-time-code"`
     [HTML autocomplete 특성 - HTML: Hypertext Markup Language | MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete#one-time-code)
   - 그러나 도착하는 문자 내용의 형식에 따라 자동입력이 되는 경우와 안되는 경우가 있다고 함.
     [[ IOS ] 핸드폰 문자 인증번호 자동완성 시키기 ( Autofill ) + 자동완성 가능한 문자형태](https://im-designloper.tistory.com/59)
4. 최종적으로, 다음과 같이 적용하면 좋을 것 같다.

   ```tsx
   <input
     type="text"
     autocomplete="one-time-code"
     inputmode="numeric"
     maxlength="6"
     pattern="\d{6}"
   >
   ```
