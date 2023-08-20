import { ProductsType, getProduct, getProducts } from '@/service/products';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params: { slug } }: Props) {
  return {
    title: `Hello Next.js 13 | ${slug}`,
  };
}

const ProductsSlugPage = async ({ params: { slug } }: Props) => {
  // 현재 경로 데이터를 보내면, 서버(데이터베이스)에 있는 데이터 중 해당 제품의 정보를 찾아서 렌더링
  const product = await getProduct(slug);

  if (!product) notFound();

  return <h2>{product.name} 목록</h2>;
};

export default ProductsSlugPage;

export async function generateStaticParams() {
  // 모든 제품의 페이지들을 미리 만들 수 있게 함(SSG)
  const products: ProductsType[] = await getProducts();
  return products.map((product) => ({ slug: product.id }));
}
