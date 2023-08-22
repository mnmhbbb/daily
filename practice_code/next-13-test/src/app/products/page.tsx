import { ProductsType, getProducts } from '@/service/products';
import Link from 'next/link';

// ISR
// export const revalidate = 3;

const ProductsPage = async () => {
  // 서버(데이터베이스)에 있는 제품 목록을 읽어와서 렌더링
  const products: ProductsType[] = await getProducts();

  // fetch SSR
  const res = await fetch('https://meowfacts.herokuapp.com', {
    // next: {
    //   revalidate: 3,
    // },
    cache: 'no-store',
  });
  const data = await res.json();
  const factText = data.data[0];

  return (
    <>
      <h2 className="mb-2">전체 상품:</h2>
      <ul>
        {products.map(({ id, name }) => (
          <li className="p-2" key={id}>
            <Link href={`/products/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
      <article>{factText}</article>
    </>
  );
};

export default ProductsPage;
