import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputStyle = styled(Input)`
  margin-right: 10px;
`;

const Search = () => {
  const [title, setTitle] = useState('');
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <h1>영화 제목을 입력하세요.</h1>
        <InputStyle
          defaultValue="Hello world"
          inputProps={{ 'aria-label': 'description' }}
          required
          value={title}
          onChange={onChange}
        />
        <Button variant="contained">찾기</Button>
      </form>
    </Container>
  );
};

export default Search;
