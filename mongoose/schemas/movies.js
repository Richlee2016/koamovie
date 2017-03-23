const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    doctor: String,
    title: String,
    language: String,
    country: String,
    summary: String,
    flash: String,
    poster: String,
    year: Number,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
});

MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
})

MovieSchema.statics = {
    fetch() {
        return this.find({}).sort('meta.updateAt');
    },
    findById(id) {
        return new Promise((resolve, reject) => {
            this.findOne({ _id: id }, function(err, movie) {
                if (err) {
                    reject(err)
                };
                resolve(movie);
            })
        });
    }
};

module.exports = MovieSchema;