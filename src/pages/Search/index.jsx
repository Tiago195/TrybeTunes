import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/index';
import Loading from '../../components/Loading/index';
import { getUser } from '../../services/userAPI';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './index.css';

export default class Search extends Component {
  constructor() {
    super();

    this.handleSearch = this.handleSearch.bind(this);
    this.handleButton = this.handleButton.bind(this);

    this.state = {
      loading: true,
      carregando: false,
      name: '',
      search: '',
      artista: '',
      buttonIstrue: false,
      encontrado: false,
      naoEncontrado: false,
      meusArtistas: [],
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({ loading: false, name: e.name });
    });
  }

  handleSearch({ target }) {
    this.setState({ search: target.value }, () => {
      this.setState({ buttonIstrue: target.value.length >= 2 });
    });
  }

  handleButton(e) {
    e.preventDefault();
    const { search } = this.state;
    this.setState({ carregando: true });
    searchAlbumsAPI(search).then((musicas) => (musicas.length > 0
      ? this.setState({
        meusArtistas: [...musicas],
        carregando: false,
        encontrado: true,
        naoEncontrado: false,
      })
      : this.setState({
        meusArtistas: [],
        carregando: false,
        encontrado: false,
        naoEncontrado: true,
      })));
    this.setState({ artista: search, search: '', buttonIstrue: false });
  }

  render() {
    const { loading, name, buttonIstrue, search,
      carregando, meusArtistas, encontrado, artista, naoEncontrado } = this.state;
    return (
      <div className="search-container" data-testid="page-search">
        {loading ? <Loading /> : (
          <>
            <Header usuario={ name } page="pesquisa" />
            <section className="bem-vindo">
              <h1 data-testid="header-user-name">
                Seja bem vindo
                {' '}
                {name}
              </h1>
              <br />
              <h3>O que vamos escutar?</h3>
            </section>
            <form className="form-seach-container">
              <label htmlFor="search-artist-input">
                <input
                  type="text"
                  name=""
                  value={ search }
                  id="search-artist-input"
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.handleSearch }
                  className="input-text-search"
                />
              </label>
              <button
                type="submit"
                className="button-search"
                data-testid="search-artist-button"
                disabled={ !buttonIstrue }
                onClick={ this.handleButton }
              >
                Procurar
              </button>
            </form>
            <section className="container-results-container">
              {carregando && <Loading />}
              {encontrado && (
                <div className="results-container">
                  <h3>{ `Resultado de álbuns de: ${artista}` }</h3>
                  <div className="results">
                    {meusArtistas.map((tutu) => (
                      <section className="cada-results" key={ tutu.collectionId }>
                        <Link
                          className="tutu"
                          data-testid={ `link-to-album-${tutu.collectionId}` }
                          to={ `/album/${tutu.collectionId}` }
                        >
                          <img src={ tutu.artworkUrl100 } alt="foto do album" />
                          <div className="informacao">
                            <h4>{ tutu.collectionName }</h4>
                            <h4>{ tutu.artistName }</h4>
                          </div>
                        </Link>
                      </section>
                    ))}
                  </div>
                </div>
              )}
              {naoEncontrado && <h3>Nenhum álbum foi encontrado</h3>}
            </section>
          </>
        )}
      </div>
    );
  }
}
