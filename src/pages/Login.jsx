
import { DivReserve } from "../components/calendar/CalendarStyled"
import LoginForm from "../components/form/LoginForm"
import { Span } from "../components/form/LoginFormStyled"

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
    </DivReserve>
    
  )
}

export default Login;