import { useCallback, useState } from 'react';

function Test(props) {
  const [curr, setCurr] = useState('');

  const onChange = useCallback((e) => {
    console.log(e.target.value);
    setCurr(e.target.value);
  }, []);

  const onClick = () => {
    props.setText(curr);
    //   props.textValue(curr);
  };

  return (
    <>
      <input onChange={onChange} />
      <button onClick={onClick}>버튼</button>
    </>
  );
}

export default Test;
