import { useState } from 'react';

const ErrorTest = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('테스트 에러입니다!');
  }

  return (
    <button
      onClick={() => setShouldError(true)}
      className="p-4 bg-red-500 text-white rounded-lg font-bold"
    >
      에러 발생
    </button>
  );
};

export default ErrorTest;
