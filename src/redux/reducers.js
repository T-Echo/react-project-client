/*
 作用：根据之前的状态（previousState）和更新数据的行为（action）产生一个新的状态（newState）
 */

import {combineReducers} from 'redux';
import {AUTH_SUCCESS,AUTH_ERROR} from './action-types';


//初始化状态值
const initUserState = {
  username : '',
  type : '',
  _id : '',
  errMsg : '',
  redirectTo : '',
  header : '',
  post : '',
  salay : '',
  company: '',
  info: ''
};

function user(previousState = initUserState,action){
  switch (action.type){
    case AUTH_SUCCESS :
      //请求成功：action中已经处理好了返回值的类型(对象)，这里可以直接用action.data
      //return action.data
      //redirectTo:封装一个函数用来得到跳转的地址
      return {...action.data, redirectTo: getRedirectPath(action.data.type,action.data.header)};
    case AUTH_ERROR :
      //请求失败：不用保存错误的数据, ...action.data将errMsg的值覆盖为action中注册失败返回给用户的提示
      return {...initUserState, ...action.data};
    default :
      return previousState;
  }
}

const initYyyState = 0;
function yyy(previousState = initYyyState,action){
  switch (action.type){
    default :
      return previousState;
  }
}


function getRedirectPath(type, header){
  let path = '';

  //判断用户的类型
  if (type === 'laoban'){
    path = '/laoban';
  }else {
    path = '/dashen';
  }

  //判断有没有头像,如果没有头像就在地址后面加上info
  if (!header){
    path += 'info';
  }

  return path;
}

//暴露
export default combineReducers({
  user
})
