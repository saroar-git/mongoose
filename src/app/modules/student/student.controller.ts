import { Request, Response } from 'express'
import { StudentServices } from './student.services'
import studentZodSchema from './student.zod.validation'
// import studentJoiSchema from './student.joi.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    //! data validation using Joi
    // const { error, value } = studentJoiSchema.validate(studentData)

    // data validation using zod
    const zodParseData = studentZodSchema.parse(studentData)

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData) // pass `value` if use Joi, pass `zodParseData` if use zod, or default use `studentData` if use custom validations

    //! handle error by Joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   })
    // }

    // success response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    // success response
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    // success response
    res.status(200).json({
      success: true,
      message: 'Student is retrieve successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const updateData = req.body

    // validation and update student data
    const parsedStudentData = studentZodSchema.parse(updateData)
    const result = await StudentServices.updateStudentFromDB(
      studentId,
      parsedStudentData,
    )

    // success response
    res.status(200).json({
      success: true,
      message: 'Student data updated successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentFromDB(studentId)

    // success response
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      data: error,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
