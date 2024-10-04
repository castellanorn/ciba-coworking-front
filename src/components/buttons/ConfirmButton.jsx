 import { ButtonConfirm } from "./ButtonStyled"

const ConfirmButton = ({children, onClick, type = "button"}) => {
  return (
    <div>
      <ButtonConfirm onClick={onClick}  type={type}>{children}</ButtonConfirm>
    </div>
  )
}

export default ConfirmButton;
 