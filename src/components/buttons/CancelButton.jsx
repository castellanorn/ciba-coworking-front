import { ButtonCancel } from "./ButtonStyled";

const CancelButton = ({children,onClick}) => {
  return (
    <div>
      <ButtonCancel onClick={onClick}>{children}</ButtonCancel>
    </div>
  )
}

export default CancelButton;
