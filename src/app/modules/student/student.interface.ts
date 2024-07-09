import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fathersName: string
  fathersOccupation: string
  fathersContact: string
  mothersName: string
  mothersOccupation: string
  mothersContact: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNumber: string
  address: string
}

export type TStudent = {
  id: string
  password: string
  name: TUserName
  gender: 'Male' | 'Female' | 'Other'
  DateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
  isDeleted: boolean
}

//! creating static methods
export interface TStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

//! creating instance methods
/* export type TStudentMethods = {
  isUserExists(id: string): Promise<TStudent | null>
}
export type TStudentModel = Model<
  TStudent,
  Record<string, never>,
  TStudentMethods
> */
