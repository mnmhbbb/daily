import React, { useState } from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  padding: 0.5rem 1rem;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  padding: 0.5rem;
  text-decoration: none;
  color: #7b7fda;
  font-size: 1.7rem;
  font-weight: 800;
  transition: all 0.1s ease-in;

  &:hover {
    opacity: 0.8;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #67bc98;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : 0)};
    transition: max-height 0.3s ease-in;
  }
`;

const MenuLink = styled.a`
  padding: 1rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  color: #67bc98;
  font-size: 0.9rem;
  transition: all 0.3s ease-in;
  width: 100%;

  &:hover {
    opacity: 0.8;
    color: #7b7fda;
    background: #e6e6e6;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo href="/">HOME</Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Work</MenuLink>
        <MenuLink href="/">About</MenuLink>
        <MenuLink href="/">Careers</MenuLink>
        <MenuLink href="/">Contact</MenuLink>
      </Menu>
    </Nav>
  );
};

export default Navbar;
