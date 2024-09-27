import { BiUser } from 'react-icons/bi'
import { ContainerUser } from '../header/HeaderStyled'
import { Link } from 'react-router-dom'

const User = () => {
  return (
    <ContainerUser>
        <Link to="/inici-sessio"><BiUser/></Link>
    </ContainerUser>
  )
}

export default User
