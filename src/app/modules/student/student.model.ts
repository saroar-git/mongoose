import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'
// import validator from 'validator'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxLength: [20, 'First name is too long'],

    // custom validation
    /*  validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        return firstNameStr === value
      },
      message: '{VALUE} is not in capitalize format',
    }, */
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxLength: [20, 'Last name is too long'],

    // validator npm
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not in valid format',
    }, */
  },
})

const guardianSchema = new Schema<Guardian>({
  fathersName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fathersOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  fathersContact: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  mothersName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  mothersOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  mothersContact: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, trim: true, required: [true, 'Name is required'] },
  occupation: {
    type: String,
    trim: true,
    required: [true, 'Occupation is required'],
  },
  contactNumber: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required'],
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required'],
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String, trim: true, required: true, unique: true },
  name: { type: userNameSchema, required: true },
  gender: {
    type: String,
    trim: true,
    required: true,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: '{VALUE} is not a valid input',
    },
  },
  DateOfBirth: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  contactNumber: { type: String, trim: true, required: true },
  emergencyContactNumber: { type: String, trim: true, required: true },
  bloodGroup: {
    type: String,
    trim: true,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: '{VALUE} is not a valid input',
    },
  },
  presentAddress: { type: String, trim: true, required: true },
  permanentAddress: { type: String, trim: true, required: true },
  guardian: { type: guardianSchema, required: true },
  localGuardian: { type: localGuardianSchema, required: true },
  profileImage: { type: String },
  isActive: {
    type: String,
    trim: true,
    default: 'active',
    enum: {
      values: ['active', 'blocked'],
      message: '{VALUE} is not a valid input',
    },
  },
})

// model
export const StudentModel = model<Student>('Student', studentSchema)
