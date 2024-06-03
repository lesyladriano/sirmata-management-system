import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const StateContext = createContext({
 currentUser: null,
 token: null,
 isAdmin: null,
 setUser: () => {},
 setToken: () => {},
 setIsAdmin: () => {},
});

export const ContextProvider = ({ children }) => {
 const [user, setUser] = useState({});
 const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
 const [isAdmin, setIsAdmin] = useState({});
 const setToken = (token) => {
  _setToken(token);
  if (token) {
   localStorage.setItem("ACCESS_TOKEN", token);
  } else {
   localStorage.removeItem("ACCESS_TOKEN");
  }
 };

 return (
  <StateContext.Provider
   value={{
    user,
    setUser,
    token,
    setToken,
    isAdmin,
    setIsAdmin,
   }}
  >
   {children}
  </StateContext.Provider>
 );
};

// Prop validation for children prop
ContextProvider.propTypes = {
 children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
