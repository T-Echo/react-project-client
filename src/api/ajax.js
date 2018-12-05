/*
 作用：用来定义发送ajax模块工具函数

 处理请求方式、判断请求方式、发送请求 返回响应
 */

import axios from 'axios';

export default function (url, data, method='GET'){
  let qs = '';
  //如果传了请求参数
  if (data){
    //遍历data（对象），拿到里面的key并返回一个数组
    const arr = Object.keys(data);
    //遍历数组，拼接qs字符串
    arr.forEach(key => {
      qs += `${key}=${data[key]}&`;
    })
    //去掉最后的&
    qs.substring(0,arr.length - 1);
  }

  //判断请求方式
  const type = method.toUpperCase();
  if (type === 'GET'){
    //发送get请求
    //axios发送ajax请求，返回值是promise对象
    return axios.get(url + '?' + qs);
    //将接收到的数据返出去
    //return result.data;
  }else if (type === 'POST'){
    //发送post请求
    return axios.post(url, qs, {
      'content-type' : 'application/x-www-form-urlencoded'
    })
    //将接收到的数据返出去
    //return result.data;
  }

}