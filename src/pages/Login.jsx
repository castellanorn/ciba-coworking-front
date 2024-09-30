import CancelButton from "../components/buttons/CancelButton"
import ConfirmButton from "../components/buttons/ConfirmButton"
import { DivReserve } from "../components/calendar/CalendarStyled"
import LoginForm from "../components/form/LoginForm"
import { ButtonsContainer, Span } from "../components/form/LoginFormStyled"
import TableMobile from "../components/table/TableMobile"
import TitleMobile from "../components/title/Title"

const reservasFuturasData = [
  { id: '001', data: '2024-10-05', franja: 'Matí', espai: 'Sala 1' },
  { id: '002', data: '2024-10-06', franja: 'Tarda', espai: 'Sala 2' },
];

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
        <ConfirmButton>Acceptar</ConfirmButton>
        <CancelButton>Cancel·lar</CancelButton>
      </ButtonsContainer>
      <TableMobile data={reservasFuturasData} type="reserves" actions={['delete']} />
    </DivReserve>
    
  )
}

export default Login;