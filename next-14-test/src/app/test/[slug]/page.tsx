type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props) {
  const { slug } = params;
  return {
    title: `Hello Next.js 14 | ${slug}`,
  };
}

const TestLayoutPage = ({ params }: Props) => {
  return <h2>현재 경로: /test/{params.slug}</h2>;
};

export default TestLayoutPage;

export function generateStaticParams() {
  const test = ['winter', 'karina'];
  return test.map((t) => ({ slug: t }));
}
