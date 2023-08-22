'use client';

import { useEffect, useState } from 'react';

const MeowArticle = () => {
  const [text, setText] = useState('데이터 준비 중...');

  useEffect(() => {
    fetch('https://meowfacts.herokuapp.com')
      .then((res) => res.json())
      .then((data) => setText(data.data[0]));
  }, []);

  return <article>{text}</article>;
};

export default MeowArticle;
