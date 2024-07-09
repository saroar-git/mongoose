import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  // TStudentMethods,
  TStudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
import config from '../../config'
// import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    minLength: [3, 'Minimum 3 characters'],
    maxLength: [20, 'First name is too long'],

    //! custom validation
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        return firstNameStr === value
      },
      message: '{VALUE} must be in capitalize format',
    },
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

    //! validator npm
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not in valid format',
    }, */
  },
})

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
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

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    // pass (, TStudentMethods) for instance methods
    id: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, 'At least 6 character'],
      maxLength: [15, 'Not more than 15 character'],
      required: [true, 'Password is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      trim: true,
      required: [true, 'Gender is required'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid input',
      },
    },
    DateOfBirth: {
      type: String,
      trim: true,
      required: [true, 'Date of Birth is required'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Email is required'],
    },
    contactNumber: {
      type: String,
      trim: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNumber: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      trim: true,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid input',
      },
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian info is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian info is required'],
    },
    profileImage: {
      type: String,
    },
    isActive: {
      type: String,
      trim: true,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid input',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
)

//* virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

//* pre save middleware/hook: will work on create() or save()
studentSchema.pre('save', async function (next) {
  // hash the password before saving (this --> the current document)
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

//* post save middleware/hook: if data saved successfully, we'll get the updated doc
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

//* pre query middleware/hook: get data without
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

//* pre query middleware/hook: hide deleted document
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

//* pre query middleware/hook: hide deleted document for aggregate
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//* creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id })
  return existingUser
}

//! creating a custom instance method
/* studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id })
  return existingUser
}
*/

// student model
export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
)
