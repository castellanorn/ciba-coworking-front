import { RadioGroup, RadioLabel } from '../inputs/styled/InputStyled';

function RadioInput({ label, name, selectedOption, onChange }) {
  const isSelected = selectedOption === label;
    return (
      <>
      <RadioGroup>
        <RadioLabel selected={isSelected}>
          <input
            type="radio"
            name={name}
            value={label}
            checked={isSelected}
            onChange={onChange}
          />
          <span className="custom-radio" />
          {label}
        </RadioLabel>
      </RadioGroup>
      </>
    );
  }


export default RadioInput;