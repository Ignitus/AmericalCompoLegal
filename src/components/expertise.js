import React, { useEffect, useState } from 'react';
import axios from 'axios';


export function Expertise() {
    const [lawsuitsData, setLawsuitsData] = useState(null)
    const [page, setPage] = useState(1)
    const [items, setItems] = useState(3)
    const [totalItem, setTotalItem] = useState(null)
    const [lawsuitSection, setLawsuitSection] = useState()

    useEffect(()=>{
        const getapidata = async () => {
          try{
            const datafetch = await axios.get(`https://${process.env.REACT_APP_BACKEND_IP}/active-lawsuits/?page=${page}&items=${items}`);
            console.log(datafetch);
            setLawsuitsData(datafetch.data.lawsuitList);
            setTotalItem(datafetch.data.total_lawsuits)
          }catch(error){  
            console.log(error);
          }
        };
  
        getapidata();
        
      },[page]);
    useEffect(() => {
        const sectionElement = document.getElementById("lawsuitSectionId");
        setLawsuitSection(sectionElement);
    }, [])
    return (
        <div className="Section3" id="lawsuitSectionId">
            <div className="Section3_1">
                <p className="Section3_1_heading1">Our expertise </p>
                <p className="Section3_1_heading2">Active Lawsuits</p>
            </div>
            <div className="Section3_2">
                {lawsuitsData &&
                lawsuitsData.map((item, index) => (
                    <a href={`/active-lawsuit/?name=${item.name}`}>
                        <div className="Section3_2_card">
                            <img src={item.imageLink} alt={item.imageLink} className='imageSize'></img>
                            <div className="Section3_2_info">
                                <p className="Section3_2_heading1">{item.name}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            {totalItem && <div className='pagination'>
                <button onClick={() => {setPage(Math.max(page-1,1)); lawsuitSection.scrollIntoView({ behavior: 'smooth' });}}>PREV</button>
                <p>Page {page} of {Math.ceil(totalItem/items)}</p>
                <button onClick={() => {setPage(Math.min(page+1,Math.ceil(totalItem/items))); lawsuitSection.scrollIntoView({ behavior: 'smooth' });}}>NEXT</button>
            </div>}
        </div>

        
        )}