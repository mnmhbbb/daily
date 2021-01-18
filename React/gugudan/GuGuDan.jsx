const React = require("react");
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(value + " 정답!");
      setValue("");
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      inputRef.current.focus();
    } else {
      setResult("땡! 다시 입력하세요");
      setValue("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        {first}곱하기{second}
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          type="number"
          value={value}
          onChange={onChangeInput}
          ref={inputRef}
        />
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
