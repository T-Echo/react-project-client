import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import { NavBar, List, InputItem, WhiteSpace,WingBlank, Radio, Button } from 'antd-mobile';
//import {reqRegister} from '../../api';用不到了
import Logo from '../logo';


const Item = List.Item;


class Register extends Component {

  static propTypes = {
    user : PropTypes.object.isRequired,//user中已经约定好的数据中有errMsg
    register : PropTypes.func.isRequired
  }

  state = {
    //有关页面变化的数据保存到状态
    //isBossChecked : true,
    laoban : true,
    username : '',
    password:'',
    rePassword : ''
  }

  /*handleRadio = type => {
    if (type === 'laoban'){
      this.setState({
        isBossChecked:true
      })
    }else {
      this.setState({
        isBossChecked : false
      })
    }
  }*/

  /*handleUserName = val => {
    this.setState({
      username : val
    })
  }
  handlePassword = val => {
    this.setState({
      password : val
    })
  }
  handleRepassword = val => {
    this.setState({
      repassword : val
    })
  }*/

  //简化
  handleChange = (type,value) => {
    this.setState({
      [type] : value
    })
  }

  register = async () => {
    //收集表单数据
    const {laoban, username, rePassword, password} = this.state;
    //发送ajax请求
    console.log(laoban, username, rePassword, password);
    /*const user = await reqRegister({username,password,type:laoban ? 'laoban' : 'dashen'});
    console.log(user);*/
    //调用容器组件传递的更新状态的方法
    this.props.register({type:laoban ? 'laoban':'dashen', username, password, rePassword})
  }

  goLogin = () => {
    //点击已有账户，去登陆页面，将地址切换为login
    this.props.history.replace('/login');
    //this.props.history.push('/login');会添加一条浏览记录
  }

  render () {
    const {laoban} = this.state;
    const {errMsg, redirectTo} = this.props.user;

    //注册成功后，根据容器组件传递的store中的状态数据判断重定向到哪
    if (redirectTo){
      //路由连接跳转
      return <Redirect to={redirectTo} />
    }


    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <p className="err-msg">{errMsg}</p>
        <WingBlank>
          <List>
            {/*往定义的方法里面传参的方式*/}
            <InputItem onChange={(val) => {this.handleChange('username',val)}}>用户名 :</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(val) => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码 :</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(val) => {this.handleChange('rePassword',val)}}>确认密码 :</InputItem>
            <WhiteSpace/>
            <Item>
              用户类型：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/*往定义的方法里面传参的方式: 下面两种方式结果相同*/}
              <Radio checked={!laoban} onChange={() => {this.handleChange('laoban',false)}}>大神</Radio>&nbsp;&nbsp;&nbsp;
              <Radio checked={laoban} onChange={this.handleChange.bind(null,'laoban',true)}>老板</Radio>
            </Item>
            <WhiteSpace/>
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register;