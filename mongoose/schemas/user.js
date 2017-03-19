var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
    userName:String,
    passWord:String,
    createTime:{
        type:Date,
        default:Date.now()
    }
})

UserSchema.pre('save', function(next){
    console.log('保存');
    next();
})

UserSchema.statics = {
    fetch (){
            return this.find({});
    },
    findById (id){
            return this.findOne({_id: id});
    }
}

module.exports = UserSchema;