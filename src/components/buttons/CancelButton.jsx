import { ButtonCancel } from "./ButtonStyled";

const CancelButton = ({children, onClick, type}) => {

  return (
    <div>
      <ButtonCancel onClick={onClick} type={type}>{children}</ButtonCancel>
    </div>
  )
}

export default CancelButton;
