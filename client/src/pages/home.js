import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [savedTeachers, setSavedTeachers] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const userID = useGetUserID();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/teachers");
        setTeachers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedTeachers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/teachers/savedTeachers/ids/${userID}`
        );
        setSavedTeachers(response.data.savedTeachers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
    if(cookies.access_token)  fetchSavedTeachers();
  }, []);

  const savedTeacher = async (teacherID) => {
    try {
      const response = await axios.put("http://localhost:3001/teachers", {
        teacherID,
        userID,
      },
      {headers: {authorization: cookies.access_token}}
      );
      setSavedTeachers(response.data.savedTeacher);
    } catch (err) {
      alert("You need permission to perform this action! Please register for new account and login!");
      navigate("/auth");
      console.log(err);
    }
  };

  const isTeacherSaved = (id) => savedTeachers.includes(id);


  return (
    <div className="home" id="home">
  
    
      <ul >
        {teachers.map((teacher) => (
          <li key={teacher._id} className="recipes">
     
              <h2>{teacher.name}</h2>
              <div className="example example-cover">
                 <img src={teacher.image} alt={teacher.name} />
              </div>
              <p>{teacher.place}</p>
          
           
            {/* <p><button className="save-btn"
                onClick={() => savedTeacher(teacher._id)}
                disabled={isTeacherSaved(teacher._id)}
              >
                {isTeacherSaved(teacher._id) ? "Saved" : "Save"}
              </button></p> */}
          </li>
        ))}
      </ul>

    </div>
  );
};