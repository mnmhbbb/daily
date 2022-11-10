2022.10.24.Mon.

기능 구현 설계, 컴포넌트 설계 후 큰 틀부터 적용하였다.

작업하면서 남길만한 내용 정리

- next/image 이전에 메모했었는데 다시 정리함
  - width & height 또는 layout으로 이미지의 규격을 설정해야 하는데,
  - width & height으로 속성을 적용하면 반응형으로 주기가 까다롭다.
  - 따라서 `layout={fill}` 속성을 준 다음, styled-components로 다음과 같이 사이즈를 적용해서 반응형으로 적용할 수 있었다.
    ```javascript
    // <Image /> 를 포함하는 div 태그
      & * {
      width: 20px !important;
      height: 20px !important;
      position: static !important;
      margin: 0 auto !important;
    }
    ```
