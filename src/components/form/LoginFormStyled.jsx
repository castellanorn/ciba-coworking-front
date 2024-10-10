import styled from "styled-components";
import { RiEyeCloseLine} from "react-icons/ri";
import {IoEyeOutline} from "react-icons/io5";

export const Form = styled.form`
  width: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
  margin-bottom: 20px;
`;
export const InputWrapper = styled.div`
  position: relative;
  margin: 1.2rem 0;
`;
export const EyeIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 2.2rem;
  cursor: pointer;
  color: var(--violet);
`;

export const StyledRiEyeCloseLine = styled(RiEyeCloseLine)`
  width: 30px;
  height: 30px;
`;

export const StyledIoEyeOutline = styled(IoEyeOutline)`
  width: 30px;
  height: 30px;
`;
