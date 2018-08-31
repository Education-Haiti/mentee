const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/mentees', { // mentees is the name of the database
    useNewUrlParser: true,
});

console.log('Connected to Mongoose (mentee)');

let menteeSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    sex: String, 
    email: String,
    hometown: String,
    school: String,
    phone_number: String,
    parent1_name: String, 
    parent1_phone: String, 
    parent1_email: String, 
    parent2_name: String, 
    parent2_phone: String, 
    parent2_email: String
});

let Mentee = mongoose.model('Mentee', menteeSchema); // Mentee is the collection

let saveMentee = (inputObj) => {
    var mentee = new Mentee(inputObj);

    mentee.save((err, res) => {
        if (err) {
            console.log('Database-side error is saving mentee : ', err);
        } else {
            console.log('Saved'); 
        }
    })
}

let getMentees = (whenGotten) => {
    Mentee.find()
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting mentees : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getMenteeByEmail = (theEmail, whenGotten) => {
    Mentee.find({email: theEmail})
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting mentee : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let sampleData = {
    first_name: 'JP', 
    last_name: 'Vertil', 
    sex: 'M', 
    email: 'jpvertil@hotmail.com',
    hometown: 'Charlottesville', 
    school: 'SLG', 
    phone_number: '409-454-5188'
}

let sampleData2 = {
    first_name: 'JP', 
    last_name: 'Vertil', 
    sex: 'M', 
    email: 'jpvertil@hotmail.com',
    hometown: 'Charlottesville', 
    school: 'SLG', 
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444'
}


//saveMentee(sampleData);
//saveMentee(sampleData2);

// getMentees((err, result) => {
//     console.log(result);
// })

getMenteeByEmail('jluc.vertil@gmail.com', (err, result) => {
    console.log(result);
})

module.exports = {
    saveMentee, 
    getMentees
}