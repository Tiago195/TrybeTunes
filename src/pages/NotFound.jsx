import React, { Component } from 'react';
import logo from '../img/logo1.png';
import './index.css';

export default class NotFound extends Component {
  render() {
    return (
      <section className="notFound-container" data-testid="page-not-found">
        <section>
          <img src={ logo } alt="logo da trybe" />
        </section>
        <section className="notFound">
          <span>Ops!</span>
          <h1>
            A página que você
            <br />
            está procurando
            <br />
            não foi encontrada.
          </h1>
        </section>
      </section>
    );
  }
}
