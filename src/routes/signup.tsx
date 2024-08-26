import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { LoginGlyph, Logo } from '../assets/images'
import { Input } from '@/components/formElements/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import axios from '@/lib/axios'
import { Oval } from 'react-loader-spinner'

interface formInput {
  username: string
  email: string
  password: string
}

export const Route = createFileRoute('/signup')({
  component: Signup
})

function Signup() {
  const [,] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm<formInput>();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: (data: formInput) => axios.post('/auth/signup/', data),
    onSuccess: () => {
      navigate({ to: "/login" })
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  return (
    <section className='relative w-full h-full flex items-center justify-center'>
      <img src={LoginGlyph} className='absolute top-0 left-0 w-full h-full object-cover z-0' alt='login' />
      <div className='absolute top-0 left-0 w-full h-full bg-[#15151599] z-10'></div>
      <div className="max-w-[1280px] w-full flex flex-row items-center justify-between px-32 z-20">
        <div className='flex flex-col gap-2 w-[380px]'>
          <img src={Logo} alt="" className="w-[380px] h-auto" />
          <p className='text-lg text-white font-medium'>
            Detect lung cancer at its earliest stages with unparalleled precision and accuracy, saving critical time in diagnosis
          </p>
        </div>
        <form onSubmit={handleSubmit((data) => mutate(data))} className='bg-white flex flex-col gap-4 w-[500px] rounded-xl px-16 py-16'>
          <h1 className='text-4xl'>Sign Up</h1>
          <div className="flex flex-col gap-2">
            <div>
              <Input label='Email' type='email' {...register("email", { required: true })}/>
            </div>
            <div>
              <Input label='Username' {...register("username", { required: true })}/>
            </div>
            <div>
              <Input label='Password' type='password' {...register("password", { required: true })} />
            </div>
          </div>
          <button className='h-12 w-full rounded-md bg-[#3360FF] hover:bg-[hsl(227,71%,56%)] text-white'>
          {isPending ? (
              <Oval
              width={28}
              color="#fff"
              secondaryColor="#ffffff84"
              strokeWidth={3}
            />
            ): "SIGN UP" }
          </button>
          <div className="flex flex-col items-center gap-3">
            <p>Forgot Password?</p>
            <Link to='/login'>Already have an account? <span className='font-semibold'>Sign In</span></Link>
          </div>
        </form>
      </div>
    </section>
  )
}
