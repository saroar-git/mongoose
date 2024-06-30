export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type Guardian = {
  fathersName: string
  fathersOccupation: string
  fathersContact: string
  mothersName: string
  mothersOccupation: string
  mothersContact: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNumber: string
  address: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'Male' | 'Female' | 'Other'
  DateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage?: string
  isActive: 'active' | 'blocked'
}
