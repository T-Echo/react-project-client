import React,{Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import {NavBar, Icon} from 'antd-mobile';
import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../../containers/laoban';
import Message from '../message';
import Personal from '../personal';
import Footer from '../footer';
import './index.less';


class Main extends Component{

  static propTypes = {
    user : PropTypes.object.isRequired,
    getUserInfo : PropTypes.func.isRequired
  }

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

    //如果本地有cookie，redux中没有状态，就要发送ajax请求
    if (!this.props.user._id){
      //调用一下状态数据就会过来,但是存在一个问题，如果数据还没请求回来就往下执行，就会报错
      this.props.getUserInfo();
      //当状态数据还未更新，不让加载后面的组件，
      //return一个loading图 在请求数据的过程中先一直让loading图显示(在antd中找插件)
      return <Icon className="loading" type="loading" size="lg"/>
    }

    //获取当前的路由路径
    const {pathname} = this.props.location;

    //如果用户直接访问localhost：4000/ 让他跳转到大神/老板/信息完善页面
    if (pathname === '/'){
      return <Redirect to={this.props.user.redirectTo}/>
    }


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