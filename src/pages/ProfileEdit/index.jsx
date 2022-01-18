import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/index';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading/index';
import user from '../../img/user-circle-solid.svg';
import './index.css';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.buttonIsTrue = this.buttonIsTrue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      loading: true,
      buttonDiseble: true,
      inputImage: '',
      inputName: '',
      inputEmail: '',
      inputDescription: '',
      redirect: false,
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({
        loading: false,
        inputName: e.name,
        inputEmail: e.email,
        inputDescription: e.description,
        inputImage: e.image,
      }, () => {
        this.buttonIsTrue();
      });
    });
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.buttonIsTrue();
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      inputImage,
      inputName,
      inputEmail,
      inputDescription,
    } = this.state;
    updateUser({
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    });
    this.setState({
      redirect: true,
    });
  }

  buttonIsTrue() {
    const {
      inputImage,
      inputName,
      inputEmail,
      inputDescription,
    } = this.state;
    const array = [inputImage, inputName, inputEmail, inputDescription];
    this.setState({
      buttonDiseble: !array.every((e) => e.length > 0),
    });
  }

  render() {
    const { loading, name, buttonDiseble, inputImage,
      inputName, inputEmail, inputDescription, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header usuario={ name } />
        {redirect && <Redirect to="/profile" />}
        {loading ? <Loading />
          : (
            <form className="form-edit-container">
              <section className="edit-img">
                <img
                  src={ inputImage || user }
                  alt="icone usuario"
                  data-testid="profile-image"
                />
                <label htmlFor="edit-input-image">
                  <input
                    className="input-placeholder"
                    type="text"
                    name="inputImage"
                    data-testid="edit-input-image"
                    placeholder="Insira um link"
                    id="edit-input-image"
                    value={ inputImage }
                    onChange={ this.handleChange }
                  />
                </label>
              </section>
              <section className="edit-nameEmailDescription">
                <div className="mudar-nome">
                  <h3>Nome</h3>
                  <h4>Fique à vontade para usar seu nome social</h4>
                  <label htmlFor="edit-input-name">
                    <input
                      className="input-style input-placeholder"
                      type="text"
                      name="inputName"
                      placeholder="Novo Nome"
                      data-testid="edit-input-name"
                      id="edit-input-name"
                      value={ inputName }
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <div className="mudar-email">
                  <h3>E-mail</h3>
                  <h4>Escolha um e-mail que consulte diariamente</h4>
                  <label htmlFor="edit-input-email">
                    <input
                      className="input-style input-placeholder"
                      type="email"
                      name="inputEmail"
                      placeholder="usuario@usuario.com.br"
                      data-testid="edit-input-email"
                      id="edit-input-email"
                      value={ inputEmail }
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <div className="mudar-description">
                  <h3>Descrição</h3>
                  <textarea
                    className="input-style input-placeholder"
                    style={ { resize: 'none' } }
                    name="inputDescription"
                    id=""
                    cols="30"
                    rows="4"
                    value={ inputDescription }
                    data-testid="edit-input-description"
                    placeholder="Sobre mim"
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="button-edit">
                  <button
                    type="submit"
                    data-testid="edit-button-save"
                    disabled={ buttonDiseble }
                    onClick={ this.handleSubmit }
                  >
                    Salvar
                  </button>
                </div>
              </section>
            </form>
          )}
      </div>
    );
  }
}
