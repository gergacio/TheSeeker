import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateTeacher = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [teacher, setTeacher] = useState({
    name: "",
    place: "",
    // quotes: [],
    image: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTeacher({ ...teacher, [name]: value });
  };

  // const handleQuoteChange = (event, index) => {
  //   const { value } = event.target;
  //   const quotes = [...teacher.quotes];
  //   quotes[index] = value;
  //   setTeacher({ ...teacher, quotes });
  // };

  // const handleAddQuote = () => {
  //   const quotes = [...teacher.quotes, ""];
  //   setTeacher({ ...teacher, quotes });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3002/teachers",
        { ...teacher },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Teacher Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Teacher</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={teacher.name}
          onChange={handleChange}
          required
        />

      <label htmlFor="place">place</label>
        <textarea
          id="place"
          name="place"
          value={teacher.place}
          onChange={handleChange}
          required
        ></textarea>

        {/* <label htmlFor="quotes">quotes</label>
        {teacher.quotes.map((quote, index) => (
          <input
            key={index}
            type="text"
            name="quotes"
            className="ingredients"
            value={quote}
            onChange={(event) => handleQuoteChange(event, index)}
            required
          />
        ))}
        <button type="button" className="create-btn" onClick={handleAddQuote}>
          add quote
        </button> */}

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          name="image"
          value={teacher.image}
          onChange={handleChange}
          required
        />

        <button className="create-btn" type="submit">create teacher</button>
      </form>
    </div>
  );
};