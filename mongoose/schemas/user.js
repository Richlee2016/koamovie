const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

let UserSchema = new mongoose.Schema({
    username: {
        unique: true,
        type: String
    },
    password: String,
    createTime: {
        type: Date,
        default: Date.now()
    }
})

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) next(err);
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods = {
    comparePassword(password) {
        let user = this;
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, function(err, isMatch) {
                if (err) reject(err);
                resolve(isMatch);
            })
        });
    }
}


UserSchema.statics = {

}

module.exports = UserSchema;