import { BiPhoneCall } from "react-icons/bi";
import { TbWorldWww } from "react-icons/tb";
import { ImLocation } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import cibaPhoto from '../../assets/ciba-photo.png';
import TitleMobile from "../../components/title/Title";
import { DivLogo, ImgLogo, InfoContainer, Space } from "./ContactStyled";

const Contact = () => {
  return (
    <>
      <TitleMobile title="Contacte" />
      <DivLogo>
        <ImgLogo src={cibaPhoto} alt="img" />
      </DivLogo>
        <InfoContainer>
          <BiPhoneCall />
          <span>93 462 40 00</span>
        </InfoContainer>
        <InfoContainer>
        <TfiEmail />
          <span>
            lacibacoworking@gramenet.cat, coworkinlaciba@grameimpuls.cat
          </span>
        </InfoContainer>
        <InfoContainer>
          <TbWorldWww />
          <span>https://laciba.gramenet.cat</span>
        </InfoContainer>
        <InfoContainer>
          <ImLocation />
          <span>Ps. de LLorenç Serra, 64 08921 Santa Coloma de Gramanet</span>
        </InfoContainer>
        <Space></Space>
    </>
  );
};

export default Contact;
