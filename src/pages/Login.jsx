
import {Container} from "./LoginStyled"
import LoginForm from "../components/form/LoginForm"
import TitleMobile from "../components/title/Title"


const Login = () => {
  
  return (
    <Container>
      <TitleMobile title="Inicia sessió." />
      <LoginForm/>
    </Container>
    
  )
}

export default Login;