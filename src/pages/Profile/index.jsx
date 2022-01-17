import React, { Component } from 'react';
import Header from '../../components/Header/index';
import { getUser } from '../../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      // loading: true,
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({ /* loading: false, */ name: e.name });
    });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-profile">
        <Header usuario={ name } page="profile" />
      </div>
    );
  }
}
