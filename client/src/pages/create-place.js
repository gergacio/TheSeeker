import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreatePlace = () => {
  const userID = useGetUserID();
  const url = 'http://18.135.66.226:8080';
  const [cookies, _] = useCookies(["access_token"]);
  const [place, setPlace] = useState({
    name: "",
    location: "",
    continent: "",
    religion: "",
    bio: "",
    selfIdentity: "",
    quotes: [],
    teacherImg: "",
    locationImg: "",
    whatToVisit: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlace({ ...place, [name]: value });
  };

  const handleQuoteChange = (event, index) => {
    const { value } = event.target;
    const quotes = [...place.quotes];
    quotes[index] = value;
    setPlace({ ...place, quotes });
  };

  const handleAddQuote = () => {
    const quotes = [...place.quotes, ""];
    setPlace({ ...place, quotes });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${url}/teachers`,
        { ...place },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Place Created");
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };

  return (

    <div className="search">
     <h1>Create Place</h1>

      <div className="create-place">
        
 

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Teacher Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={place.name}
          onChange={handleChange}
          required
        />



        <label htmlFor="religion">Religion</label>
        <input
          type="text"
          id="religion"
          name="religion"
          value={place.religion}
          onChange={handleChange}
          required
        />
        <label htmlFor="bio">Known As</label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={place.bio}
          onChange={handleChange}
          required
        />

        <label htmlFor="selfIdentity">Self-Identity</label>
        <input
          type="text"
          id="selfIdentity"
          name="selfIdentity"
          value={place.selfIdentity}
          onChange={handleChange}
          required
        />

        <label htmlFor="quotes">Quotes</label>
        {place.quotes.map((quote, index) => (
          <input
            key={index}
            type="text"
            name="quotes"
            value={quote}
            onChange={(event) => handleQuoteChange(event, index)}
            required
          />
        ))}
        <button type="button" className="create-btn" onClick={handleAddQuote}>
          add quote
        </button>

        <label htmlFor="teacherImg">URL Teacher Image</label>
        <input
          type="text"
          id="teacherImg"
          name="teacherImg"
          value={place.teacherImg}
          onChange={handleChange}
          required
        />
        <label htmlFor="whatToVisit">What to visit</label>
        <input
          type="text"
          id="whatToVisit"
          name="whatToVisit"
          value={place.whatToVisit}
          onChange={handleChange}
          required
        />
        <label htmlFor="locationImg">URL Location Image</label>
        <input
          type="text"
          id="locationImg"
          name="locationImg"
          value={place.locationImg}
          onChange={handleChange}
          required
        />
              <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={place.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="continent">Continent</label>
        <input
          type="text"
          id="continent"
          name="continent"
          value={place.continent}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">Create Place</button>
      </form>
    </div>
    </div>
   

  );
};