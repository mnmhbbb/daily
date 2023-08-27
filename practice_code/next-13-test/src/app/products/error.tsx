'use client';

import Error from 'next/error';
import { useEffect } from 'react';

type Props = {
  error: Error;
  reset: () => void;
};

const ProductsError = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>에러가 발생했습니다.</h2>
      <button type="button" onClick={() => reset()}>
        다시 시도하기
      </button>
    </div>
  );
};

export default ProductsError;
