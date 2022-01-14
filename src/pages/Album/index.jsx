import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/index';
import { getUser } from '../../services/userAPI';
import getMusics from '../../services/musicsAPI';
import MusicCard from '../../components/MusicCard/index';
import './index.css';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      albumList: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getUser().then((e) => {
      this.setState({ name: e.name });
    });
    getMusics(id).then((musica) => {
      this.setState({
        img: musica[0].artworkUrl100,
        collectionName: musica[0].collectionName,
        artistName: musica[0].artistName,
        albumList: [...musica],
      });
    });
  }

  render() {
    const { name, img, collectionName, artistName, albumList } = this.state;
    return (
      <div data-testid="page-album">
        <Header usuario={ name } />
        <section className="album-container">
          <section className="album-pai">
            <section className="album">
              <img src={ img } alt="imagem do album" />
              <h1 data-testid="album-name">{ collectionName }</h1>
              <h2 data-testid="artist-name">{ artistName }</h2>
            </section>
            <MusicCard albumList={ albumList } />
          </section>
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
