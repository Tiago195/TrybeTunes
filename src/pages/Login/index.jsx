import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../img/logo1.png';
import './index.css';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading/index';

export default class Login extends Component {
  constructor() {
    super();

    this.handleTutu = this.handleTutu.bind(this);

    this.state = {
      loading: false,
      redirect: false,
    };
  }

  handleTutu(value) {
    this.setState({ loading: true });
    createUser({ name: value }).then(() => {
      this.setState({ loading: false, redirect: true });
    });
  }

  render() {
    const { input, value, buttonLiberado } = this.props;
    const { loading, redirect } = this.state;
    return (
      <div>
        {redirect && <Redirect to="/search" />}
        {loading ? (<Loading />)
          : (
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
                    maxLength="13"
                  />
                </label>
                <button
                  className="button-entrar"
                  type="submit"
                  data-testid="login-submit-button"
                  disabled={ !buttonLiberado }
                  onClick={ () => this.handleTutu(value) }
                >
                  Entrar
                </button>
              </form>
            </section>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  input: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  buttonLiberado: PropTypes.bool.isRequired,
};
