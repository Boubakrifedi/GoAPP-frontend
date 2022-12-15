import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [users, setUsers] = useState([])
  const [user, setuser] = useState([])
  const handlechange = (e) => {
    setUsers(usersData)
    setuser(users.filter(user => user.pseudo.startsWith(e)));
    if (e === ''){
      setuser([])
    }
  }
    const handleprofile = ()=>{
    window.location= user[0]._id
    if (user[0]._id === userData._id){
      window.location='/profil'
    }
  }
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>GoApp</h3>
            </div>
          </NavLink>
        </div>
        <form id="form" role="search">
          <input onChange={e => handlechange(e.target.value)} type="search" id="query" name="q"
            placeholder="Search..."
            aria-label="Search through site content" />
        </form>
        {user.length !== 0 && <div className="searching-container">
          <li>
            <p>{user[0].pseudo}</p>
            <img onClick={handleprofile} src={user[0].picture} alt="icon" />
          </li>
        </div>}
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue {userData.pseudo} </h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
