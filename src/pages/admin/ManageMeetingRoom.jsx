import { Line } from '../../components/title/TitleStyled'
import ContainerButtons from '../../components/container/ButtonsContainer'
import PlacesButton from "../../components/buttons/PlacesButton"
import TitleMobile from '../../components/title/Title'

const ManageMeetingRoom = () => {
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
                link="/gestio-oficina"
                focus={false}
            />
            <PlacesButton
                text="Sala de reunions"
                focus={true}
            />
        </ContainerButtons>
        <Line />
      
    </div>
  )
}

export default ManageMeetingRoom
