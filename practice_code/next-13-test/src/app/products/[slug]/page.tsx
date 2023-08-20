import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

const ProductsSlugPage = ({ params }: Props) => {
  if (params.slug === 'nothing') {
    notFound();
  }
  return <h2>{params.slug} 목록</h2>;
};

export default ProductsSlugPage;

export function generateStaticParams() {
  const products = ['pants', 'skirt'];
  return products.map((product) => ({ slug: product }));
}
