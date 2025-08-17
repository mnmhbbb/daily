import { useEffect, useState } from "react";
import { fetchUserData } from "../utils/api";

interface UserProfileProps {
  userId: number;
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchUserData(userId);
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("알 수 없는 오류가 발생했습니다."));
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="user-profile">
        <h3>사용자 프로필</h3>
        <div className="profile-info">
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-profile">
        <h3>사용자 프로필</h3>
        <div className="profile-info">
          <p className="error-message">오류: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-profile">
        <h3>사용자 프로필</h3>
        <div className="profile-info">
          <p>사용자 데이터를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h3>사용자 프로필</h3>
      <div className="profile-info">
        <p>
          <strong>ID:</strong> {userData.id}
        </p>
        <p>
          <strong>이름:</strong> {userData.name}
        </p>
        <p>
          <strong>이메일:</strong> {userData.email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
