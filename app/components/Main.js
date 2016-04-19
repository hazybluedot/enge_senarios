import React from 'react';
import { Link } from 'react-router';

import UserSelection from './UserSelection'

const Main = ({children}) => {
    return (
      <div className="main-container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="row">
          <span className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
            <Link to="/">HOME</Link>
          </span>
         <span className="col-sm-7 col-sm-offset-6">
           <UserSelection />
         </span>
      </div>
        </nav>
        <div className="container">
          {children}
        </div>
      </div>
    )
};

export default Main;
