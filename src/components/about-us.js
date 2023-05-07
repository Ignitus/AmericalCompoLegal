import axios from "axios";
import { useEffect, useState } from "react";
import "./about-us.css";

export function AboutUs() {
    const [aboutusData, setAboutusData] = useState(null)

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`https://${process.env.REACT_APP_BACKEND_IP}/about-us/`);
            setAboutusData(datafetch.data);
          }catch(error){  
            console.log(error);
          }
        };
  
        getapidata();
        
      },[]);
    return(
        <div>
            {aboutusData &&
                <div className="about-us-outer">
                    <img src={aboutusData.imageLink} alt="American Compo legal"></img>
                    <p>{aboutusData.text}</p>
                </div>
            }
        </div>
    );
}