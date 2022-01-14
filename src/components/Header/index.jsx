import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo2.png';
import iconeUsuario from '../../img/usuarioIcon.png';
import './index.css';

export default class Header extends Component {
  render() {
    const { usuario, page } = this.props;
    return (
      <header data-testid="header-component">
        <section className="header-container">
          <img src={ logo } alt="logo da trybe" />
          <div className="usuario">
            <img src={ iconeUsuario } alt="icone de usuario" />
            <h4>{usuario}</h4>
          </div>
        </section>
        <nav className="nav-container">
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
                style={ page === 'pesquisa'
                  ? { color: 'white', backgroundColor: '#036b52' }
                  : {} }
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                style={ page === 'favorites'
                  ? { color: 'white', backgroundColor: '#036b52' }
                  : {} }
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                style={ page === 'profile'
                  ? { color: 'white', backgroundColor: '#036b52' }
                  : {} }
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  usuario: propTypes.string,
  page: propTypes.string,
};

Header.defaultProps = {
  page: 'false',
  usuario: 'usuario',
};
