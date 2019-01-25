set names utf8;
drop database if exists xiaofeiniu;
create database xiaofeiniu charset=utf8;
use xiaofeiniu;

#管理员信息表
create table xfn_admin(
    aid int primary key auto_increment,#管理员编号
    aname varchar(32) unique,#管理员用户名
    apwd varchar(64)#管理员密码
);
insert into xfn_admin values
(null,'admin',password('123456')),
(null,'boss',password('999999'));

/*
#项目全局设置
create table xfn_settings(
    sid int primary key auto_increment,#编号
    appName varchar(32),#店家名称
    apiUrl varchar(64),#数据PI子系统地址
    adminUrl varchar(64),#管理后台子系统地址
    appUrl varchar(64),#顾客app子系统地址
    icp varchar(64),#系统备案号
    copyright varchar(128)#系统版权声明
);

#桌台信息表
create table xfn_table(
    tid int primary key auto_increment,#桌台编号
    tname varchar(64),#桌台昵称
    type varchar(16),#桌台类型，如3-4人桌
    status int,#当前状态
);

#桌台预定信息表
create table xfn_reservation(
    rid int primary key auto_increment,
    contactName varchar(64),#联系人姓名
    phone varchar(16),#联系电话
    contactTime bigint,#联系时间
    dinnerTime bigint#预约的用餐时间
);

#菜品分类表
create table xfn_category(
    cid int primary key auto_increment,#类别编号
    cname varchar(32)#类别名称
);

#菜品信息表
create table xfn_dish(
    did int primary key auto_increment,#菜品编号，起始值为100000
    title varchar(32),#菜品名称
    imgUrl varchar(128),#图片地址
    price decimal(6,2),#菜品价格
    detail varchar(128),#详细描述
    categoryId int,
    foreign key(categoryId) references xfn_category(cid)
);

#订单详情表
create table xfn_order(
    oid int primary key,#订单编号
    startTime bigint,#开始用餐时间
    endTime bigint,#结束用餐时间
    customerCount int,#用餐人数
    tableId int,#桌号
    foreign key(tableId) references xfn_table(tid)
);

#订单表
create table xfn_order_detail(
    did int primary key auto_increment,#订单编号
    dishId int,#菜单编号
    dishCount int,#菜品数量
    customerName varchar(64),#下单用户名
    orderId int,
    foreign key(dishId) references xfn_dish(did),
    foreign key(orderId) references xfn_order(oid)
);
*/