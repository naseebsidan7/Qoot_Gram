import { z } from "zod"


export const SignupValidationSchema = z.object({
    userName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    name: z.string().min(2,{ message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8,{ message: 'Password must be at least 8 characters.'}),
    
  })

  export const SigninValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8,{ message: 'Password must be at least 8 characters.'}),
    
  })


  export const PostValidationSchema = z.object({
      caption: z.string().min(5).max(2200),
      file: z.custom<File[]>(),
      location: z.string().min(2).max(100),
      tags: z.string()
  })

  export const ProfileValidation = z.object({
    name: z.string().min(2, { message: "Minimum 5 characters." }),
    file: z.custom<File[]>(),
    userName: z.string().min(2,{ message: "Name must be at least 2 characters."}),
    email: z.string().email(),
    bio: z.string()
  })