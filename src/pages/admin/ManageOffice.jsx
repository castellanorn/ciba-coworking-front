import { Line } from '../../components/title/TitleStyled'
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"
import TitleMobile from '../../components/title/Title'
const ManageOffice = () => {
  return (
    <div>
      <TitleMobile title="Edició de reserves" />
      <ContainerButtons>
            <PlacesButton
                text="Taules individuals"
                link="/gestio-de-taules"
                focus={false}
            />
            <PlacesButton
                text="Oficines privades"
                focus={true}
            />
            <PlacesButton
                text="Sala de reunions"
                link="/gestio-reunio"
                focus={false}
            />
        </ContainerButtons>        
        <Line />
    </div>
  )
}

export default ManageOffice
