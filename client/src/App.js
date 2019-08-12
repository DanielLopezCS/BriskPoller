import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import store from './store';


import PollsPage from './components/Pages/PollsPage';

import PollCreatePage from './components/Pages/PollCreatePage';
import PollDetailPage from './components/Pages/PollDetailPage';
import PollArchivePage from './components/Pages/PollArchivePage';

import 'semantic-ui-css/semantic.min.css'


class App extends Component {

  render() {
    

    return (

      <Provider store={store}>
        <Router>
            <div className="App"> 
            
             
            <Route exact path="/" component={PollsPage}  />
            <div className="container">
              <Route exact path="/create" component={PollCreatePage} />
              <Route path="/poll/:id" component={PollDetailPage}  />
              <Route path="/polls/" component={PollArchivePage}  />

            </div>
          
          </div>
        </Router>
      </Provider>
    );
  }
}



export default App;
