import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/index';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading/index';
import user from '../../img/user-circle-solid.svg';
import './index.css';

export default class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((e) => {
      this.setState({
        loading: false,
        name: e.name,
        email: e.email,
        description: e.description,
        image: e.image,
      });
    });
  }

  render() {
    const { name, loading, image, description, email } = this.state;
    return (
      <div data-testid="page-profile">
        <Header usuario={ name } page="profile" />
        { loading ? <Loading />
          : (
            <section className="page-container">
              <section className="profile-container">
                <section className="user-edit">
                  <img
                    src={ image || user }
                    alt="icone usuario"
                    data-testid="profile-image"
                  />
                  <button type="button">
                    <Link to="/profile/edit">Editar perfil</Link>
                  </button>
                </section>
                <section className="perfil-edit">
                  <div className="name-edit">
                    <h3>Nome</h3>
                    <h4>{name}</h4>
                  </div>
                  <div className="email-edit">
                    <h3>E-mail</h3>
                    <h4>{email}</h4>
                  </div>
                  <div className="description-edit">
                    <h3>Descrição</h3>
                    <h4>{description}</h4>
                  </div>
                </section>
              </section>
            </section>
          )}
      </div>
    );
  }
}
