import { Request, Response } from 'express'
import { StudentServices } from './student.services'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData)

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)
    res.status(200).json({
      success: true,
      message: 'Student is retrieve successfully',
      data: result,
    })
  } catch (err) {
    console.error(err)
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
