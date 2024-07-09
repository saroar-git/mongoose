import Joi from 'joi'

const userNameJoiSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.base': 'First name should be a type of text',
      'string.empty': 'First name is required',
      'string.max': 'First name is too long',
      'string.pattern.name': '{#label} is not in capitalize format',
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Za-z]+$/, 'alpha')
    .messages({
      'string.base': 'Last name should be a type of text',
      'string.empty': 'Last name is required',
      'string.max': 'Last name is too long',
      'string.pattern.name': '{#label} is not in valid format',
    }),
})

const guardianJoiSchema = Joi.object({
  fathersName: Joi.string().trim().required().messages({
    'string.empty': "Father's name is required",
  }),
  fathersOccupation: Joi.string().trim().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fathersContact: Joi.string().trim().required().messages({
    'string.empty': "Father's contact number is required",
  }),
  mothersName: Joi.string().trim().required().messages({
    'string.empty': "Mother's name is required",
  }),
  mothersOccupation: Joi.string().trim().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  mothersContact: Joi.string().trim().required().messages({
    'string.empty': "Mother's contact number is required",
  }),
})

const localGuardianJoiSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Occupation is required',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'string.empty': 'Contact number is required',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': 'Address is required',
  }),
})

// main Joi schema
const studentJoiSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameJoiSchema.required(),
  gender: Joi.string()
    .trim()
    .required()
    .valid('Male', 'Female', 'Other')
    .messages({
      'any.only': '{#value} is not a valid input',
      'string.empty': 'Gender is required',
    }),
  DateOfBirth: Joi.string().trim().required().messages({
    'string.empty': 'Date of birth is required',
  }),
  email: Joi.string().trim().required().email().messages({
    'string.email': '{#value} is not in valid email format',
    'string.empty': 'Email is required',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNumber: Joi.string().trim().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .trim()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid input',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianJoiSchema.required(),
  localGuardian: localGuardianJoiSchema.required(),
  profileImage: Joi.string().allow(''),
  isActive: Joi.string()
    .trim()
    .default('active')
    .valid('active', 'blocked')
    .messages({
      'any.only': '{#value} is not a valid input',
    }),
})

export default studentJoiSchema
