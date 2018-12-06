import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import {NavBar} from 'antd-mobile';
import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../laoban';
import Message from '../message';
import Personal from '../personal';
import Footer from '../footer';


class Main extends Component{

  //将每个页面的信息定义到数组中
  navList = [
    {path : '/laoban',title : '大神列表', icon : 'laoban', text : '大神'},
    {path : '/dashen',title : '老板列表', icon : 'dashen', text : '老板'},
    {path : '/message',title : '消息列表', icon : 'message', text : '消息'},
    {path : '/personal',title : '个人中心', icon : 'personal', text : '个人中心'}
  ]

  render (){

    //判断用户是否有登录行为
    const userid = Cookies.get('userid');

    if (!userid) {
      return <Redirect to='/login'/>
    }

    //获取当前的路由路径
    const {pathname} = this.props.location;
    //与定义的navList数组中的数据进行对比，找到与当前路径对应的那条数据
    const currNav = this.navList.find(item => item.path === pathname);


    return(
      <div>
        {currNav ? <NavBar>{currNav.title}</NavBar> : null}
        <Route path="/laobaninfo" component={LaobanInfo}/>
        <Route path="/dasheninfo" component={DashenInfo}/>
        <Route path="/laoban" component={Laoban}/>
        <Route path="/message" component={Message}/>
        <Route path="/personal" component={Personal}/>
        {currNav ? <Footer navList={this.navList}/> : null}
      </div>
    )
  }
}

export default Main;