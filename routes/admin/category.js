//菜品类别相关的路由
const express=require('express');
const pool=require('../../pool');
var router=express.Router();

//客户端获取所有的菜品类别，按编号升序排列
router.get('/',(req,res)=>{
    var sql='select * from xfn_category order by cid asc';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
});

//删除指定类别
router.delete('/:cid',(req,res)=>{
    //删除菜品类别前必须先把属于该类别的菜品的类别编号设置为null
    var cid=req.params.cid;
    var sql1='update xfn_dish set categoryId=null where categoryId=?';
    var sql2='delete from xfn_category where cid = ?';
    pool.query(sql1,cid,(err,result)=>{
        if(err) throw err;
        //至此指定类别的菜品已经修改完毕
        pool.query(sql2,cid,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:200,msg:'1 category deleted'})
            }else{
                res.send({code:400,msg:'0 category deleted'})
            }
        })
    })
});

//添加新的菜品类别
router.post('/',(req,res)=>{
    var data=req.body;
    var sql='insert into xfn_category set ?';
    pool.query(sql,data,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:'1 category added'})
        }else{
            res.send({code:400,msg:'0 category added'});
        }
    })
});

//修改菜品类别
router.put('/',(req,res)=>{
    var data=req.body;//请求数据JSON格式
    var sql='update xfn_category set ? where cid=?';
    pool.query(sql,[data,data.cid],(err,result)=>{
        if(err) throw err;
        if(result.changedRows>0){
            //实际更新了一行
            res.send({code:200,msg:'1 category modified'});
        }else if(result.affectedRows==0){
            //要修改的内容不存在
            res.send({code:400,msg:'category not exists'});
        }else if(result.affectedRows==1 && result.changedRows==0){
            //影响到1行，但修改了0行——新值与旧值一样
            res.send({code:401,msg:'no category modified'});
        }
    })
})

module.exports=router;