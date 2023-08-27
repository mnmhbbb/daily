import MeowArticle from '@/components/MeowArticle';
import { ProductsType, getProducts } from '@/service/products';
import Image from 'next/image';
import Link from 'next/link';

// ISR
// export const revalidate = 3;

const ProductsPage = async () => {
  // 에러 페이지 테스트
  // throw new Error();

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
      <Image
        src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
        alt="clothes"
        width="400"
        height="400"
      />

      <MeowArticle />
    </>
  );
};

export default ProductsPage;
