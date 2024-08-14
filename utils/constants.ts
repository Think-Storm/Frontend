export const NAME_PATTERN = /^[A-Za-z0-9_]{4,15}$/

export const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

export const PASSWORD_PATTERN =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|=,.<>/?~-]).{8,16}$/
