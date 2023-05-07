import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

export function Earplugs() {
    const [firstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMessage] = useState("")
    const [submitted, setSubmitted] = useState(false);

    const contactUsSubmit = (event) => {
        event.preventDefault();
        try {
            axios.get(`https://${process.env.REACT_APP_BACKEND_IP}/contact-us/?fname=${encodeURIComponent(firstName)}&lname=${encodeURIComponent(LastName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}`)
            setSubmitted(true);
            document.getElementById('fname').value = "";
            document.getElementById('lname').value = "";
            document.getElementById('email').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('message').value = "";
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
            setTimeout(() => {
                setSubmitted(false);
            }, 1000);
        }catch {

        }
    }
    const [lawsuitData, setLawsuitData] = useState(null)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const lawsuitName = queryParams.get("name");

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`http://${process.env.REACT_APP_BACKEND_IP}/active-lawsuits/?name=${lawsuitName}`);
            console.log(datafetch)
            setLawsuitData(datafetch.data);
          }catch(error){  
            console.log(error);
          }
        };
        console.log("here")
        getapidata();
        
      },[]);

    return (
        <div className="Section6">
             {/* <div className="Section6_1">
                 <img className="Section6_image" src="https://cdn-hdhdh.nitrocdn.com/brDqSduChqozhmwwLPDxuyQijTMcKXHo/assets/images/optimized/rev-0cd1d8d/wp-content/uploads/2021/02/paraquat-lawsuit-e1612202811159.jpeg" alt=""></img>
                 <p className="Section6_heading">Paraquat</p>
             </div>
             <div className="d-flex gap-4">
                 <div className="Section6_2">
                     <div className="Section6_2_1">
                         <h3 className="Section6_heading1">Paraquat Lawsuit</h3>
                         <p className="Section6_heading2">Numerous studies have linked Paraquat, a commercial weed killer, to Parkinson’s disease. Parkinson’s disease is an incurable neurological disease that kills nerve cells in the brain, leading to impaired brain function and movement.</p>

                         <p className="Section6_heading2">Victims claim the manufacturers of Paraquat failed to warn the public about the dangers of using the product. If you or someone you love developed Parkinson’s disease from using Paraquat, you can file a lawsuit that will compensate you for lost wages and medical bills. </p>

                         <p className="Section6_heading2">Filing a claim against Paraquat’s manufacturer could also encourage other manufacturers in the herbicide industry to test their products thoroughly before selling them.</p>

                         <p className="Section6_heading2">The Guardian Legal Network can help you find a qualified legal professional who can help you take legal action and guide you through the legal process.</p>
                     </div>
                   
                 </div>
              </div>    */}
              {lawsuitData && 
                <div className="Section6_1">
                    <img className="Section6_image" src={lawsuitData.imageLink} alt={lawsuitData.imageLink}></img>
                    <p className="Section6_heading">{lawsuitData.name}</p>
                </div>}



            <div className="Section4 d-flex">
                {lawsuitData &&
                <div className="Section6_3">
                    <h3 className="Section6_heading1_1">{lawsuitData.heading}</h3>
                    <p className="Section6_heading2_1">{lawsuitData.text}</p>
                </div>}

                <div className="Section4_2">
                    <p className="Section4_2_heding1">Make Your Voice Heard</p>
                    {submitted && <p id="submit-success-id">Successfully Submitted!</p>}
                    <form className="Auth-form" onSubmit={contactUsSubmit}>
                        <div className='Section4_2_inputbox d-flex'>
                            <input className="Section4_2_input" type="text" id="fname" name="fname" placeholder='First Name' onChange={(event) => setFirstName(event.target.value)}/>
                            <input className="Section4_2_input" type="text" id="lname" name="lname" placeholder='Last Name'onChange={(event) => setLastName(event.target.value)}/>
                            <input className="Section4_2_input" type="text" id="email" name="email" placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
                            <input className="Section4_2_input" type="text" id="phone" name="phone" placeholder='Phone' onChange={(event) => setPhone(event.target.value)}/>
                            <textarea className="Section4_2_input messbox" type="text" id="message" name="message" placeholder='Type Your Message Here' onChange={(event) => setMessage(event.target.value)}/>
                        </div>
                        <button className="Section4_2_form_button" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )}
