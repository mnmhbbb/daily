import { useEffect, useState } from "react";
import { fetchSlowData } from "../utils/api";

interface SlowData {
  message: string;
  timestamp: string;
}

const SlowDataComponent = () => {
  const [slowData, setSlowData] = useState<SlowData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadSlowData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSlowData();
        setSlowData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setLoading(false);
      }
    };

    loadSlowData();
  }, []);

  if (loading) {
    return (
      <div className="slow-data">
        <h3>느린 데이터 컴포넌트</h3>
        <div className="data-info">
          <p>10초 동안 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="slow-data">
        <h3>느린 데이터 컴포넌트</h3>
        <div className="data-info">
          <p className="error-message">오류: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!slowData) {
    return (
      <div className="slow-data">
        <h3>느린 데이터 컴포넌트</h3>
        <div className="data-info">
          <p>데이터를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="slow-data">
      <h3>느린 데이터 컴포넌트</h3>
      <div className="data-info">
        <p>
          <strong>메시지:</strong> {slowData.message}
        </p>
        <p>
          <strong>타임스탬프:</strong> {slowData.timestamp}
        </p>
      </div>
    </div>
  );
};

export default SlowDataComponent;
