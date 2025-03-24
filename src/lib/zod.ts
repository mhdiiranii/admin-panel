import { object, string, z } from "zod"
 
export const signInSchema = object({
  email : string().email("ایمیل معتبر نیست").optional(),
  password: string()
    .min(8,'رمز عبور باید حداقل 8 کاراکتر باشد')
    .max(14 , 'رمز عبور باید حداکثر 14 باشد')
    .regex(/[A-Z]/,'رمز عبور باید یک حرف بزرگ داشته باشد')
    .regex(/[0-9]/,'رمز عبور باید یک عدد داشته باشد'),
})
export const signUpSchema = object({
  id:string().optional(),
  role:string(),
  username: string()
    .min(3,"نام باید بیشتر از 3 کاراکتر باشد")  
  ,
  password: string()
    .min(8,'رمز عبور باید حداقل 8 کاراکتر باشد')
    .max(14 , 'رمز عبور باید حداکثر 14 باشد')
    .regex(/[A-Z]/,'رمز عبور باید یک حرف بزرگ داشته باشد')
    .regex(/[0-9]/,'رمز عبور باید یک عدد داشته باشد'),
  email : string().email("ایمیل معتبر نیست").optional(),
})
export type SignInSchemaType = z.infer <typeof signInSchema>
export type SignUpSchemaType = z.infer <typeof signUpSchema>