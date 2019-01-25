// 小肥牛扫码点餐项目API子系统
const port=8090;
const express=require('express');

//启动主服务器
var app=express();
app.listen(port,()=>{console.log('server is listening'+port+' ...')});