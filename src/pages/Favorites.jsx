import React, { Component } from 'react';
import Header from '../components/Header/index';
import { getUser } from '../services/userAPI';

export default class Favorites extends Component {
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
      <div data-testid="page-favorites">
        <Header usuario={ name } page="favorites" />
      </div>
    );
  }
}
