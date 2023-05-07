import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export function Contact() {
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

    return (
        <div className="Section4 d-flex">
            <div className="Section4_1">
                <p className="Section4_1_heading1">Request a Free Case Review</p>
                <p className="Section4_1_heading2">No Cost, No Obligation</p>
                <p className="Section4_1_heading3">or If You have a Referral</p>
                <p className="Section4_1_heading4">Our Core Values</p>
                <p className="Section4_1_heading5"> 
                    Transparency and integrity are part of our core values, 
                    and we strive to present unbiased, fact-checked data to the public. 
                    We understand that navigating legal matters is no easy task and 
                    so we are committed to helping you take legal action by finding the 
                    right law firm for your case. Our network of highly qualified law 
                    firms has a successful track record of handling cases similar to yours.
                </p>
            </div>
            <div className="Section4_2" id="contactUsId">
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
        )}