const Test = ({ children }: any) => {
  return (
    <>
      <h1>Test 컴포넌트입니다</h1>
      <p>그리고 여기부터는 children</p>
      {children}
    </>
  );
};

export default Test;
