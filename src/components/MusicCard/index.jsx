import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Loading from '../Loading/index';
import { getFavoriteSongs, addSong, removeSong } from '../../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.handleFavoto = this.handleFavoto.bind(this);

    this.state = {
      loadind: true,
      musicasFavoritas: {},
      favoritList: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((e) => {
      this.setState({
        loadind: false,
        musicasFavoritas: e.reduce((a, b) => {
          a[b.trackId] = true;
          return a;
        }, {}),
        favoritList: e,
      });
    });
  }

  handleFavoto({ target }) {
    const { musicasFavoritas } = this.state;
    this.setState({ loadind: true });
    if (musicasFavoritas[target.name]) {
      removeSong(JSON.parse(target.value)).then(() => {
        this.setState(() => {
          musicasFavoritas[target.name] = false;
          return { loadind: false };
        });
      });
    } else {
      addSong(JSON.parse(target.value)).then(() => {
        this.setState(() => {
          musicasFavoritas[target.name] = true;
          return { loadind: false };
        });
      });
    }
    this.setState({ favoritList: JSON.parse(localStorage.getItem('favorite_songs')) });
  }

  render() {
    const { albumList } = this.props;
    const { loadind, musicasFavoritas, favoritList } = this.state;
    const renderizar = albumList.length > 0 ? [...albumList] : [...favoritList];
    return (
      <div className="musicas-container">
        {loadind ? <Loading />
          : (
            <ul>
              {renderizar.map((e) => (
                <li className="lis" key={ e.trackId }>
                  {!albumList.length > 0 && (
                    <img src={ e.artworkUrl100 } alt="foto da musica" />
                  )}
                  <div className="musicas-coitainer">
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
                      <label htmlFor={ e.trackId }>
                        Favorita
                        <input
                          data-testid={ `checkbox-music-${e.trackId}` }
                          type="checkbox"
                          name={ e.trackId }
                          id={ e.trackId }
                          value={ JSON.stringify(e) }
                          checked={ musicasFavoritas[e.trackId] }
                          onChange={ this.handleFavoto }
                        />
                        <i
                          className={ musicasFavoritas[e.trackId]
                            ? 'fa fa-heart' : 'far fa-heart' }
                        />
                      </label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  albumList: PropTypes.arrayOf(PropTypes.object),
};

MusicCard.defaultProps = {
  albumList: [],
};
