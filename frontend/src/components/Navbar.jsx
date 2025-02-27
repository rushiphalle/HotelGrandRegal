import {useMediaQuery} from 'react-responsive';
import {useLocation, useNavigate} from 'react-router-dom';
import breapkoint from '../modules/breakpoints';
import style from './Navbar.module.css'
import hotelLogo from '/files/logos/hotelLogo.png';
import homeLogo from '/files/logos/home.png';
import dineLogo from '/files/logos/dine.png';
import hallLogo from '/files/logos/hall.png';
import roomLogo from '/files/logos/room.png';
import contactLogo from '/files/logos/contact.png';
import menuLogo from '/files/logos/menu.png';
import { useEffect, useState } from 'react';


function MenuOption(props){
    return (
        <ul className = {`${style.sidebar} ${props.visible ? style.visible : style.hidden}`}>
            <li>
                <a href=""><img src={hotelLogo} alt="" /> About Us</a>
            </li>
            <li>
                <a href=""><img src={hotelLogo} alt="" /> Blogs</a>
            </li>
            <li>
                <a href=""><img src={hotelLogo} alt="" /> Feedback</a>
            </li>
            <li>
                <a href=""><img src={hotelLogo} alt="" /> Follow Us</a>
            </li>
        </ul>
    );
}


function NavOptions(){
    const isMobile = useMediaQuery({
        query : `(max-width : ${breapkoint.mobile}px)`
    });
    const isTablet = useMediaQuery({
        query : `(max-width : ${breapkoint.tablet}px)`
    });

    const crntBtn = (path)=>{
        switch(path){
            case '/':
                return '1';
            case '/Dine':
                return '2';
            case '/Rooms':
                return '3';
            case '/Banquet-hall':
                return '4';
            case '/Contact-us':
                return '5';
            return '0';
        }
    }; 

    const navigate = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState(crntBtn(location.pathname));
    const clickBtn = (e, path, btn)=>{
        e.preventDefault();
        navigate(path);
    };
    useEffect(()=>{
        setSelected(crntBtn(location.pathname));
    }, [location.pathname]);

    const mobileView =  <ul id={style.mNavOptions}>
                            <li id=  {selected == '3' ? style.selectedM : ""}>
                                <a href="/Rooms" onClick={()=>{clickBtn(event, '/Rooms', '3')}}>
                                    <img src={roomLogo} alt="" />
                                    <h6>Rooms</h6>
                                </a>
                            </li>
                            <li id=  {selected == '4' ? style.selectedM : ""}>
                                <a href="/Banquet-hall" onClick={()=>{clickBtn(event, '/Banquet-hall', '4')}}>
                                    <img src={hallLogo} alt="" />
                                    <h6>Banquote</h6>
                                </a>
                            </li>
                            <li id=  {selected == '1' ? style.selectedM : ""}>
                                <a href="/" onClick={()=>{clickBtn(event, '/', '1')}}>
                                    <img src={homeLogo} alt="" />
                                    <h6>Home</h6>
                                </a>
                            </li>
                            <li id=  {selected == '2' ? style.selectedM : ""}> 
                                <a href="/Dine" onClick={()=>{clickBtn(event, '/Dine', '2')}}>
                                    <img src={dineLogo} alt="" />
                                    <h6>Dine</h6>
                                </a>
                            </li>
                            <li id=  {selected == '5' ? style.selectedM : ""}>
                                <a href="/Contact-us" onClick={()=>{clickBtn(event, '/Contact-us', '5')}}>
                                    <img src={contactLogo} alt="" />
                                    <h6>Contact</h6>
                                </a>
                            </li>
                        </ul>;

    const desktopView =  <ul id={isTablet ? style.tNavOptions : style.dNavOptions}>
                            <a href="/" onClick={()=>{clickBtn(event, '/', '1')}}><li onClick={()=>{clickBtn('/', '1')}} id=  {selected == '1' ? style.selected : ""}>Home</li></a>
                            <a href="/Dine" onClick={()=>{clickBtn(event, '/Dine', '2')}}><li onClick={()=>{clickBtn('/Dine', '2')}} id=  {selected == '2' ? style.selected : ""}>Dine</li></a>
                            <a href="/Rooms" onClick={()=>{clickBtn(event, '/Rooms', '3')}}><li onClick={()=>{clickBtn('/Rooms', '3')}} id=  {selected == '3' ? style.selected : ""}>Rooms</li></a>
                            <a href="/Banquet-hall" onClick={()=>{clickBtn(event, '/Banquet-hall', '4')}}><li onClick={()=>{clickBtn('/Banquet-hall', '4')}} id=  {selected == '4' ? style.selected : ""}>Banquote Hall</li></a>
                            <a href="/Contact-us" onClick={()=>{clickBtn(event, '/Contact-us', '5')}}><li onClick={()=>{clickBtn('/Contact-us', '5')}} id=  {selected == '5' ? style.selected : ""}>Contact Us</li></a>
                        </ul>;

    return isMobile ? mobileView : desktopView;
}

export default function Navbar(){
    const [toggleOn, setToggle] = useState(false);
    return (
        <nav id={style.navbar}>
            <img id={style.brandLogo} src={hotelLogo} alt= "Hotel Logo"/>
            <h4 id = {style.brandName}>Grand Regal</h4>
            <span id = {style.menuBtn}>
                <NavOptions />
                <img onClick={()=>{setToggle(!toggleOn)}} src={menuLogo} />
                <MenuOption visible = {toggleOn}/>
            </span>
        </nav>
    );
}