import { IconButton, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReplyIcon from '@material-ui/icons/Reply';

const TextFieldStyle = styled(TextField)`
  width: 265px;
`;

const PostForm = () => {
  const [title, setTitle] = useState('');
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>아무 말을 남겨보세요.</h1>
        <TextFieldStyle
          id="standard-multiline-flexible"
          label="무슨 일이 일어나고 있나요?"
          multiline
          rowsMax={4}
          value={title}
          onChange={onChange}
        />
        <IconButton aria-label="submit">
          <ReplyIcon fontSize="medium" />
        </IconButton>
      </form>
    </div>
  );
};

export default PostForm;
