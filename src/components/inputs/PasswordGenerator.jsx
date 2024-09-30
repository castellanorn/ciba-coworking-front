import { useState } from "react";
import { PasswordContainer, PasswordRow, ButtonPassword, PasswordDisplay , LabelPassword} from "./styled/PasswordGeneratorStyled";


const generatePassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

const PasswordGenerator = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState("");

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);

    onPasswordGenerated(newPassword);
  };

  return (
    <PasswordContainer>
      <LabelPassword>Contrasenya</LabelPassword>
      <PasswordRow>
        <ButtonPassword onClick={handleGeneratePassword}>
          Generar contrasenya
        </ButtonPassword>
        {password && <PasswordDisplay>{password}</PasswordDisplay>}
      </PasswordRow>
    </PasswordContainer>
  );
};

export default PasswordGenerator;
