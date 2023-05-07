import React, { useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

export function Header() {

    const navbar = {
        background: "#FFFFFF",
        padding: "0"
      };

    const navbar_subtitle={
        justifyContent: "center",
        margin: "0px 50px"
    }

    const navbar_subtitle_fonts = {
        fontFamily: 'revert',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: "18px",
        lineHeight: "31px",
        alignItems: "center",
        color: "#0F2B61",
        background: "white",
        border: '0'
    }

  const imgSize = {
    width: "auto",
    height: "100px",
    paddingLeft: "1rem"
  }

  const navbar_button = {
    marginRight: '1rem',
  }

  const [section, setSection] = useState(null);

  useEffect(() => {
    const sectionElement = document.getElementById("footerId");
    setSection(sectionElement);
  }, []);

  function scrollToSection() {
    section.scrollIntoView({ behavior: 'smooth' });
  }

  const [lawsuitsData, setLawsuitsData] = useState(null)

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`https://${process.env.REACT_APP_BACKEND_IP}/active-lawsuits/all`);
            console.log(datafetch)
            setLawsuitsData(datafetch.data.lawsuitList);
          }catch(error){  
            console.log(error);
          }
        };
  
        getapidata();
        
      },[]);

      const [width, setWidth] = useState(window.innerWidth);

      const currentScreenWidth = () =>{
          setWidth(window.innerWidth);
      }

      useEffect(()=>{
          window.addEventListener("resize",currentScreenWidth);
      });

    return (
        <Navbar style={navbar} expand="lg">
            <div className="navbar_title">
              <img src="https://americancompo.s3.ap-south-1.amazonaws.com/american-compo-logo-final.png" width="100%" style={imgSize}></img>
              <div className='navbar_title_all_font'>
                {(width>768) && <h5 className="navbar_title_font1" id='logText'>American</h5>}
                {(width>768) && <h5 className="navbar_title_font2" id='logText'>Compo Legal</h5>}

                {/* {(width>768) && <h5 className="navbar_title_font1" id='logText'>American</h5>}
                {(width>768) && <h5 className="navbar_title_font2" id='logText'>Compo Legal</h5>} */}
              </div>
            </div>
                {/* <Navbar.Brand style={navbar_title}><h5>American Compo Legal</h5></Navbar.Brand> */}

            <Navbar.Toggle aria-controls="basic-navbar-nav" style={navbar_button}/>
            <Navbar.Collapse id="basic-navbar-nav" style={navbar_subtitle}>
              <Nav className={width>1049 ? "dropbtn sizeOfNavbar" : "dropbtn"}>
              {/* <Nav className="dropbtn sizeOfNavbar"> */}
                <Nav.Link style={navbar_subtitle_fonts} href="/">Home</Nav.Link>
                <Nav.Link style={navbar_subtitle_fonts} href="/about-us">About Us</Nav.Link>
                <Dropdown className='dropdownbtn'>
                  <Dropdown.Toggle style={navbar_subtitle_fonts} variant="success" id="dropdown-basic">
                  Active Lawsuits
                  </Dropdown.Toggle>
                  {lawsuitsData && 
                  <Dropdown.Menu>
                    {lawsuitsData.map((item, index) => (
                        <Dropdown.Item className='dropdownbtntext' href={"/active-lawsuit/?name="+item} key={index} value={item}>{item}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>}
                </Dropdown>  
                <Nav.Link style={navbar_subtitle_fonts} href="#contactUsId">Feedback</Nav.Link>            
              </Nav>
            </Navbar.Collapse>

            {(width>991) && 
              <div className="navbar_title_last" onClick={scrollToSection}>
                <h5 className="navbar_title_last_font">Call Now</h5>
              </div>}
        </Navbar>
      );
}
