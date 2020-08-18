/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const organizationSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(50)
    .messages({
      'string.min': 'Oops why is your name that short',
      'string.base': 'Name must be a String',
      'string.empty': 'Name cannot be left empty',
      'any.required': 'Name field is required'
    }),
  address: Joi.string()
    .required()
    .trim()
    .message({
      'string.base': 'Address must be a String',
      'string.empty': 'Address cannot be left empty',
      'any.required': 'Address field is required'
    }),
  state: Joi.string()
    .required()
    .trim()
    .message({
      'string.base': 'state must be a String',
      'string.empty': 'state cannot be left empty',
      'any.required': 'state field is required'
    }),
  country: Joi.string()
    .required()
    .trim()
    .message({
      'string.base': 'country must be a String',
      'string.empty': 'country cannot be left empty',
      'any.required': 'country field is required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'Please provide an email',
      'string.email': 'You need to provide a valid email address',
      'any.required': 'You need an email to be registered'
    }),
  phone_number: Joi.string()
    .required()
    .regex(new RegExp('^\\+[0-9]*$'))
    .messages({
      'string.empty': 'Please provide a phone number',
      'string.pattern.base': 'Wrong phone number format, use country code',
      'any.required': 'You need a phone number to be registered'
    }),
  password: Joi.string()
    .regex(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .min(6)
    .max(30)
    .messages({
      'string.empty': 'Please provide a password',
      'string.min': 'Oops your password is less than 6',
      'string.max': 'Oops password not more than 30 characters',
      'any.required': 'You need a password to be registered'
    })
});

export default organizationSchema;
