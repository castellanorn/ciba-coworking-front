import { FaRegEdit } from "react-icons/fa";
import { CircleButton } from "./ButtonStyled";

function EditButton() {
  return (
    <CircleButton color="var(--violet)">
      <FaRegEdit />
    </CircleButton>
  )
}

export default EditButton