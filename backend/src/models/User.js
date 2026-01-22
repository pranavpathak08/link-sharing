import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    photo: {
        type: Buffer
    },

    admin: {
        type: Boolean,
        default: true
    },

    active: {
        type: Boolean,
        default: true
    },
    
},
    {
        timestamps: {
            createdAt: 'dateCreated',
            updatedAt: 'lastUpdated'
        }
    }
);

//Hashing the password before saving it
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

//Password comparison
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);

}

const User = mongoose.model('User', userSchema);

export default User;

