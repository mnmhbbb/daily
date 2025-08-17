import { useEffect, useState } from "react";
import { fetchUserDataWithError } from "../utils/api";

interface UserProfileWithErrorProps {
  userId: number;
}

const UserProfileWithError = ({ userId }: UserProfileWithErrorProps) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUserDataWithError = async () => {
      try {
        await fetchUserDataWithError(userId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      }
    };

    loadUserDataWithError();
  }, [userId]);

  // 에러가 발생하면 ErrorBoundary가 처리하도록 에러를 던집니다
  if (error) {
    throw error;
  }

  return <></>;
};

export default UserProfileWithError;
