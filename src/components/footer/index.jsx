import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './index.less';

const Item = TabBar.Item;

class Footer extends Component{

  static propTypes = {
    navList : PropTypes.array.isRequired,
    type : PropTypes.string.isRequired
  }

  redirectTo = path => {
    this.props.history.push(path);
  }

  render (){
    //const type = 'laoban';
    //动态获取type
    const filter = this.props.type === 'laoban' ? '/dashen' : '/laoban';
    //过滤掉老板和大神图标中的一个
    const currNavList = this.props.navList.filter(item => filter === item.path ? false : true)
    //console.log(currNavList);


    return(
      <TabBar class="footer">

        {
          currNavList.map((item,index) => <Item
            key="index" title={item.text}
            icon={<img className="footer-img" src={require(`./images/${item.icon}.png`)} alt=""/>}
            onPress={this.redirectTo.bind(null, item.path)}
            selected={this.props.location.pathname === item.path}
            selectedIcon={<img className="footer-img" src={require(`./images/${item.icon}-selected.png`)} alt=""/>}
          />)
        }

        {/*{
          type === 'dashen'
          ? <Item title="老板" icon={<img className="footer-img" src={require('./images/laoban.png')} alt=""/>}/>
          : <Item title="大神" icon={<img className="footer-img" src={require('./images/dashen.png')} alt=""/>}/>

        }
        <Item title="大神" icon={<img className="footer-img" src={require('./images/dashen.png')} alt=""/>}/>
        <Item title="消息" icon={<img className="footer-img" src={require('./images/message.png')} alt=""/>}/>
        <Item title="个人" icon={<img className="footer-img" src={require('./images/personal.png')} alt=""/>}/>
      */}
      </TabBar>
    )
  }
}

export default withRouter(Footer);