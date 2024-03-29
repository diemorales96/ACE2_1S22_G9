import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: var(--bg);
  height: 80px;
  display: flex;
  position: fixed;
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Rectangulo = styled.div`
  height: 350px;
  display: flex;
  border: 4px solid black;
  justify-content: center;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* justify-content: flex-start; */
  border-radius: 25px;

`;
export const RectanguloB = styled.div`
  height: 320px;
  display: flex;
  border: 4px solid black;
  justify-content: center;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* justify-content: flex-start; */
  border-radius: 25px;
  
  
`;

export const Cuadro = styled.div`
display: grid;
width: 190px;
height: 190px;
border: 2px solid var(--bg);
background-color: #fff;
border-radius: 50px;
justify-content: center;
`;


export const CuadroX = styled.div`
display: flex;
width: 550px;
height: 120px;
border: 2px solid var(--bg);
background-color: #fff;
border-radius: 50px;
justify-content: center;
`;
export const Cuadro2 = styled.div`
display: grid;
width: 90px;
height: 50px;
padding: 10px;
border: 4px solid rgb(14, 13, 13);
background: white;  /* fallback for old browsers */
clear: both;
margin-bottom: 0;
border-radius: 10px;
`;




export const Rectangulo2 = styled.nav`
  height: 80px;
  display: flex;
  border: 4px solid black;
  background: #108dc7;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ef8e38, #108dc7);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ef8e38, #108dc7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Cartel = styled.nav`
  height: 20px;
  display: flex;
  border: 2px solid black;
  background: #FFEFBA;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #FFEFBA);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #FFEFBA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const Contenedor = styled.nav`
  height: 430px;
  display: flex;
  border: 4px solid black;
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;


export const Texto = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;