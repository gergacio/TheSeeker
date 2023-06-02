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
      <h1> saved places</h1>
    
      <ul>
        {savedTeachers.map((teacher) => (
          <li className="places" key={teacher._id}>
            <div>
              <h2>{teacher.name}</h2>       
            </div>
            <p>{teacher.place}</p>
           
          </li>
        ))}
      </ul>
    
    </div>
  );
};


