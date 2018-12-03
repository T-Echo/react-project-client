import React, {Component} from 'react';
import { NavBar, List, InputItem, WhiteSpace,WingBlank, Button } from 'antd-mobile';
import Logo from '../logo';


class Login extends Component {

  state = {
    //有关页面变化的数据保存到状态
    //isBossChecked : true,
    username : '',
    password:''
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

  login = () => {
    //收集表单数据
    const {username, password} = this.state;
    //发送ajax请求
    console.log(username, password)
  }

  goRegister = () => {
    //点击已有账户，去登陆页面，将地址切换为login
    this.props.history.replace('/register');
    //this.props.history.push('/login');会添加一条浏览记录
  }

  render () {
    const {laoban} = this.state;
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {/*往定义的方法里面传参的方式*/}
            <InputItem onChange={(val) => {this.handleChange('username',val)}}>用户名 :</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(val) => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码 :</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.login}>登陆</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>没账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Login;