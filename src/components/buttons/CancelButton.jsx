import { ButtonCancel } from "./ButtonStyled";

const CancelButton = ({children}) => {
  return (
    <div>
      <ButtonCancel>{children}</ButtonCancel>
    </div>
  )
}

export default CancelButton;
