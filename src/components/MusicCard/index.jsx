import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/index';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.handleFavoto = this.handleFavoto.bind(this);

    this.state = {
      loadind: false,
    };
  }

  handleFavoto() {
    this.setState({ loadind: true });

    addSong().then(() => {
      this.setState({
        loadind: false,
      });
    });
    // console.log(addSong());
  }

  render() {
    const { albumList } = this.props;
    const { loadind } = this.state;
    return (
      <div className="musicas-container">
        <ul>
          {albumList.filter((e) => e.kind === 'song').map((e) => (
            <li className="lis" key={ e.trackId }>
              <h4 className="h4-item">{e.trackName}</h4>
              <div className="audio-container">
                <audio
                  className="audio"
                  data-testid="audio-component"
                  src={ e.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="favoritos">
                  <input
                    data-testid={ `checkbox-music-${e.trackId}` }
                    type="checkbox"
                    name="favoritos"
                    id="favoritos"
                    onChange={ this.handleFavoto }
                  />
                </label>
              </div>
            </li>
          ))}
        </ul>
        {loadind && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
