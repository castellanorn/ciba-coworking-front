import { CheckBoxInput } from "./CheckBoxInput";
import RadioInput from "./RadioInput"; 


export function RoleInput({ label, name, selectedOption, onChange, userRole }) {
  return (
    <>
      {userRole === "ADMIN" ? (
        <CheckBoxInput
          label={label}
          name={name}
          checked={selectedOption === label}
          onChange={onChange}
        />
      ) : (
        <RadioInput
          label={label}
          name={name}
          selectedOption={selectedOption}
          onChange={onChange}
        />
      )}
    </>
  );
}
