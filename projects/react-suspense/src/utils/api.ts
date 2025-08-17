// API 호출을 시뮬레이션하는 유틸리티 함수들

// 성공적인 데이터 로딩을 시뮬레이션
export const fetchUserData = (
  userId: number,
): Promise<{ id: number; name: string; email: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `사용자 ${userId}`,
        email: `user${userId}@example.com`,
      });
    }, 5000);
  });
};

// 에러를 발생시키는 API 호출을 시뮬레이션
export const fetchUserDataWithError = (userId: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`사용자 ${userId}의 데이터를 가져오는데 실패했습니다.`));
    }, 5000);
  });
};

// 느린 로딩을 시뮬레이션
export const fetchSlowData = (): Promise<{ message: string; timestamp: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "느린 데이터 로딩 완료!",
        timestamp: new Date().toLocaleString("ko-KR"),
      });
    }, 10000);
  });
};

// 즉시 반환되는 데이터
export const fetchInstantData = (): Promise<{ status: string; data: string[] }> => {
  return Promise.resolve({
    status: "success",
    data: ["즉시 데이터 1", "즉시 데이터 2", "즉시 데이터 3"],
  });
};
