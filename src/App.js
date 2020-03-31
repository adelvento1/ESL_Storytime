import React, { Component } from 'react';
import { Route, NavLink, HashRouter} from "react-router-dom";
import Bookshelf from './components/Bookshelf';
import "./index.css";
import StoryPage from './components/StoryPage.js';

class App extends Component {

render(){
  return (
    <HashRouter>
    <div>
      
      <div>
        <Route exact path="/" component={Bookshelf}/>
        <Route path="/:handle" component={StoryPage}/>
      </div>
    </div>
    </HashRouter>
  );
}
}
export default App;
