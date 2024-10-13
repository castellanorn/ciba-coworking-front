import { BiPhoneCall } from "react-icons/bi";
import { TbWorldWww } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import cibaPhoto from "../../assets/ciba-photo.png";
import TitleMobile from "../../components/title/Title";
import {
  Container,
  DivLogo,
  ImgLogo,
  InfoContainer,
  IconContainer,
  Text,
} from "./ContactStyled";

const Contact = () => {
  return (
    <>
      <TitleMobile title="Contacte" />
      <DivLogo>
        <ImgLogo src={cibaPhoto} alt="img" />
      </DivLogo>
      <Container>
        <InfoContainer>
          <IconContainer>
            <BiPhoneCall />
          </IconContainer>
          <Text>93 462 40 00</Text>
        </InfoContainer>
        <InfoContainer>
          <IconContainer>
            <TfiEmail />
          </IconContainer>
          <Text>
            lacibacoworking@gramenet.cat, coworkinlaciba@grameimpuls.cat
          </Text>
        </InfoContainer>
        <InfoContainer>
          <IconContainer>
            <TbWorldWww />
          </IconContainer>
          <Text>https://laciba.gramenet.cat</Text>
        </InfoContainer>
        <InfoContainer>
          <IconContainer>
            <ImLocation />
          </IconContainer>
          <Text>Ps. de LLorenç Serra, 64 08921 Santa Coloma de Gramanet</Text>
        </InfoContainer>
      </Container>
    </>
  );
};

export default Contact;
