import { NAME_PATTERN, EMAIL_PATTERN, PASSWORD_PATTERN } from './constants'

export const namePattern = {
  required:
    'Username must be 4-15 characters long and can contain letters, numbers, and underscores only.',
  minLength: {
    value: 4,
    message: 'Username must be at least 4 characters long.',
  },
  maxLength: {
    value: 15,
    message: 'Username cannot exceed 15 characters.',
  },
  pattern: {
    value: NAME_PATTERN,
    message:
      'Username must be 4-15 characters long and can contain letters, numbers, and underscores only.',
  },
}

export const emailPattern = {
  required: 'Enter a valid email address.',
  pattern: {
    value: EMAIL_PATTERN,
    message: 'Enter a valid email address.',
  },
}

export const passwordPattern = {
  required:
    'Password must be 8-16 characters and include an uppercase letter, a lowercase letter, a number, and a special character.',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters long.',
  },
  maxLength: {
    value: 16,
    message: 'Password cannot exceed 16 characters.',
  },
  pattern: {
    value: PASSWORD_PATTERN,
    message:
      'Password must be 8-16 characters and include an uppercase letter, a lowercase letter, a number, and a special character.',
  },
}
