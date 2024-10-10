import { Line, TitlePage } from "./TitleStyled";

const TitleMobile = ({ title }) => {
  return (
    <>
      <TitlePage>{title}</TitlePage>
      <Line />
    </>
  );
};

export default TitleMobile;
