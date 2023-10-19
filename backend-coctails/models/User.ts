import {HydratedDocument, Model, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import {IUser} from '../types';
import {randomUUID} from 'crypto';

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
    checkPassword(password: string): Promise<boolean>;

    generateToken(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (
                this: HydratedDocument<IUser>,
                email: string,
            ): Promise<boolean> {
                if (!this.isModified('email')) return true;
                const usersEmail: HydratedDocument<IUser> | null = await User.findOne({email});
                return !Boolean(usersEmail);
            },
            message: 'This user is already registered',
        },
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    googleID: String,
    avatar: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;