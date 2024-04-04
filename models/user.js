const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
},{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Create the modle user using userSchema
const User = model("User", userSchema);

module.exports = User