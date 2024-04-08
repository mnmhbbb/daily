type Props = {
  params: { slug: string };
};

const TestLayoutPage = ({ params }: Props) => {
  return <h2>현재 경로: /test/{params.slug}</h2>;
};

export default TestLayoutPage;
