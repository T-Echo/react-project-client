import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Grid, List } from 'antd-mobile';

class HeaderSelector extends Component{

  static propTypes = {
    setHeader : PropTypes.func.isRequired
  }

  state = {
    header : null
  }

  setHeader = (el,index) => {
    //el中有icon 和text信息
    //更新自身的状态
    this.setState({
      header: el.icon
    })

    //更新父组件的状态
    this.props.setHeader(index);
  }

  render (){
    const {header} = this.state;

    const data = Array.from(new Array(20)).map((_val, i) => ({
      icon: require(`./images/avatars/头像${i + 1}.png`),
      text: `头像${i + 1}`,
    }));

    return (
      <List renderHeader={() => {
        //将图标头像定义成状态
        return <div>请选择头像 <img src={header} /></div>
      }}>
        <Grid data={data} columnNum="5" activeStyle={false} onClick={this.setHeader} />
      </List>
    )
  }
}

export default HeaderSelector;