import {StyledInput } from "../form/LoginFormStyled"
import { Label } from "./styled/InputStyled"

const Input = ({type,label,placeholder}) => {
  return (
    <div>
      <Label htmlFor="">{label}</Label>
      <StyledInput type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input
