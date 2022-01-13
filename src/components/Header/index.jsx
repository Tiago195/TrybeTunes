import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo2.png';
import iconeUsuario from '../../img/usuarioIcon.png';
import './index.css';

export default class Header extends Component {
  handleClick({ target }) {
    target.style.color = 'white';
    target.style.backgroundColor = '#036B52';
  }

  render() {
    const { usuario } = this.props;
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
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  usuario: propTypes.string.isRequired,
};
