import React, { Component } from 'react';
import Header from '../components/Header/index';
import Loading from '../components/Loading/index';
import { getUser } from '../services/userAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({ loading: false, name: e.name });
    });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header usuario={ name } />
        {loading ? <Loading /> : (
          <h1 data-testid="header-user-name">
            Seja bem vindo
            {name}
          </h1>
        )}
      </div>
    );
  }
}
