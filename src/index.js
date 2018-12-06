import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
//引入表单验证提示信息的样式
import './assets/less/index.less';

import store from './redux/store';
import Login from './containers/login';
import Register from './containers/register';
import Main from './components/main';


ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        {/*不写path，默认匹配所有路径, "/"也是默认匹配所有路径，并且必须写在其他路由后面*/}
        <Route path="/" component={Main}/>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('app'));