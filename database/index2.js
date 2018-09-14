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
    number_kudos_received: Number,
    kudos_received: Array,
    kudos_given: Array,
    number_warnings_received: Number,
    warnings_received: Array,
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
    //mentee_emails: Array
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
    User.find({ grade: theGrade }).sort({ number_kudos_received: -1 })
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

let getTopFiveMentors = (whenGotten) => {
    User.find({ level : 'mentor' }).sort({ number_kudos_received: -1 }).limit(5)
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting top five mentors : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getAllMentors = (whenGotten) => {
    User.find({ level : 'mentor' })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in getting mentors : ', err);
        } else {
            whenGotten(null, data);
        }
    })
}

let getMyMentees = ((mentorEmail, whenGotten) => {
    User.find({ my_mentor_email: mentorEmail })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in retrieving my mentees : ', err);
        } else {
            whenGotten(null, data);
        }
    })
})

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

let updateKudosReceived = (theEmail, newKudosReceivedObj, newCount) => {
    User.findOneAndUpdate({ email: theEmail }, { kudos_received: newKudosReceivedObj, number_kudos_received: newCount }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating kudos received : ', err);
        } else {
            console.log('Successfully updated kudos received');
        }
    })
}

let updateWarningsReceived = (theEmail, newWarningsReceivedObj, newCount) => {
    User.findOneAndUpdate({ email: theEmail }, { warnings_received: newWarningsReceivedObj, number_warnings_received: newCount }, { upsert: true }, (err, doc) => {
        if (err) {
            console.log('Database-side error in updating warnings received: ', err);
        } else {
            console.log('Successfully updated warnings received');
        }
    })
}

let updateMenteeInfo = (theEmail, newMenteeInfo) => {
    User.findOneAndUpdate({ email: theEmail }, 
        {   full_name: newMenteeInfo.full_name,
            sex: newMenteeInfo.sex,
            hometown: newMenteeInfo.hometown,
            school: newMenteeInfo.school,
            grade: newMenteeInfo.grade,
            email: newMenteeInfo.email,
            phone_number: newMenteeInfo.phone_number,
            parent1_name: newMenteeInfo.parent1_name,
            parent1_phone: newMenteeInfo.parent1_phone,
            parent1_email: newMenteeInfo.parent1_email,
            parent2_name: newMenteeInfo.parent2_name,
            parent2_phone: newMenteeInfo.parent2_phone,
            parent2_email: newMenteeInfo.parent2_email, 
        },
        { upsert: true},
        (err, doc) => {
            if (err) {
                console.log('Database-side error in updating mentee info: ', err);
            } else {
                console.log('Successfully updated mentee info');
            }
        })
}

let removeUser = (theEmail) => {
    User.remove({ email: theEmail })
    .exec((err, data) => {
        if (err) {
            console.log('Database-side error in deleting user : ', err);
        } else {
            console.log('Successfully deleted user');
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
    number_kudos_received: 2,
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
            message: "gifting me a useful book",
            email: "jonathanmarcelin28@gmail.com"
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        }
    ], 
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData2 = {
    full_name: 'Kony Pham', 
    sex: 'F', 
    email: 'kphammusic@gmail.com',
    hometown: 'Cali Baby', 
    grade: 'admin',
    school: 'St Anne',
    level: 'mentor',
    phone_number: '409-454-5188',
    majors: 'Music',
    undergraduate_school: 'University of Notre Dame',
    graduate_school: 'Baylor University',
    number_kudos_received: 2,
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
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData3 = {
    full_name: 'Corinne Joachim', 
    sex: 'F', 
    email: 'corinnejoachimsanon@gmail.com',
    school: 'Sacré Coeur', 
    level: 'mentor',
    grade: 'regular',
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
    number_kudos_received: 2,
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
    full_name: 'Jonathan Laguerre', 
    sex: 'M', 
    email: 'jonathan.n.laguerre@gmail.com',
    school: 'Saint-Louis de Gonzague', 
    level: 'mentor',
    grade: 'regular',
    phone_number: '639-354-5328',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'Pittsburgh',
    current_state: 'PA',
    current_country: 'USA',
    undergraduate_school: 'Stony Brook University',
    graduate_school: 'Wharton Business School',
    majors: 'Computer Science + MBA',
    employer: 'AT&T + ASKANYA',
    number_kudos_received: 4,
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
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
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


let sampleData5 = {
    full_name: 'Jean-Marie Lestrade', 
    sex: 'M', 
    email: 'lestradejeanmariejunior@yahoo.fr',
    school: 'Saint-Louis de Gonzague', 
    level: 'mentor',
    grade: 'regular',
    phone_number: '639-654-7828',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'Miami',
    current_state: 'FL',
    current_country: 'USA',
    undergraduate_school: 'USF',
    graduate_school: '',
    majors: 'Mechanical Engineering',
    employer: '',
    number_kudos_received: 1,
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
        }
    ]
}


let sampleData6 = {
    full_name: 'Medinah Lafaille', 
    sex: 'F', 
    email: 'medoulaf@gmail.com',
    school: 'Saint-Louis de Gonzague', 
    level: 'mentor',
    grade: 'regular',
    phone_number: '739-654-4228',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'Detroit',
    current_state: 'MI',
    current_country: 'USA',
    undergraduate_school: 'University of Michigan',
    graduate_school: '',
    majors: 'Chemical Engineering',
    employer: '',
    number_kudos_received: 2,
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
            name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "helping me buy chocolates :)",
            email: "jonathanmarcelin28@gmail.com"
        }
    ]
}


let sampleData7 = {
    full_name: 'Edner Paul', 
    sex: 'F', 
    email: 'ednerpaul@gmail.com',
    school: 'Ecole de St. Marc', 
    level: 'mentor',
    grade: 'regular',
    phone_number: '529-664-1321',
    facebook_page: 'https://www.facebook.com/corinne.joachimsanon',
    twitter_page: 'https://twitter.com/71390cff06894d2',
    linked_in_page: 'https://www.linkedin.com/in/corinne-js-symietz/',
    current_city: 'New York',
    current_state: 'NY',
    current_country: 'USA',
    undergraduate_school: 'MIT',
    graduate_school: '',
    majors: 'Mathematics',
    employer: 'JP Morgan Chase',
    number_kudos_received: 6,
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
            name: "Jonathan Marcelin",
            date: "09/02/2018",
            message: "helping me buy chocolates :)",
            email: "jonathanmarcelin28@gmail.com"
        },
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
        },
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
    ]
}

let sampleData8 = {
    full_name: 'Jean-Luc V.', 
    sex: 'F', 
    email: 'jpvertil@hotmail.com',
    school: 'SLG!', 
    level: 'mentor',
    grade: 'admin',
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
    number_kudos_received: 2,
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

let sampleData9 = {
    full_name: 'Jules Walter', 
    sex: 'M', 
    email: 'jules.walter@gmail.com',
    hometown: 'Gonaives', 
    school: 'Petit Seminaire', 
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
    number_kudos_received: 6,
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
        },
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
        },
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
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData10 = {
    full_name: 'Olivier Gabriel', 
    sex: 'M', 
    email: 'riveliog@gmail.com',
    hometown: 'Cap Haitian', 
    school: 'Jn Mary Guilloux', 
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
    number_kudos_received: 3,
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
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        }
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData11 = {
    full_name: 'Romie Desrogène', 
    sex: 'M', 
    email: 'romied@princeton.edu',
    hometown: 'Port-de-Paix', 
    school: 'St Rose', 
    grade: '3',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'jpvertil@hotmail.com',
    number_kudos_received: 2,
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
    ], 
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData12 = {
    full_name: 'Jules Walter', 
    sex: 'M', 
    email: 'jules.walter@gmail.com',
    hometown: 'Gonaives', 
    school: 'Petit Seminaire', 
    grade: '1',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'kphammusic@gmail.com',
    number_kudos_received: 6,
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
        },
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
        },
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
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData13 = {
    full_name: 'Olivier Gabriel', 
    sex: 'M', 
    email: 'riveliog@gmail.com',
    hometown: 'Cap Haitian', 
    school: 'Jn Mary Guilloux', 
    grade: '2',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'kphammusic@gmail.com',
    number_kudos_received: 3,
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
        },
        {
            name: "Jeffry Magloire",
            date: "09/05/2018",
            message: "helping me with a mock interview",
            email: "jonathanmarcelin28@gmail.com"
        }
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

let sampleData14 = {
    full_name: 'Romie Desrogène', 
    sex: 'M', 
    email: 'romied@princeton.edu',
    hometown: 'Port-de-Paix', 
    school: 'St Rose', 
    grade: 'T',
    level: 'mentee',
    phone_number: '409-454-5188',
    parent1_name: 'Kesnel',
    parent1_email: 'k@gmail.com',
    parent1_phone: '223-5133',
    parent2_name: 'Gina',
    parent2_email: 'g@gmail.com',
    parent2_phone: '444-4444',
    my_mentor_email: 'jpvertil@hotmail.com',
    number_kudos_received: 2,
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
    ],
    number_warnings_received: 1,
    warnings_received: [{
        issuer: 'Koneyy Phamm',
        date: '9/11/2018',
        warning: 'For consistently missing deadlines and showing no interest in the program'
    }]
}

// getMenteesByGrade('3', (err, result) => {
//     console.log(result);
// })

// getTopFiveMentors((err, result) => {
//     console.log(result);
// })

// getAllMentors((err, result) => {
//     console.log(result);
// })

//removeUser('ckdelmy@mit.edu');

// getMyMentees('jpvertil@hotmail.com', (err, result) => {
//     console.log(result);
// })

//  saveUser(sampleData);
//  saveUser(sampleData2);
//  saveUser(sampleData3);
//  saveUser(sampleData4);
//  saveUser(sampleData5);
//  saveUser(sampleData6);
//  saveUser(sampleData7);
//  saveUser(sampleData8);
//  saveUser(sampleData9);
//  saveUser(sampleData10);
//  saveUser(sampleData11);
//  saveUser(sampleData12);
//  saveUser(sampleData13);
//  saveUser(sampleData14);

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

// var newWarningReceived = 
// [
    // {
    //     issuer: 'Koneyy Phamm',
    //     date: '9/11/2018',
    //     warning: 'For consistently missing deadlines and showing no interest in the program'
    // },
    // {
    //     issuer: 'Jeffry Magloire',
    //     date: '9/11/2018',
    //     warning: 'For not submitting a practice SAT test on time'
    // }
// ];

// updateWarningsReceived('jvertil@nd.edu', newWarningReceived, 2);

let newMenteeInfo = {
    full_name: 'Juwan Bepo',
    sex: 'W',
    hometown: 'Texas',
    school: 'James Boy',
    grade: '3',
    email: 'jlbepo@gmail.com',
    phone_number: '222',
    parent1_name: 'Lurit Bepo',
    parent1_phone: '332',
    parent1_email: '@yahoo.bepo',
    parent2_name: 'Kenny',
    parent2_phone: '111',
    parent2_email: '@fr',
}

updateMenteeInfo('romied@princeton.edu', newMenteeInfo);

module.exports = {
    saveUser, 
    getUsers,
    getUserByEmail,
    getChecklist, 
    updateChecklist,
    updateKudosGiven,
    updateKudosReceived,
    getMenteesByGrade,
    getTopFiveMentors,
    getAllMentors, 
    removeUser,
    getMyMentees,
    updateWarningsReceived,
}