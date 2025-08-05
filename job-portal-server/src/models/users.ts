import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define user properties (excluding methods)
interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'User' | 'Admin';
}

// 2. Extend with instance methods like `comparePassword`
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 3. Schema definition
const userSchema: Schema<IUserDocument> = new mongoose.Schema<IUserDocument>(
  {
    username: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      minLength: 3,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      match: /.+\@.+\..+/,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
  },
  { timestamps: true }
);

// 4. Pre-save middleware to hash password
userSchema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    console.error('Error hashing password:', err);
    next(err as Error);
  }
});

// 5. Instance method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    console.error('Error comparing password:', err);
    return false;
  }
};

// 6. Create and export the model
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);
export default User;
