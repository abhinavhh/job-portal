import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Define subdocument interfaces
interface IEducation {
  collegeName: string;
  startYear: number;
  endYear: number;
  subjects: string[];
  achievements: string[];
}

interface IExperience {
  companyName: string;
  position: string;
  startYear: number;
  endYear: number;
  achievements: string[];
}

interface IUser {
  username: string;
  email: string;
  phone: string;
  password: string;
  role: 'Job Seeker' | 'Admin' | 'Employer';
  otp?: string;
  otpExpires?: Date;
  education?: IEducation[];
  experience?: IExperience[];
  skills?: string[];
}

// 2. Extend with instance methods
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
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 15,
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
      enum: ['Job Seeker', 'Admin', 'Employer'],
      default: 'Job Seeker',
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },

    // --- Profile-specific fields ---
    education: [
      {
        collegeName: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
        subjects: [{ type: String }],
        achievements: [{ type: String }],
      },
    ],
    experience: [
      {
        companyName: { type: String },
        position: { type: String },
        startYear: { type: Number },
        endYear: { type: Number },
        achievements: [{ type: String }],
      },
    ],
    skills: [{ type: String }],
  },
  { timestamps: true }
);

// 4. Password hashing middleware
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

// 5. Password comparison method
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

// 6. Model export
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', userSchema);
export default User;
