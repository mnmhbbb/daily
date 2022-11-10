2022.09.15.Thu.

export 기능 만들기

1. html -> canvas -> image -> pdf

   - (1)(html → canvas → image) → (2)pdf

   - `html2canvas` → `jspdf`
   - [https://velog.io/@jkiten/React-html-to-PDF](https://velog.io/@jkiten/React-html-to-PDF)

2. react-pdf

   - 라는 라이브러리를 사용하여 각각의 요소들을 직접 구현
   - 사례: https://ufo.stealien.com/2022-06-30/pdf-with-react
   - 이 방법을 사용하면 간단하게 pdf로 생성되는 것 같은데, 현재 적용된 모든 스타일을 다시 만들어야 하고 특히 그래프를 다시 만드는 것이 꽤 많은 시간이 소요될 듯
   - 현재 적용된 디테일한 css를 모두 반영하기엔 적합하지 않고, 정말 간단한 보고서용으로 좋을 듯

3. 1번 방법으로 구현

   - `yarn add html2canvas jspdf`
   - ```javascscript
     const input = document.getElementById('divToPrint');
       html2canvas(input)
         .then((canvas) => {
           let imgWidth = 208;
           let imgHeight = canvas.height * imgWidth / canvas.width;
           const imgData = canvas.toDataURL('img/png');
           const pdf = new jsPDF('p', 'mm', 'a4');
           pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
           // pdf.output('dataurlnewwindow');
           pdf.save("download.pdf");
         })
       ;
     ```

4. non null assertion !

   - dom 선언을 하여 사용했을 때 null 관련 type 에러가 떠서 다음 솔루션 참조: https://www.inflearn.com/questions/533756
   - ```jsx
     'HTMLElement | null' 형식의 인수는 'HTMLElement' 형식의 매개 변수에 할당될 수 없습니다.
     'null' 형식은 'HTMLElement' 형식에 할당할 수 없습니다.ts(2345)
     ```

   - non null assertion !을 끝에 붙여서 해결.
     > ts는 dom을 몰라서 분명히 존재하는 태그도 null일 가능성을 염두에 두고 있습니다. 이럴때는 어쩔 수 없이 non null assertion을 해야 합니다.
   - 접미에 붙는 느낌표(!) 연산자인 단언 연산자는 해당 피연산자가 null, undeifned가 아니라고 단언해 줌

   - 공식 설명:
     [https://github.com/typescript-eslint/typescript-eslint/blob/v2.34.0/packages/eslint-plugin/docs/rules/no-non-null-assertion.md](https://github.com/typescript-eslint/typescript-eslint/blob/v2.34.0/packages/eslint-plugin/docs/rules/no-non-null-assertion.md)
   - 그 방법도 안될 경우 다음 방법을 참조

   - [https://velog.io/@leemin/TS-TypeScript-HTMLElement](https://velog.io/@leemin/TS-TypeScript-HTMLElement)

   - `as HTMLElement` 를 끝에 붙여주기

5. safari 정규표현식 에러

   - SyntaxError: Invalid regular expression: invalid group specifier name
   - 천자리 콤마 정규표현식 중에 사파리 브라우저에서는 호환되지 않는 표현식이 있었다.
   - [https://dantechblog.gatsbyjs.io/posts/til-regex/](https://dantechblog.gatsbyjs.io/posts/til-regex/)
   - 정확히는 lookbehind 문법
