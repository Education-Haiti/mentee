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
    parent2_email: String,
    checklist: Object,
    kudos_given: Array,
    kudos_received: Array
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
    Mentee.find({ email: theEmail })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting mentee : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getChecklist = (theEmail, whenGotten) => {
    Mentee.find({ email: theEmail }, { checklist:1 })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting checklist : ', err);
        } else {
            whenGotten(null, data)
        }
    })
}

let updateChecklist = (theEmail, newChecklist) => {
    Mentee.findOneAndUpdate({ email: theEmail }, { checklist: newChecklist }, {upsert: true}, (err, doc) => {
        if (err) {
            console.log('Error updating the checklist : ', err);
        } else {
            console.log('Successfully updated checklist')
        }
    })
}

let updateKudosGiven = (theEmail, newKuddosGivenObj) => {
    Mentee.findOneAndUpdate({ email: theEmail }, { kudos_given: newKuddosGivenObj }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Error updating the kudos given object : ', err);
        } else {
            console.log('Successfully updated kudos given');
        }
    })
}

let sampleData = {
    first_name: 'Jean-Pierre', 
    last_name: 'Vertil', 
    sex: 'M', 
    email: 'jvertil@nd.edu',
    hometown: 'Charlottesville', 
    school: 'SLG', 
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    checklist: {
        "SAT": true,
        "TOEFL": false, 
        "ND": true,
        "Petion": false,
        "Dessanlines": true,
        "Toussaint": false, 
        "Gonaives": true,
        "Catherine Flow": false,
        "Mais": true,
        "Moulen": false
    },
    kudos_given: [
        {
            receiver_name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            receiver_email: "kphammusic@gmail.com"
        },

        {
            receiver_name: "Christina Bastion",
            date: "09/01/2018",
            message: "helping me design an assignment for my mentee",
            receiver_email: "christiti14@gmail.com"
        } 
    ],
    kudos_received: [
        {
            sender_name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "helping me with a mock interview",
            sender_email: "jonathanmarcelin28@gmail.com"
        },
        {
            sender_name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            sender_email: "jonathanmarcelin28@gmail.com"
        }
    ]
}


//saveMentee(sampleData);
//saveMentee(sampleData2);

//  getMentees((err, result) => {
//      console.log(result);
//  })

// getMenteeByEmail('jvertil@nd.edu', (err, result) => {
//     console.log(result);
// })

// getChecklist('jvertil@nd.edu', (err, result) => {
//     console.log(result);
// })

// var newChecklist = {
//     "SAT": true,
//     "GMAT": false,
// }

// updateChecklist('kphammusic@gmail.com', newChecklist);

var newKuddosGiven = 
    [
        {
            receiver_name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            receiver_email: "kphammusic@gmail.com"
        },

        {
            receiver_name: "Christina Bastion",
            date: "09/01/2018",
            message: "helping me design an assignment for my mentee",
            receiver_email: "christiti14@gmail.com"
        },
        {
            receiver_name: "Jules Walter",
            date: "09/03/2018",
            message: "helping me review my essays",
            receiver_email: "jules.walter@gmail.com"
        }
    ]

    //updateKudosGiven('jvertil@nd.edu', newKuddosGiven);

module.exports = {
    saveMentee, 
    getMentees,
    getMenteeByEmail,
    getChecklist, 
    updateChecklist

}