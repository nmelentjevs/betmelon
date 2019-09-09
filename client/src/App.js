import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// import { TagCloud } from 'react-tagcloud';

import { UserContext, UserProvider } from './userContext';

import Header from './components/header/Header';
import MainContent from './components/main-content/MainContent';
import LoginPage from './components/auth/LoginPage';
import Thanks from './components/thanks/Thanks';
// import randomColor from 'randomcolor';

import Container from 'react-bootstrap/Container';

// import { UserProvider } from './UserContext';

import Bets from './components/bets/Bets';
import Dashboard from './components/dashboard/Dashboard';
import Predictions from './components/predictions/Predictions';
import RegisterPage from './components/auth/RegisterPage';
import HallOfFame from './components/hall-of-fame/HallOfFame';
import UserStatistics from './components/statistics/UserStatistics';

// const data = [
//   { value: 'Predictions', count: 25 },
//   { value: 'Ligue 1', count: 25 },
//   { value: 'Seria A', count: 25 },
//   { value: 'Bundesliga', count: 25 },
//   { value: 'La Liga', count: 25 },
//   { value: 'Premier league', count: 25 },
//   { value: 'Champions League', count: 25 },
//   { value: 'Europa League', count: 25 },
//   { value: 'National', count: 25 }
// ];

// const options = {
//   luminosity: 'light',
//   hue: 'red'
// };

// const customRenderer = (tag, size, color) => (
//   <span
//     key={tag.value}
//     style={{
//       animation: 'blinker 4s linear infinite',
//       animationDelay: `${Math.random() * 2}s`,
//       fontSize: `${size}em`,
//       margin: '5px',
//       padding: '3px',
//       display: 'inline-block',
//       background: `${randomColor({
//         luminosity: 'dark',
//         hue: 'red'
//       })}`,
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       fontFamily: 'Montserrat, sans-serif'
//     }}
//   >
//     {tag.value}
//   </span>
// );

class Main extends Component {
  render() {
    return this.props.children;
  }
}

/*
TODO:
Implement redis for login caching or local storage if everything goes wrong
Fix Google Sheets Credentials
Docker/kubernetes
Buy Domain
Deploy on AWS
*/

const PrivateRoute = ({ component: Component, state, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { isAuthenticated } = state.state;
      const user = localStorage.getItem('username');
      return isAuthenticated || user ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      );
    }}
  />
);

const PrivateRouteLogged = ({ component: Component, state, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { isAuthenticated } = state.state;
      const user = localStorage.getItem('username');
      return !isAuthenticated && !user ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      );
    }}
  />
);

function App() {
  return (
    <Router>
      <UserProvider>
        <UserContext.Consumer>
          {(state, setUserFromLocal, setUserFromRedisCache, logout) => (
            <>
              <Header state={state} />
              <Container>
                <Main user={state}>
                  <div className="main-wrapper">
                    <Route
                      exact
                      path="/"
                      component={() => <MainContent state={state} />}
                    />
                    <PrivateRoute
                      state={state}
                      path="/predictions/:filter"
                      component={Predictions}
                    />
                    <PrivateRoute
                      state={state}
                      path="/statistics/:filter"
                      component={UserStatistics}
                    />
                    <PrivateRoute
                      state={state}
                      path="/halloffame"
                      component={HallOfFame}
                    />
                    <PrivateRoute
                      path="/bets/:username"
                      state={state}
                      component={props => (
                        <Bets
                          state={state}
                          setUserFromLocal={setUserFromLocal}
                          // setUserFromRedisCache={setUserFromRedisCache}
                          logout={logout}
                          {...props}
                        />
                      )}
                    />
                    <PrivateRoute
                      state={state}
                      path="/users/profile/:id"
                      component={Dashboard}
                    />
                    <PrivateRouteLogged
                      state={state}
                      path="/login"
                      component={LoginPage}
                    />
                    <PrivateRouteLogged
                      state={state}
                      path="/register"
                      component={RegisterPage}
                    />
                    <Route path="/email/confirm/:id" component={Thanks} />
                    {/* <div className="welcome-wrapper">
    <TagCloud
    tags={data}
    minSize={1}
    maxSize={2}
    colorOptions={options}
    renderer={customRenderer}
    />
  </div> */}
                  </div>
                </Main>
              </Container>
            </>
          )}
        </UserContext.Consumer>
      </UserProvider>
    </Router>
  );
}

export default App;
