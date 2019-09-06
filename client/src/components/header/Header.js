import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = ({ state: { state, setUserFromLocal, logout } }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const localUser = localStorage.getItem('username');

    if (state.isAuthenticated) {
      setLogin(true);
    } else if (localUser) {
      setLogin(true);
      setUser(localUser);
      setUserFromLocal(localUser);
      // setUserFromRedisCache(localUser);
    }
  }, [state, setUserFromLocal]);

  const logoutUser = () => {
    localStorage.removeItem('username');
    setUser('');
    setLogin(false);
    logout();
  };

  // const username = localStorage.getItem('username');

  return (
    // <header>
    <Navbar expand="lg" className="container-fullwidth bg-light">
      <Link className="navbar-brand ml-3" to="/">
        Betmelon
      </Link>

      <Nav className="mx-auto justify-content-center ">
        <Link className="nav-link" to={`/bets/${state.user.sheet_id}`}>
          My Bets
        </Link>
        <div className="nav-link">|</div>
        <Link className="nav-link" to={`/statistics/${state.user.sheet_id}`}>
          Statistics
        </Link>
        <div className="nav-link">|</div>
        <Link
          className="nav-link"
          to="/predictions/all"
          onClick={() => {
            if (window.location.href.match('predictions/all*')) {
              window.location.reload();
            }
          }}
        >
          Predictions
        </Link>
        <div className="nav-link">|</div>
        <Link className="nav-link" to="/halloffame">
          Hall Of Fame
        </Link>
        <div className="nav-link">|</div>
        <Link className="nav-link" to={`/users/profile/${state.user.username}`}>
          Profile
        </Link>
      </Nav>
      <Navbar.Toggle />
      {state.isAuthenticated ? (
        <Navbar.Collapse className="flex-grow-0 mr-3">
          <Navbar.Text>
            Signed in as:{' '}
            <Link to={`/users/profile/${state.user.username}`}>
              {state.user.username}
            </Link>{' '}
            |{' '}
            <Link to="/login" onClick={() => logoutUser()}>
              Logout
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Link to="/login">Login</Link> |{' '}
            <Link to="/register">Register</Link>
          </Navbar.Text>
        </Navbar.Collapse>
      )}
    </Navbar>
    //   <div className="navigation">
    //     <ul className="navigation--list">
    //       <li className="navigation--list--item-1">
    //         <Link to="/">Home</Link>
    //       </li>
    //       <li className="navigation--list--item-1">
    //         <Link to={`/bets/${state.user.sheet_id}`}>Betsheets</Link>
    //       </li>
    //       <li className="navigation--list--item-2">
    //         <Link to="/predictions/all">Predictions</Link>
    //       </li>
    //     </ul>
    //   </div>
    //   {!login ? (
    //     <div className="header-wrapper">
    //       <ul>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/register">Register</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   ) : (
    //     <>
    //       <div>
    //         Uga Booga, {state.user.username}!{' '}
    //         <Link to={`/users/profile/${state.user.username}`}>Profile</Link>
    //         <Link to="/login" onClick={() => logoutUser()}>
    //           Logout
    //         </Link>
    //       </div>
    //     </>
    //   )}
    // </header>
  );
};

export default Header;
