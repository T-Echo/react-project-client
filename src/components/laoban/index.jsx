import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import Cookies from 'js-cookie';


class Laoban extends Component {

  static propTypes = {
    UserList: PropTypes.array.isRequired,
    getUserList: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (!this.props.UserList.length) {
      this.props.getUserList('dashen');
    }
  }

  goChat = id => {
    this.props.history.push(`./chat/${id}`)
  }

  render () {

    //过滤掉信息不完善的大神用户
    const UserList = this.props.UserList.filter(item => item.header);

    return (
      <div>
        <WingBlank size="lg">
          <WhiteSpace size="lg" />
          {
            UserList.map((item,index) => {
              return (
                <div key={index} onClick={this.goChat.bind(null,item._id)}>
                  <Card>
                    <Card.Header
                      thumb={require(`../../assets/images/头像${+item.header + 1}.png`)}
                      extra={<span>{item.username}</span>}
                    />
                    <Card.Body>
                      <div>职位：{item.post}</div>
                      <div>描述：{item.info}</div>
                    </Card.Body>
                  </Card>
                  <WhiteSpace size="lg" />
                </div>
              )
            })
          }
        </WingBlank>
      </div>
    )
  }
}

export default Laoban;