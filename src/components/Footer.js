import React from "react";
import { NavLink} from "react-router-dom";
import moment from "moment"
import ScrollToTop from "react-scroll-to-top";


const Footer = () => {
  
  return (
    <footer>
      <div className="footer-container">
        <div className="logo">
          <NavLink to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>GoApp</h3>
            </div>
          </NavLink>
        </div>
        <div className="rights">
        <p> GoApp © {moment(Date.now()).format("MMM Do YYYY")}</p>
        <p> All rights reserved</p>
        </div>
        <div>
        <ScrollToTop smooth />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
