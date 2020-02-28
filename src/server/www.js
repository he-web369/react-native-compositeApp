const express= require('express')
const app=express()
const {User,Chat}=require('./mongoose-db')
const md5=require('md5')
const ws=require('ws').Server
const bodyParser=require('body-parser')
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
})
app.use(bodyParser.urlencoded({ extended: true }))
const wss=new ws({port:5001})
const clients=[]
wss.on('connection',(ws)=>{
    console.log('client connected')
    clients.push(ws)
    ws.on('message',(message)=>{
        message=message.split(',')
        const chat_id=[message[0],message[1]].sort().join('')
        const newMsg={chat_id,from:message[0],to:message[1],message:message[2],date:Date.now(),isRead:false}
        new Chat(newMsg).save((err,obj)=>{
            if(!err){
                clients.forEach(item=>{
                    item.send(JSON.stringify(newMsg))
                })
            }
        })
    })
    ws.on("close",function(){
		clients.splice(clients.indexOf(this),1);
	})
})
app.get('/chat/read',(req,res)=>{
    const {from,to}=req.query
    Chat.updateMany({$and:[{"to":from},{"from":to}]},{$set:{"isRead":true}},(err,obj)=>{
        if(!err){
            Chat.find({$or:[{from:from},{to:from}]},(err,obj)=>{
                console.log(obj)
                res.json({code:0,data:obj})
            })
        }
    })
})
app.get('/chat/chatList',(req,res)=>{
    const {from}=req.query
    Chat.find({$or:[{from:from},{to:from}]},(err,obj)=>{
        if(!err){
            res.json({code:0,data:obj})
        }
    })
})
app.get('/user/search',(req,res)=>{
    let {username}=req.query
    User.findOne({username},(err,obj)=>{
        if(!err&&obj){
            res.json({code:0,data:obj})
        }else{
            res.json({code:-1,msg:err})
        }
    })
})

app.get('/user/add',(req,res)=>{
    let {ownName,addName}=req.query
    User.findOne({username:addName},(err,obj)=>{
        if(!err&&obj){
            User.findOne({username:ownName},(err,own)=>{
                User.updateOne({username:addName},{"$addToSet":{"friends":{username:own.username,sign:own.sign,_id:own._id}}},(err,obj)=>{
                    console.log(err,obj)
                })
                User.updateOne({username:ownName},{"$addToSet":{"friends":{username:obj.username,sign:obj.sign,_id:obj._id}}},(err,obj)=>{
                    User.findOne({username:ownName},(err,obj)=>{
                        res.json({code:0,data:obj})
                    })
                })
            })
        }else{
            res.json({code:-1,msg:err})
        }
    })
})
app.get('/user/remove',(req,res)=>{
    let {ownName,delName}=req.query
    User.findOne({username:delName},(err,obj)=>{
        if(!err&&obj){
            User.findOne({username:ownName},(err,own)=>{
                User.updateOne({username:addName},{$pull:{"friends":{username:own.username,sign:own.sign,_id:own._id}}},(err,obj)=>{
                    console.log(err,obj)
                })
                User.updateOne({username:ownName},{$pull:{"friends":{username:obj.username,sign:obj.sign,_id:obj._id}}},(err,obj)=>{
                    User.findOne({username:ownName},(err,obj)=>{
                        res.json({code:0,data:obj})
                    })
                })
            })
        }else{
            res.json({code:-1,msg:err})
        }
    })
})
app.post('/user/logup',(req,res)=>{
    let {username,password,sign,nickName}=req.body
    password=md5(password)
    new User({nickName,username,password,sign,friends:[]}).save((err,obj)=>{
        if(!err){
            res.json({code:0,data:obj})
        }else{
            res.json({code:-1,msg:err})
        }
    })
})
app.post('/user/login',(req,res)=>{
    const {username,password}=req.body
    User.findOne({username,password:md5(password)},(err,obj)=>{
        if(!err){
            if(!obj){
                res.json({code:-1,msg:'用户名或密码错误'})
            }else{
                res.json({code:0,data:obj})
            }
        }else{
            res.json({code:-1,msg:err})
        }
    })
})
app.get('/user/check',(req,res)=>{
    const {username}=req.query
    User.findOne({username},(err,obj)=>{
        if(!err){
            if(!obj){
                res.json({code:0,msg:'合法用户名'})
            }else{
                res.json({code:-1,msg:'用户名已存在'})
            }
        }else{
            res.json({code:-1,msg:err})
        }
    })
})
app.post('/user/update',(req,res)=>{
    const {_id,username,sign,nickName}=req.body
    User.findOne({_id},(err,obj)=>{
        if(!err){
            obj.username=username
            obj.sign=sign
            obj.nickName=nickName
            User.updateOne({username},obj,(err,r)=>{
                if(!err){
                    res.json({code:0,data:obj})
                }
            })
        }else{
            res.json({code:-1,msg:err})
        }
    })
})


app.listen(4000,()=>{
    console.log('OK')
})



