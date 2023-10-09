import { Router } from "react-router-dom";
import Routes from './routes'
import store from './store'
import { Provider } from 'react-redux'
import { history } from 'helpers/common';
import 'bootstrap/dist/css/bootstrap.css';
import 'assets/css/app.css';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}

export default App;
