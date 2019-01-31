const express=require('express');
const pool=require('../../pool');
var router=express.Router();

//用户登录验证
router.get('/login',(req,res)=>{
    var aname=req.query.aname;
    var apwd=req.query.apwd;
    var sql='select aid from xfn_admin where aname=? and apwd=PASSWORD(?)';
    pool.query(sql,[aname,apwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            //查询到一行数据，登录成功
            res.send({code:200,msg:'login success'})
        }else{
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
});

//根据管理员名和密码修改管理员密码
router.patch('/',(req,res)=>{
    console.log(req.body);
    var data=req.body;
    //首先根据aname/oldPwd查询该用户是否存在
    var sql='select aid from xfn_admin where aname=? and apwd=PASSWORD(?)';
    pool.query(sql,[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err;
        console.log(result.aid);
        if(result.length>0){
            //如果查询到了用户，再修改其密码
            pool.query('update xfn_admin set apwd=PASSWORD(?) where aname=?',[data.newPwd,data.aname],(err,result)=>{
                if(err) throw err;
                if(result.changedRows>0){
                    //密码修改完成
                    res.send({code:200,msg:'modified success'})
                }else
                //新旧密码一样，未做修改
                res.send({code:401,msg:'apwd not modified'})
            })
        }else{
            res.send({code:400,msg:'aname or apwd err'})
        }
    })
    

});

module.exports=router;