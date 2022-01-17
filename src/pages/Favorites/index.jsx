import React, { Component } from 'react';
import Header from '../../components/Header/index';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/index';
import MusicCard from '../../components/MusicCard/index';
import './index.css';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({ name: e.name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header usuario={ name } page="favorites" />
        <div className="favoritas-container">
          <h1>Músicas favoritas:</h1>
          <div className="favoritas">
            <MusicCard />
            {loading && <Loading /> }
          </div>
        </div>
      </div>
    );
  }
}
