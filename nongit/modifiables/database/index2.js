const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://mongodatabase:27017/users', { // users is the name of the database. use localhost instead of mongodatabase when not dockerizing
    useNewUrlParser: true,   
}).catch(err => {
    console.log('Error in connecting with mongoose !!: ', err);
});

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }

const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect("mongodb://mongodatabase:27017/users", options).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}

connectWithRetry();

console.log('Connected to Mongoose (user)');

let userSchema = mongoose.Schema({
    //id: { type : Number , unique : true, dropDups: true  }, // drop duplicates if a given piece of data is being passed in more than once
    full_name: String,
    sex: String, 
    email: { type: String, unique : true, dropDups: true}, // drop duplicates if a given piece of data is being passed in more than once
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

let updateMentorInfo = (theEmail, newMentorInfo) => {
    User.findOneAndUpdate({ email: theEmail }, 
        {   
            full_name: newMentorInfo.full_name,
            sex: newMentorInfo.sex,
            current_city: newMentorInfo.current_city,
            school: newMentorInfo.school,
            email: newMentorInfo.email,
            phone_number: newMentorInfo.phone_number,
            current_state: newMentorInfo.current_state,
            current_country: newMentorInfo.current_country,
            undergraduate_school: newMentorInfo.undergraduate_school,
            graduate_school: newMentorInfo.graduate_school,
            majors: newMentorInfo.majors,
            employer: newMentorInfo.employer,
            linked_in_page: newMentorInfo.linked_in_page,
            facebook_page: newMentorInfo.facebook_page,
            twitter_page: newMentorInfo.twitter_page    
        },
        { upsert: true},
        (err, doc) => {
            if (err) {
                console.log('Database-side error in updating mentor info: ', err);
            } else {
                console.log('Successfully updated mentor info');
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
    full_name: 'Superuser', 
    sex: 'M', 
    email: 'vertil.jp@gmail.com',
    school: 'Saint-Louis de Gonzague', 
    level: 'mentor',
    grade: 'admin',
    phone_number: '409-454-5188',
    facebook_page: '',
    twitter_page: '',
    linked_in_page: '',
    current_city: '',
    current_state: 'VA',
    current_country: 'USA',
    undergraduate_school: '',
    graduate_school: '',
    majors: '',
    employer: '',
    number_kudos_received: 1,
    checklist: {
        "MLT": true,
        "Haiti": false, 
        "Sigora": true,
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
            name: "Kony Pham",
            date: "09/02/2018",
            message: "Helping me with a mock interview",
            email: "kphammusic@gmail.com"
        },
        
    ]
}

saveUser(sampleData);

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
    updateMenteeInfo, 
    updateMentorInfo
}