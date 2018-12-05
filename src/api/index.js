/*
* 定义所有请求函数
*/

import ajax from './ajax';

//请求地址前缀
//const prefix = 'http://localhost:4000';
//代理服务器需要的配置
const prefix = '';

//定义注册的请求
export const reqRegister = data => ajax(`${prefix}/register`, data, 'POST');

//定义登陆的请求
export const reqLogin = data => ajax(`${prefix}/login`, data, 'POST');