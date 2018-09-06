const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/users', { // users is the name of the database
    useNewUrlParser: true,
});

console.log('Connected to Mongoose (user)');

let userSchema = mongoose.Schema({
    full_name: String,
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

let User = mongoose.model('User', userSchema); // Mentee is the collection

let saveUser = (inputObj) => {
    var user = new User(inputObj);

    user.save((err, res) => {
        if (err) {
            console.log('Database-side error is saving user : ', err);
        } else {
            console.log('Saved'); 
        }
    })
}

let getUsers = (whenGotten) => {
    User.find()
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting users : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getUserByEmail = (theEmail, whenGotten) => {
    User.find({ email: theEmail })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting user : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getMenteesByGrade = (theGrade, whenGotten) => {
    User.find({ grade: theGrade })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting mentees basesed on grade: ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getChecklist = (theEmail, whenGotten) => {
    User.find({ email: theEmail }, { checklist:1 })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting checklist : ', err);
        } else {
            whenGotten(null, data)
        }
    })
}

let updateChecklist = (theEmail, newChecklist) => {
    User.findOneAndUpdate({ email: theEmail }, { checklist: newChecklist }, {upsert: true}, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating the checklist : ', err);
        } else {
            console.log('Successfully updated checklist')
        }
    })
}

let updateKudosGiven = (theEmail, newKuddosGivenObj) => {
    User.findOneAndUpdate({ email: theEmail }, { kudos_given: newKuddosGivenObj }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating  kudos given : ', err);
        } else {
            console.log('Successfully updated kudos given');
        }
    })
}

let updateKudosReceived = (theEmail, newKudosReceivedObj) => {
    User.findOneAndUpdate({ email: theEmail }, { kudos_received: newKudosReceivedObj }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating kudos received : ', err);
        } else {
            console.log('Successfully updated kudos received')
        }
    })
}

let sampleData = {
    full_name: 'Jean-Pierre', 
    sex: 'M', 
    email: 'jvertil@nd.edu',
    hometown: 'Port-au-Prince', 
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
    full_name: 'Kony Pham', 
    sex: 'F', 
    email: 'kphammusic@gmail.com',
    hometown: 'Cali Baby', 
    grade: '3',
    level: 'mentor',
    phone_number: '409-454-5188',
    majors: 'Music',
    undergraduate_school: 'University of Notre Dame',
    graduate_school: 'Baylor University',
    kudos_given: [
        {
            name: "Kony Pham",
            date: "09/03/2018",
            message: "helping me review my resume",
            email: "kphammusic@gmail.com"
        },

        {
            name: "Christina Bastien",
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
    full_name: 'Corinne Joachim', 
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

let sampleData4 = {
    full_name: 'Jean-Luc V.', 
    sex: 'F', 
    email: 'jpvertil@hotmail.com',
    school: 'SLG!', 
    level: 'admin',
    phone_number: '469-454-5328',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'New York',
    current_state: 'NY',
    current_country: 'USA',
    undergraduate_school: 'University of Michigan',
    graduate_school: 'Stanford GSB',
    majors: 'EE + Econ + MBA',
    employer: 'Sigora Group',
    mentee_emails: ['kphammusic@gmail.com'],
    checklist: {
        "MLT": true,
        "Haiti": false, 
        "MIT": true,
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

let sampleData5 = {
    full_name: 'Jules Walter', 
    sex: 'M', 
    email: 'jules.walter@gmail.com',
    hometown: 'Gonaives', 
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

let sampleData6 = {
    full_name: 'Olivier Gabriel', 
    sex: 'M', 
    email: 'riveliog@gmail.com',
    hometown: 'Cap Haitian', 
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

let sampleData7 = {
    full_name: 'Romie Desrogène', 
    sex: 'M', 
    email: 'romied@princeton.edu',
    hometown: 'Port-de-Paix', 
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

// getMenteesByGrade('3', (err, result) => {
//     console.log(result);
// })

//  saveUser(sampleData);
//  saveUser(sampleData2);
//  saveUser(sampleData3);
//  saveUser(sampleData4);
//  saveUser(sampleData5);
//  saveUser(sampleData6);
//  saveUser(sampleData7);

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
    saveUser, 
    getUsers,
    getUserByEmail,
    getChecklist, 
    updateChecklist,
    updateKudosGiven,
    updateKudosReceived,
    getMenteesByGrade,
}