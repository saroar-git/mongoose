import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({
  fathersName: { type: String, required: true },
  fathersOccupation: { type: String, required: true },
  fathersContact: { type: String, required: true },
  mothersName: { type: String, required: true },
  mothersOccupation: { type: String, required: true },
  mothersContact: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['Male', 'Female'],
  DateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'blocked'],
})

// model
export const StudentModel = model<Student>('Student', studentSchema)
