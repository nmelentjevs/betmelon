import React, { Component } from 'react';

import axios from 'axios';

export class UserProvider extends Component {
  state = {
    isAuthenticated: false,
    user: {}
  };
  authenticate = user => {
    this.setState({
      isAuthenticated: true,
      user
    });
  };
  setSheetId = id => {
    this.setState({ ...this.state, user: { sheet_id: id } });
  };

  setUserFromLocal = username => {
    axios
      .post('/api/users/localuser', { username })
      .then(res => {
        this.setState({ isAuthenticated: true, user: res.data.user });
      })
      .catch(err => console.log(err));
  };

  // setUserFromRedisCache = username => {
  //   let user;
  //   axios
  //     .get('/api/users/current')
  //     .then(res => {
  //       this.setState({ isAuthenticated: true, user: res.data });
  //       user = res.data;
  //     })
  //     .catch(err => console.log(err));
  //   console.log(user);
  //   return user;
  // };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      user: {}
    });
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          state: this.state,
          authenticate: this.authenticate,
          setSheetId: this.setSheetId,
          setUserFromLocal: this.setUserFromLocal,
          logout: this.logout
          // setUserFromRedisCache: this.setUserFromRedisCache
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const UserContext = React.createContext();
