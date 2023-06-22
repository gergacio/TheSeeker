import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://3.11.115.183:8081';

export const Search = () => {
  const [teachers, setTeachers] = useState([]);
  const [savedTeachers, setSavedTeachers] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const userID = useGetUserID();



  //--------------------------------------------------------

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/teachers`);
        setTeachers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedTeachers = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/teachers/savedTeachers/ids/${userID}`
        );
        setSavedTeachers(response.data.savedTeachers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
    if(cookies.access_token)  fetchSavedTeachers();
  }, []);

//-----------------------------------------------------------------------------

  const saveTeacher = async (teacherID) => {
    try {
      const response = await axios.put(`${BASE_URL}/teachers`, {
        teacherID,
        userID,
      },
      {headers: {authorization: cookies.access_token}}
      );
      setSavedTeachers(response.data.savedTeachers);
      console.log(response);
    } catch (err) {
      alert("You need permission to perform this action! Please register for new account and login!");
      navigate("/auth");
      console.log(err);
    }
   };

//--------------------------------------------------------------------------------------------

  const isTeacherSaved = (id) => savedTeachers.includes(id);

  return (

    <div className="search">
    
      <ul >
        {teachers.map((teacher) => (
          <li key={teacher._id} className="places">
     
              <h2>{teacher.name}</h2>
     
            
              <div className="example example-cover">
                 <img src={teacher.teacherImg} alt={teacher.name} />
              </div>
              <p>{teacher.bio}</p>
           
              <p className="quote">“{teacher.selfIdentity}”</p>
              <p><button className="button"
                onClick={() => saveTeacher(teacher._id)}
                disabled={isTeacherSaved(teacher._id)}
              >
                {isTeacherSaved(teacher._id) ? "Saved" : "Save"}
              </button></p>  
          </li>
        ))}
      </ul>

    </div>
  );
};