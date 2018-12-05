//引入connect
import {connect} from 'react-redux';
//引入UI组件
import Register from '../components/register';
//引入action
import {register} from '../redux/actions';
//将容器组件暴露出去
export default connect(
  state => ({user : state.user}),//state是redux管理的状态数据，reducers中暴露出去的是一个对象，要通过state.xxx拿到其中的一个
  {register}
)(Register);