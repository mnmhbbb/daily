2022.09.02.Fri.

Fluid Typography(반응형 폰트사이즈) 적용

- https://chriskirknielsen.com/blog/modern-fluid-typography-with-clamp/
- https://ryanfeigenbaum.com/fluid-typography/

- 위 사이트를 참조하여 Fluid Typography를 적용하기 위한 유틸 함수를 생성함
- css에서 제공하는 clamp 함수를 사용
- minVw ~ maxVw 사이의 viewport width에서 minValue ~ maxValue size로 적용됨
- 원하는 최소 size, 최대 사이즈, 최소 width, 최대 width를 넘기면 width가 변할 때마다 계산된 font-size가 반영됨
- minValue or maxValue에 0을 넘기면 각 비율 곱하여 적용함
- 편의상 px 단위로 전달하면 되며, 리턴할 때 rem 단위로 계산하여 변환함
- 유저 페이지에서는 max-width: 500px; 를 적용한 레이아웃이므로
- 501px ~ 1920px 사이의 width에서는 font-size가 변동될 필요가 없다고 생각되어
- 320px ~ 500px 사이에서만 변화하도록 함(기본값에 적용함)

- 위 기능을 생성해주는 웹 사이트가 이미 다수 존재했음
  - https://www.fluid-type-scale.com/
  - https://utopia.fyi/type/calculator/
  - https://royalfig.github.io/fluid-typography-calculator/
