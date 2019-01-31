// 小肥牛扫码点餐项目API子系统
const port=8090;
const express=require('express');
//引入cors
const cors=require('cors');
//引入路由器
const categoryRouter=require('./routes/admin/category');
const adminRouter=require('./routes/admin/admin');
const dishRouter=require('./routes/admin/dish');
//引入body-parser
const bodyParser=require('body-parser');


//启动主服务器
var app=express();
app.listen(port,()=>{console.log('server is listening'+port+' ...')});

//node-dev这个模块可以自动在更改服务器并保存后，重启服务器

//使用中间件cors,需要放到启动服务器后面，挂载路由前面
app.use(cors());
//使用body-parser中间件
app.use(bodyParser.json());//把JSON格式的请求主体数据解析出来放入req.body属性

//挂载路由器
app.use('/admin/categary',categoryRouter);
app.use('/admin',adminRouter);
app.use('/admin/dish',dishRouter);

