import { ProductsType, getProducts } from '@/service/products';
import Link from 'next/link';

const ProductsPage = async () => {
  // 서버(데이터베이스)에 있는 제품 목록을 읽어와서 렌더링
  const products: ProductsType[] = await getProducts();

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
    </>
  );
};

export default ProductsPage;
