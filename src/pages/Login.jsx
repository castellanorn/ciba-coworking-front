import CancelButton from "../components/buttons/CancelButton"
import ConfirmButton from "../components/buttons/ConfirmButton"
import { DivReserve } from "../components/calendar/CalendarStyled"
import LoginForm from "../components/form/LoginForm"
import { ButtonsContainer, Span } from "../components/form/LoginFormStyled"
import TitleMobile from "../components/title/Title"

const Login = () => {
  
  return (
    <DivReserve>
      <TitleMobile title="Inicia sessió." />
      <Span/>
      <LoginForm
      labelEmail="Email"
      labelPassword="Contrasenya"
      />

      <ButtonsContainer>
        <ConfirmButton>Iniciar sessió</ConfirmButton>
        <CancelButton>Cancel·lar</CancelButton>
      </ButtonsContainer>
    </DivReserve>
  )
}

export default Login;