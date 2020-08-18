/* eslint-disable no-useless-escape */
import Joi from '@hapi/joi';

const userSchema = Joi.object({
  first_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(30)
    .regex(new RegExp('^[a-zA-Z]+$'))
    .messages({
      'string.min': 'Oops why is your firstname that short',
      'string.base': 'First name must be a String',
      'string.empty': 'First name cannot be left empty',
      'string.pattern.base': 'first_name must consist of letters only',
      'any.required': 'First name field is required'
    }),
  last_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(30)
    .regex(new RegExp('^[a-zA-Z\-]+$'))
    .message({
      'string.min': 'Oops why is your lastname that short',
      'string.base': 'Last name must be a String',
      'string.empty': 'Last name cannot be left empty',
      'string.pattern.base': 'Last name must consist of letters only',
      'any.required': 'Last name field is required'
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

export default userSchema;
