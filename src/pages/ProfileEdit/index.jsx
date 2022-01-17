import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/index';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading/index';
import user from '../../img/user-circle-solid.svg';

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
    const { loading, name, image, buttonDiseble, inputImage,
      inputName, inputEmail, inputDescription, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header usuario={ name } />
        {redirect && <Redirect to="/profile" />}
        {loading ? <Loading />
          : (
            <form>
              <section>
                <img
                  src={ image || user }
                  alt="icone usuario"
                  data-testid="profile-image"
                />
                <label htmlFor="edit-input-image">
                  <input
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
              <section>
                <div>
                  <h3>Nome</h3>
                  <h4>Fique à vontade para usar seu nome social</h4>
                  <label htmlFor="edit-input-name">
                    <input
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
                <div>
                  <h3>E-mail</h3>
                  <h4>Escolha um e-mail que consulte diariamente</h4>
                  <label htmlFor="edit-input-email">
                    <input
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
                <div>
                  <h3>Descrição</h3>
                  <textarea
                    name="inputDescription"
                    id=""
                    cols="30"
                    rows="5"
                    value={ inputDescription }
                    data-testid="edit-input-description"
                    placeholder="Sobre mim"
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
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
