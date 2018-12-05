/*
 作用：包含多个用来创建action的action creators
 类别：
 1. 同步action creator
 返回值是action对象
 2. 异步action creator
 返回值是函数 dispatch => {xxx}
 */

//引入发送ajax请求的函数
import {reqRegister, reqLogin} from '../api';
import {AUTH_SUCCESS,AUTH_ERROR} from './action-types';

//定义同步action
export const authSuccess = data => ({type:'AUTH_SUCCESS', data});
export const authError = data => ({type:'AUTH_ERROR', data});

//定义异步action creator，要求返回一个函数
//注册
export const register = ({username,password,rePassword,type}) =>{

  //表单验证(是同步的，写在异步的前面，如果验证不成功就不会往下执行异步的action)
  if (!username){
    return authError({errMsg:'请输入用户名'})
  }else if (!password){
    return authError({errMsg:'请输入密码'})
  }else if (rePassword !== password){
    return authError({errMsg:'密码不一致'})
  }

  return (dispatch) => {
    //处理异步任务，发送ajax请求
    reqRegister({username,password,type})
    //这里直接拿到请求回来的数据res.data
      .then(({data}) => {
        //请求成功
        //通过调用dispatch更新状态
        //判断是否注册成功
        if (data.code === 0){
          //注册成功，更新状态，分发成功的action，让参数都为对象方便管理
          dispatch(authSuccess(data.data));//这里的data.data是拿到的后台的响应，作为参数传到action，触发dispatch方法，会将这个响应的具体内容返出去
        }else{
          //注册失败，更新状态，分发失败的action，让参数都为对象方便管理
          dispatch(authError({errMsg:data.msg}));
        }
      })
      .catch(err => {
        //请求失败(网络错误，或者服务器内部错误)，让参数都为对象方便管理
        dispatch(authError({errMsg:'网络不稳定，请刷新'}))
      })
  }
}

//登陆
export const login = ({username,password}) => {
  //表单验证
  if (!username){
    return authError({errMsg:'请输入用户名'})
  }else if (!password){
    return authError({errMsg:'请输入密码'})
  }

  return dispatch => {
    //发送ajax请求
    reqLogin({username, password})
      //请求成功,请求成功后要将接收到的响应数据对应保存到store
      .then(({data}) => {
        //判断有没有登陆成功
        if (data.code === 0){
          //登陆成功，因为这里登陆和注册成功后要保存的数据一样，所以同步的action方法可以复用
          dispatch(authSuccess(data.data));
        }else{
          //登陆失败
          dispatch(authError({errMsg:data.msg}));
        }
      })
      //请求失败（用户网络错误）
      .catch(err => {
        dispatch(authError({errMsg:'网络出错'}));
      })
  }
}


