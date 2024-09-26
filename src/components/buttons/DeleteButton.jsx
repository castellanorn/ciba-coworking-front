import { FaRegTrashAlt } from "react-icons/fa";
import { CircleButton } from "./ButtonStyled";

function DeleteButton() {
  return (
    <CircleButton color="var(--salmon)">
      <FaRegTrashAlt />
    </CircleButton>
  )
}

export default DeleteButton