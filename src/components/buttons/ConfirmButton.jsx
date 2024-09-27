import { ButtonConfirm } from "./ButtonStyled"

const ConfirmButton = ({children,onClick} ) => {
  return (
    <div>
      <ButtonConfirm onClick={onClick}>{children }</ButtonConfirm>
    </div>
  )
}

export default ConfirmButton;
