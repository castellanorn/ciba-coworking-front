import { RadioGroup, RadioLabel } from "./InputStyled";

function RadioInput({ label, name, selectedOption, onChange }) {
  const isSelected = selectedOption === name;
  return (
    <RadioGroup>
      <RadioLabel>
        <input
          type="radio"
          name={name}
          value={name}
          checked={isSelected}
          onChange={onChange}
        />
        <span className="custom-radio" />
        {label}
      </RadioLabel>
    </RadioGroup>
  );
}

export default RadioInput;