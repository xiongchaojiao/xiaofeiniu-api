const express=require('express');
const pool=require('../../pool');
var router=express.Router();
//引入中间件multer，辅助上传文件
const multer=require('multer');
//引入fs
const fs=require('fs');
var upload=multer({
    dest:'tem/'  //指定客户端上传的文件的临时保存路径，会自动生成该文件夹
})

//获取所有的菜品（按类别进行分类）
router.get('/',(req,res)=>{
    //查询所有的菜品类别
    pool.query('select cid,cname from xfn_category order by cid',(err,result)=>{
        if(err) throw err;
        var categoryList=result;//菜品类别数组
        var count=0;
        //循环体内执行的是异步操作，如果用var的话，i只会是最后一个，这个是闭包的典型案例
        for(let c of categoryList){
            //循环查询每个类别下有哪些菜品
            pool.query('select * from xfn_dish where categoryId=? order by did desc',c.cid,(err,result)=>{
                if(err) throw err;
                //增加一个属性将数据发送出去
                c.dishList=result;
                //必须保证所有的类别下的菜品都查询完成才能发送响应消息——所有查询在数据库都是异步执行的
                count++;
                if(count==categoryList.length){
                    res.send(categoryList);
                }
            })
        }
    })
})

//定义路由，使用文件上传中间件multer
//接收客户端上传的菜品图片，保存在服务器上，返回该图片在服务器上的随机文件名
router.post('/image',upload.single('dishImg'),(req,res)=>{
    //single表示一次只能够上传一张图片
    console.log(req.file);
    //客户端上传的文件详细内容
   /* (fieldname：dishImg--文件name
    originalname:'2.jpg'--文件原始名字
    encoding:'7bit'--编码类型
    mimetype:'image/jpeg'--存储格式
    destination:'tmp/'--存储路径   filename:'619ffe7b9ccee798ccee1c35c1d6021b'--存储的文件名
    path:'tmp\\619ffe7b9ccee798ccee1c35c1d6021b'--存储路径名
    size:21229--文件大小)
    */
    console.log(req.body);//客户端随同图片提交的字符数据
    //把客户端上传的文件从临时目录转移到永久的图片路径下
    var tmpFile=req.file.path;
    var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));//截取出.jpg
    var newFile=randFileName(suffix);//目标文件名
    fs.rename(tmpFile,'img/dish/'+newFile,()=>{//把临时文件转移
        res.send({code:200,msg:'upload succ',fileName:newFile})
    })
    
})

//添加一个新的菜品
router.post('/',(req,res)=>{
    pool.query('insert into xfn_dish set ?',req.body,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'dish added success',dishId:result.insertId});//将insert语句产生的自增编号输出给客户端
    })
})

//删除一个菜品

//修改一个菜品

//生成一个随机文件名
//参数：suffix表示要生成的文件名中的后缀
function randFileName(suffix){
    var time=new Date().getTime();
    var num=Math.floor(Math.random()*(10000-1000)+1000);//生成4位的随机数字
    return time+'-'+num+suffix;//形如132465674334-1564.jpg
}
module.exports=router;