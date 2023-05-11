2022.09.19.Mon.

export 기능 이어서 작업

- html2canvas가 아닌 htmltoimage 라는 라이브러리를 도입
  - [https://velog.io/@alexjlee/Dev-Log-html-to-image-DOM-요소를-이미지로-저장하기](https://velog.io/@alexjlee/Dev-Log-html-to-image-DOM-%EC%9A%94%EC%86%8C%EB%A5%BC-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
  - [https://betterprogramming.pub/heres-why-i-m-replacing-html2canvas-with-html-to-image-in-our-react-app-d8da0b85eadf](https://betterprogramming.pub/heres-why-i-m-replacing-html2canvas-with-html-to-image-in-our-react-app-d8da0b85eadf)
- html2canvas보다 용량도 작음.

```javascript
const exportPdf = async () => {
    setExportLoading(true);
    const pageElements = document.querySelectorAll(".page");
    const pdf = new jsPdf("l"); // 가로 방향 설정

    // html-to-image
    for (let i = 0; i < pageElements.length; i++) {
      await toPng(pageElements[i] as HTMLElement).then((dataUrl) => {
        let imgWidth = pdf.internal.pageSize.getWidth();
        let imgHeight = pdf.internal.pageSize.getHeight();

        // 다음 페이지 추가
        if (i > 0) {
          pdf.addPage();
        }
        pdf.setPage(i + 1); // 다음 페이지로 포커싱
        const imgData = dataUrl; // 현재 엘리먼트를 이미지로 변환
        consolelog("imgData", imgData);
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", "FAST"); // 변환된 이미지를 현재 페이지에 추가

        // 모든 페이지를 생성하면 최종적으로 pdf 저장
        if (i + 1 === pageElements.length) {
          // TODO: 파일명 조정 필요 ex: 회사명+데이터날짜
          pdf.save("download.pdf");
          setExportLoading(false);
        }
      });
    }
  };

```
