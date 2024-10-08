import { FaRegTrashAlt } from "react-icons/fa";
import { CircleButton } from "./ButtonStyled";

function DeleteButton({ onClick }) {
  return (
    <CircleButton color="var(--salmon)">
      <FaRegTrashAlt onClick={onClick} />
    </CircleButton>
  )
}
export default DeleteButton;