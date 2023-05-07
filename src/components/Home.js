import React from 'react';
import { useHistory } from 'react-router-dom';
import './about.css'
import './expertise.css'
import './contact.css'
import {About} from './about';
import {Expertise} from './expertise';
import {Contact} from './contact';
import { useEffect, useState } from 'react';
import axios from "axios";

 
export function Home() {
    const [caseData, setCaseData] = useState(null)

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`https://${process.env.REACT_APP_BACKEND_IP}/cases/`);
            setCaseData(datafetch.data.caseList);
          }catch(error){  
            console.log(error);
          }
        };
  
        getapidata();
        
      },[]);

    return (
        <div>
        <div className="Section1 d-flex">
            <div className="Section1_info">
                <p className="Section1_Heading1"  >Have you ever suffered from an injury?</p>
                <p className="Section1_Heading2"  >You Deserve To Be Compensated</p>
                <p className="Section1_Heading3"  >No Cost, No Obligation</p>
                <p className="Section1_Heading4"  >Call (915) 444-6999 to get a free consultation.</p>
            </div>
            <div className="Section1_form">
                <p className='Section1_form_heading1'>Suffered from an injury?</p>
                <p className='Section1_form_heading2'>Make Your Voice Heard</p>
                {/* <select className='Section1_form_input' name="cars" id="cars">
                    <option value="None" selected="true" disabled>Select a Case Type</option>
                    <option value="zantac">Zantac</option>
                    <option value="paraquat">Paraquat</option>
                    <option value="nec">NEC</option>
                    <option value="camplejeune">Camp Lejeune</option>
                    <option value="hairrelaxer">Hair Relaxer</option>
                    <option value="talcum">Talcum</option>
                </select> */}
                {/* dynamic code for the above */}
                {caseData &&
                <select className='Section1_form_input' name="cars" id="cars">
                    <option value="None" selected="true" disabled>Select a Case Type</option>
                    {caseData.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>}
                <button className='Section1_form_button fontSizeForButton' onClick={(e) => {
                e.preventDefault();
                console.log(document.getElementById("cars").value)
                window.location.href='/active-lawsuit/?name='+document.getElementById("cars").value;
                }}>Get Tour free consultation</button>
                <p className='Section1_form_heading3'>Privacy Policy | Terms Of Use</p>
            </div>


        </div>
        <About>
        </About>
        <Expertise></Expertise>
        <Contact></Contact>
        </div>
        
      );

      
}
