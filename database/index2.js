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
    grade: String,
    level: String,
    phone_number: String,
    parent1_name: String, 
    parent1_phone: String, 
    parent1_email: String, 
    parent2_name: String, 
    parent2_phone: String, 
    parent2_email: String,
    my_mentor_email: String,
    checklist: Object,
    kudos_given: Array,
    kudos_received: Array,
    // the following are only for mentors
    facebook_page: String,
    twitter_page: String,
    linked_in_page: String,
    current_city: String,
    current_state: String, 
    current_country: String,
    undergraduate_school: String,
    graduate_school: String,
    majors: String,
    employer: String,
    mentee_emails: Array
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
            console.log('Database-side error in updating the checklist : ', err);
        } else {
            console.log('Successfully updated checklist')
        }
    })
}

let updateKudosGiven = (theEmail, newKuddosGivenObj) => {
    Mentee.findOneAndUpdate({ email: theEmail }, { kudos_given: newKuddosGivenObj }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating  kudos given : ', err);
        } else {
            console.log('Successfully updated kudos given');
        }
    })
}

let updateKudosReceived = (theEmail, newKudosReceivedObj) => {
    Mentee.findOneAndUpdate({ email: theEmail }, { kudos_received: newKudosReceivedObj }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating kudos received : ', err);
        } else {
            console.log('Successfully updated kudos received')
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
    grade: '3',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'kphammusic@gmail.com',
    checklist: {
        "SAT": true,
        "TOEFL": false, 
        "ND": true,
    },
    kudos_given: [
        {
            name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            email: "kphammusic@gmail.com"
        },

        {
            name: "Christina Bastion",
            date: "09/01/2018",
            message: "helping me design an assignment for my mentee",
            email: "christiti14@gmail.com"
        } 
    ],
    kudos_received: [
        {
            name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "gifting me a useful book",
            email: "jonathanmarcelin28@gmail.com"
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        }
    ]
}

let sampleData2 = {
    first_name: 'Kony', 
    last_name: 'Pham', 
    sex: 'F', 
    email: 'kphammusic@gmail.com',
    hometown: 'Cali Baby', 
    school: 'ND', 
    grade: '3',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Mario',
    parent1_email: 'm@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Preta',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'corinnejoachimsanon@gmail.com',
    checklist: {
        "GMAT": true,
        "MIT": false, 
        "UPENN": true,
    },
    kudos_given: [
        {
            name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            email: "kphammusic@gmail.com"
        },

        {
            name: "Christina Bastion",
            date: "09/01/2018",
            message: "helping me design an assignment for my mentee",
            email: "christiti14@gmail.com"
        } 
    ],
    kudos_received: [
        {
            name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        }
    ]
}

let sampleData3 = {
    first_name: 'Corinne', 
    last_name: 'Sanon', 
    sex: 'F', 
    email: 'corinnejoachimsanon@gmail.com',
    school: 'Sacré Coeur', 
    level: 'mentor',
    phone_number: '469-454-5328',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'New York',
    current_state: 'NY',
    current_country: 'USA',
    undergraduate_school: 'University of Michigan',
    graduate_school: 'Wharton Business School',
    majors: 'Industrial Engineering + MBA',
    employer: 'AT&T + ASKANYA',
    mentee_emails: ['kphammusic@gmail.com'],
    checklist: {
        "Askanya": true,
        "Haiti": false, 
        "Chocolates": true,
    },
    kudos_given: [
        {
            name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            email: "kphammusic@gmail.com"
        },

        {
            name: "Christina Bastion",
            date: "09/01/2018",
            message: "helping me design an assignment for my mentee",
            email: "christiti14@gmail.com"
        } 
    ],
    kudos_received: [
        {
            name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "helping me buy chocolates :)",
            email: "jonathanmarcelin28@gmail.com"
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
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

// var newKuddosGiven = 
//     [
//         {
//             name: "Kony Pham",
//             date: "09/03/2018",
//             message: "helping me review my resume",
//             email: "kphammusic@gmail.com"
//         },

//         {
//             name: "Christina Bastion",
//             date: "09/01/2018",
//             message: "helping me design an assignment for my mentee",
//             email: "christiti14@gmail.com"
//         },
//         {
//             name: "Jules Walter",
//             date: "09/03/2018",
//             message: "helping me review my essays",
//             email: "jules.walter@gmail.com"
//         }
//     ]

    //updateKudosGiven('jvertil@nd.edu', newKuddosGiven);

// var newKuddosReceived = 
// [
//     {
//         name: "Jonathan Marcelin",
//         date: "09/02/2018",
//         message: "helping me with a mock interview",
//         email: "jonathanmarcelin28@gmail.com"
//     },
//     {
//         name: "Jeffry Magloire",
//         date: "09/05/2018",
//         message: "helping me with a mock interview",
//         email: "jonathanmarcelin28@gmail.com"
//     }, 
//     {
//         name: "Corinne Joachim Sanon",
//         date: "09/04/2018",
//         message: "introducing me to a new customer",
//         email: "corinnejoachimsanon@gmail.com"
//     }
// ]

//updateKudosReceived('jvertil@nd.edu', newKuddosReceived);

module.exports = {
    saveMentee, 
    getMentees,
    getMenteeByEmail,
    getChecklist, 
    updateChecklist,
    updateKudosGiven,
    updateKudosReceived
}