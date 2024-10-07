import { RadioGroup, RadioLabel } from "./InputStyled";

export function CheckBoxInput({ label, name, checked, onChange }) {
  return (
    <RadioGroup>
      <RadioLabel>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <span className="custom-radio" />
        {label}
      </RadioLabel>
    </RadioGroup>
  );
}