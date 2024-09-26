import { IconsContainer } from "../header/HeaderStyled" 
import { BiCalendarPlus } from "react-icons/bi";
import { BiCalendarEdit } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { NavbarFooter } from "./FooterStyled";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <NavbarFooter>
        <IconsContainer>
            <Link to='reserve_table_page'><BiCalendarPlus/></Link>
        </IconsContainer>
        <IconsContainer>
            <Link to='/edit_reserve_table_page'><BiCalendarEdit/></Link>
        </IconsContainer>
        <IconsContainer>
            <Link to='contact_page'><BiPhoneCall/></Link>
        </IconsContainer>   
    </NavbarFooter>
  )
}

export default Footer;
