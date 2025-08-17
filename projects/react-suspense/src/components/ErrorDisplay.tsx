interface ErrorDisplayProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorDisplay = ({ error, resetErrorBoundary }: ErrorDisplayProps) => {
  return (
    <div className="error-display">
      <h3>오류가 발생했습니다!</h3>
      <p className="error-message">{error.message}</p>
      <button onClick={resetErrorBoundary} className="retry-button">
        다시 시도
      </button>
    </div>
  );
};
