import Link from 'next/link';

const products = ['shirt', 'pants', 'skirts', 'shoes'];

const ProductsPage = () => {
  return (
    <>
      <h2 className="mb-2">전체 상품:</h2>
      <ul>
        {products.map((product) => (
          <li className="p-2" key={product}>
            <Link href={`/products/${product}`}>{product}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
