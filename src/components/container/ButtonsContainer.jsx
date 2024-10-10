import React from "react";
import { ButtonsContainer } from "./ButtonsContainerStyled";

const ContainerButtons = ({ children }) => {
  return (
  <ButtonsContainer>
  {React.Children.map(children, (child) => child)}
  </ButtonsContainer>
  );
  };
  

export default ContainerButtons;