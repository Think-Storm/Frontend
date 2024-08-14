'use client'

import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { namePattern, emailPattern, passwordPattern } from '@/utils/validation'
import { useRegister } from './_hooks/useRegister'
import { pageRoutes } from '@/utils/apiRoutes'
import AuthForm from '@/components/form/AuthForm'
import Input from '@/components/common/input/Input'
import Flex from '@/components/common/layout/Flex'
import cx from '../cx'

const RegisterPage = () => {
  const router = useRouter()
  const { mutate, isPending } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (forms) => {
    const users = {
      username: forms.username,
      email: forms.email,
      password: forms.password,
    }

    mutate(users, {
      onSuccess: () => {
        alert('Registration successful!')
        router.push(pageRoutes.login)
      },
      onError: (error) => {
        console.error('Error registering user', error.message)
        alert('Registration failed. Please try again.')
      },
    })

    reset()
  }

  return (
    <AuthForm>
      <AuthForm.Header>Sign Up</AuthForm.Header>
      <AuthForm.Content>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          register={register}
          rules={namePattern}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          register={register}
          rules={emailPattern}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          register={register}
          rules={passwordPattern}
          errors={errors}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          rules={{
            ...passwordPattern,
            validate: {
              check: (value: string) => {
                if (value !== getValues('password')) {
                  return 'Passwords do not match.'
                }
              },
            },
          }}
          errors={errors}
        />
      </AuthForm.Content>
      <AuthForm.Footer
        text="Sign Up"
        onSubmit={handleSubmit(onSubmit)}
        disabled={isSubmitting || isPending}
      >
        <Flex.RowCenter className={cx('link')}>
          <span>Already have an account?</span>
          <Link href={pageRoutes.login} className={cx('link-text')}>
            Log In
          </Link>
        </Flex.RowCenter>
      </AuthForm.Footer>
    </AuthForm>
  )
}

export default RegisterPage
