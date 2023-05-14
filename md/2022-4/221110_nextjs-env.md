2022.11.10.Thu.

#### Next.js env 세팅하기

테스트용으로 환경변수를 세팅하기 위해 `next.config.js`에 다음 코드를 추가함

```javascript
env: {
    STAGE: process.env.STAGE,
},
```

참조: https://medium.com/@qsx314/2-next-js-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-env-483e14958752
