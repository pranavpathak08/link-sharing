import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'


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

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire: {
        type: Date
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
        default: false
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
userSchema.pre('save', async function () {
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})

//Password comparison
userSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);

}

//Reset Logic
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

}

const User = mongoose.model('User', userSchema);

export default User;

