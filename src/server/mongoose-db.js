const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/awesomProject',{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open',()=>{
    console.log('database OK')
})
let schema=new mongoose.Schema({
    username:String,
    password:String,
    sign:String,
    friends:Array,
    nickName:String
})
let schema2=new mongoose.Schema({
    from:String,
    to:String,
    message:String,
    date:Number,
    isRead:Boolean,
    chat_id:String
})
let Chat=mongoose.model('chat',schema2)
let User=mongoose.model('user',schema)
module.exports={User,Chat}