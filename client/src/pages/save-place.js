import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import axios from "axios";

export const SavedPlace = () => {
  const [savedTeachers, setSavedTeachers] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedTeachers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/teachers/savedTeachers/${userID}`
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
      <h1> Saved places</h1>
    
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
                    <p
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


