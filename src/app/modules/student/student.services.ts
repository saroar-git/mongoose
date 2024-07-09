import { TStudent } from './student.interface'
import { StudentModel } from './student.model'

//* create a new Student
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

//* get all Students
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
  return result
}

//* get a single Student
const getSingleStudentFromDB = async (id: string) => {
  //* get data by aggregation
  // const result = await StudentModel.aggregate([{ $match: { id: id } }])
  const result = await StudentModel.findOne({ id })
  return result
}

//* update a Student
const updateStudentFromDB = async (id: string, studentData: TStudent) => {
  const result = await StudentModel.findByIdAndUpdate(id, studentData)
  return result
}

//* delete a Student
const deleteStudentFromDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
}
