import { object, ref, string } from "yup";


export const LoginSchema = object().shape({
  emailOrUsername: string()
    .required('Email or username is required')
    .min(3, 'Email or username must be at least 3 characters'),
  password: string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters'),
});

export const RegisterSchema = object().shape({
  name: string().required("Name is required"),
  email: string()
    .email("This field must be an email")
    .required("Email is required"),
  password: string().required("Password is required"),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export const TemplateSchema = object().shape({
  name: string().required("Name is required"),
  content: string()
    .required("Content is required"),
  userId: string()
});

export const ConfigurationSchema = object().shape({
  key: string().required("Key is required"),
  value: string()
    .required("Value is required")
});

export const webhookSchema = object().shape({
  name: string().required("Name is required"),
  description: string()
    .required("Description is required")
});

export const mappingSchema = object().shape({});