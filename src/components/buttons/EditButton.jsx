import { FaRegEdit } from "react-icons/fa";
import { CircleButton } from "./ButtonStyled";

function EditButton({ onClick }) {
  return (
    <CircleButton color="var(--violet)" onClick={onClick}>
      <FaRegEdit />
    </CircleButton>
  )
}

export default EditButton