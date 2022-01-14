import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Login from './pages/Login/index';
import Search from './pages/Search/index';
import Album from './pages/Album/index';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);

    this.state = {
      value: '',
      buttonLiberado: false,
    };
  }

  handleInput({ target }) {
    this.setState({ value: target.value }, () => {
      const MIN_NAME = 3;
      const { value } = this.state;
      this.setState({ buttonLiberado: value.length >= MIN_NAME });
    });
  }

  render() {
    const { value, buttonLiberado } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login
              input={ this.handleInput }
              value={ value }
              buttonLiberado={ buttonLiberado }
            />
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
