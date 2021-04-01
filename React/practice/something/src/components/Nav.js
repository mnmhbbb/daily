import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';
import styled from 'styled-components';

const NavBar = styled.div`
  position: stiky;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: rgb(20, 21, 23);
  color: rgba(255, 255, 255, 0.95);
  padding: 10px;

  a {
    display: inline-block;
    text-decoration: none;
    color: inherit;
    margin-right: 10px;
    padding: 10px;
  }
`;

const Nav = () => {
  const isLoggedIn = useSelector((state) => state.reducer.isLoggedIn);
  console.log(isLoggedIn);

  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <NavBar>
      <div>
        <Link to="/">홈</Link>
        <Link to="/bookmark">북마크</Link>
      </div>
      {isLoggedIn ? (
        <Link to="/" onClick={onClick}>
          로그아웃
        </Link>
      ) : (
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
      )}
    </NavBar>
  );
};

export default Nav;
