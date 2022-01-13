import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Logo from '../../img/image.png';
import './index.css';
import { createUser } from '../../services/userAPI';

export default class Login extends Component {
  render() {
    const { input, value, buttonLiberado } = this.props;
    return (
      <section className="login-container">
        <img src={ Logo } alt="Logo da trybe" />
        <form data-testid="page-login" className="form-container">
          <label htmlFor="login-name-input">
            <input
              className="input-name"
              data-testid="login-name-input"
              type="text"
              name="login-name-input"
              id="login-name-input"
              placeholder="Nome"
              value={ value }
              onChange={ input }
            />
          </label>
          <button
            className="button-entrar"
            type="submit"
            data-testid="login-submit-button"
            disabled={ !buttonLiberado }
            onClick={ () => createUser({ name: value }) }
          >
            Entrar
          </button>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  input: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  buttonLiberado: PropTypes.bool.isRequired,
};
