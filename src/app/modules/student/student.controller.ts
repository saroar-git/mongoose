import { Request, Response } from 'express'
import { StudentServices } from './student.services'
// import studentJoiSchema from './student.joi.validation'
import studentZodSchema from './student.zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body

    // data validation using Joi
    //* const { error, value } = studentJoiSchema.validate(studentData)

    // data validation using zod
    const zodParseData = studentZodSchema.parse(studentData)

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData) //! pass value if use Joi, pass zodParseData if use zod, or default use studentData if use custom validations

    //! handle error by Joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong!',
    //     error: error.details,
    //   })
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    })
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
