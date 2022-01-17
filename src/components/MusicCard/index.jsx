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
      });
    });
  }

  handleFavoto({ target }) {
    const { musicasFavoritas } = this.state;
    this.setState({ loadind: true });
    if (musicasFavoritas[target.name]) {
      removeSong(JSON.parse(target.value)).then(() => {
        this.setState(() => {
          musicasFavoritas[target.name] = target.cheloadind && cked;
          return { loadind: false };
        });
      });
    } else {
      addSong(JSON.parse(target.value)).then(() => {
        this.setState(() => {
          musicasFavoritas[target.name] = target.checked;
          return { loadind: false };
        });
      });
    }
  }

  render() {
    const { albumList } = this.props;
    const { loadind, musicasFavoritas } = this.state;
    return (
      <div className="musicas-container">
        {loadind ? <Loading />
          : (
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
                    <label htmlFor={ e.trackId }>
                      <input
                        data-testid={ `checkbox-music-${e.trackId}` }
                        type="checkbox"
                        name={ e.trackId }
                        id={ e.trackId }
                        value={ JSON.stringify(e) }
                        checked={ musicasFavoritas[e.trackId] }
                        onChange={ this.handleFavoto }
                      />
                    </label>
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
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
