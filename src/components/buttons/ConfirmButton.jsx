 import { ButtonConfirm } from "./ButtonStyled"

const ConfirmButton = ({children, onClick, type}) => {
  return (
    <div>
      <ButtonConfirm onClick={onClick}  type={type}>{children}</ButtonConfirm>
    </div>
  )
}

export default ConfirmButton;
 