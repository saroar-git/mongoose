import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (studentData: TStudent) => {
  //! create an instance method
  /* const student = new StudentModel(studentData)
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists')
  }
  const result = await student.save() // builtin instance method */

  //! create a static method
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists')
  }
  const result = await StudentModel.create(studentData) // builtin static method
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
}
