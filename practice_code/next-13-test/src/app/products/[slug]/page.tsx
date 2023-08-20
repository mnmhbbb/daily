import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

const ProductsLayoutPage = ({ params }: Props) => {
  if (params.slug === 'nothing') {
    notFound();
  }
  return <h2>지금 경로는 /products/{params.slug}입니다!</h2>;
};

export default ProductsLayoutPage;

export function generateStaticParams() {
  const products = ['pants', 'skirt'];
  return products.map((product) => ({ slug: product }));
}
