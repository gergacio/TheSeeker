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
    

          <Link to="/">home</Link> 
          <Link to="/search">search</Link>     
        {!cookies.access_token ? (
          <Link to="/auth">login/register</Link>
        ) : (
          <>
              <Link to="/create-place">create place</Link>
              <Link to="/saved-place">saved places</Link>
           
              <button className="nav-btn" onClick={logout}> Logout </button>
          </>
      
        )}
     
    </div>
  );
};