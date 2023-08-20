import Link from 'next/link';

const productCategory = ['Woman', 'Man'];

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <nav className="flex gap-5 items-center border-[1px] border-indigo-400 px-5">
        <h2>
          <Link href="/products">Products</Link>
        </h2>
        <div className="w-full">
          <ul className="flex">
            {productCategory.map((category) => (
              <li className="px-5 py-3" key={category}>
                <Link href={`/products/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <section className="p-5">{children}</section>
    </div>
  );
};

export default ProductsLayout;
