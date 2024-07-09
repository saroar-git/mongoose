import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// will call controller function after endpoints
router.post('/create-student', StudentControllers.createStudent)
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)

export const StudentRoutes = router

//* interface --> modal --> services --> controller --> routes (developer)
//! client --> route --> controller --> services --> create into DB (user)
