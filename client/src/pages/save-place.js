import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import axios from "axios";

const BASE_URL = 'http://3.11.115.183:8081';

export const SavedPlace = () => {
  const [savedTeachers, setSavedTeachers] = useState([]);
  const userID = useGetUserID();


  useEffect(() => {
    const fetchSavedTeachers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/teachers/savedTeachers/${userID}`
        );
        setSavedTeachers(response.data.savedTeachers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedTeachers();
  }, []);
  return (
    <div className="search">
      <h1> Saved Places</h1>
    
      <ul>
        {savedTeachers.map((teacher) => (
          <li className="places" key={teacher._id}>
     
            <h2>{teacher.name}</h2>    
            <p>{teacher.whatToVisit}</p>
            <p>{teacher.location}</p>   
            <div className="example example-cover">
                 <img src={teacher.locationImg} alt={teacher.location} />
            </div>
            <p>Wisdom Quotes</p>
            {teacher.quotes.map((quote, index) => {
                  return (
                    <p className="quote"
                      key={index}
                    >“{quote}”</p>
                  );
                })}
         

           
          </li>
        ))}
      </ul>
    
    </div>
  );
};


