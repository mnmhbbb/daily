import { useEffect, useState } from "react";
import { fetchInstantData } from "../utils/api";

interface InstantData {
  status: string;
  data: string[];
}

const InstantDataComponent = () => {
  const [instantData, setInstantData] = useState<InstantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadInstantData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchInstantData();
        setInstantData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setLoading(false);
      }
    };

    loadInstantData();
  }, []);

  if (loading) {
    return (
      <div className="instant-data">
        <h3>즉시 데이터 컴포넌트</h3>
        <div className="data-info">
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="instant-data">
        <h3>즉시 데이터 컴포넌트</h3>
        <div className="data-info">
          <p className="error-message">오류: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!instantData) {
    return (
      <div className="instant-data">
        <h3>즉시 데이터 컴포넌트</h3>
        <div className="data-info">
          <p>데이터를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="instant-data">
      <h3>즉시 데이터 컴포넌트</h3>
      <div className="data-info">
        <p>
          <strong>상태:</strong> {instantData.status}
        </p>
        <p>
          <strong>데이터:</strong>
        </p>
        <ul>
          {instantData.data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InstantDataComponent;
