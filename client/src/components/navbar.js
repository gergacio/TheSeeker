import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();


  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar" id="navId">
    

          <Link to="/">Home</Link> 
          <Link to="/search">Search</Link>     
        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <>
              <Link to="/create-place">Create Place</Link>
              <Link to="/saved-place">Saved Places</Link>
           
              <button className="button" onClick={logout}> Logout </button>
          </>
      
        )}
     
    </div>
  );
};