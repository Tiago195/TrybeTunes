import React, { Component } from 'react';
import Header from '../../components/Header/index';
import { getUser } from '../../services/userAPI';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from '../../components/Loading/index';
import MusicCard from '../../components/MusicCard/index';

export default class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
      albumList: JSON.parse(localStorage.getItem('favorite_songs')),
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({ name: e.name, loading: false });
    });
    getFavoriteSongs().then((e) => {
      this.setState({ albumList: e, loading: false });
    });
  }

  render() {
    const { name, loading, albumList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header usuario={ name } page="favorites" />
        <div>
          <MusicCard albumList={ albumList } />
          {loading && <Loading /> }
        </div>
      </div>
    );
  }
}
