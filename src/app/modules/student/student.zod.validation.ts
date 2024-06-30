import { z } from 'zod'

const capitalizedString = z
  .string()
  .max(20, { message: '{VALUE} is too long' })
  .refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message: '{VALUE} is not in capitalize format',
  })

// UserName schema
const userZodNameSchema = z.object({
  firstName: capitalizedString,
  middleName: z
    .string()
    .max(20, { message: 'Middle name is too long' })
    .optional(),
  lastName: z
    .string()
    .max(20, { message: 'Last name is too long' })
    .regex(/^[A-Za-z]+$/, { message: 'Last name is not in valid format' }),
})

// Guardian schema
const guardianZodSchema = z.object({
  fathersName: z.string().nonempty("Father's name is required"),
  fathersOccupation: z.string().nonempty("Father's occupation is required"),
  fathersContact: z.string().nonempty("Father's contact number is required"),
  mothersName: z.string().nonempty("Mother's name is required"),
  mothersOccupation: z.string().nonempty("Mother's occupation is required"),
  mothersContact: z.string().nonempty("Mother's contact number is required"),
})

// LocalGuardian schema
const localGuardianZodSchema = z.object({
  name: z.string().nonempty('Name is required'),
  occupation: z.string().nonempty('Occupation is required'),
  contactNumber: z.string().nonempty('Contact number is required'),
  address: z.string().nonempty('Address is required'),
})

// Main schema
const studentZodSchema = z.object({
  id: z.string().nonempty('ID is required'),
  name: userZodNameSchema,
  gender: z.enum(['Male', 'Female', 'Other'], {
    message: '{VALUE} is not a valid input',
  }),
  DateOfBirth: z.string().nonempty('Date of birth is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Email is not in valid format'),
  contactNumber: z.string().nonempty('Contact number is required'),
  emergencyContactNumber: z
    .string()
    .nonempty('Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      message: '{VALUE} is not a valid input',
    })
    .optional(),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  guardian: guardianZodSchema,
  localGuardian: localGuardianZodSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
})

export default studentZodSchema
