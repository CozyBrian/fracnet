import { LoginGlyph, Logo } from '@/assets/images'
import { Input } from '@/components/formElements/input'
import axios from '@/lib/axios';
import { useAuthContext } from '@/providers/auth';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, Link, redirect, useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Oval } from 'react-loader-spinner';
import { z } from 'zod';

interface formInput {
  username: string
  email: string
  password: string
}

const fallback = "/";

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: Login,
})

function Login() {
  const { setAuth, persist } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors }
  } = useForm<formInput>();

  const search = Route.useSearch()

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: formInput) => axios.post('/auth/login/', data),
    onSuccess: (res) => {
      const data = res.data;
      const accessToken = data.access;
      const user = "";
      setAuth({ isAuthenticated: true, accessToken, user });

      navigate({ to: search.redirect || fallback , replace: true });
    },
    onError: (err) => {
      console.log(err);  
      const error = err as AxiosError;
      if (!error?.response) {
        setError('No Server Response');
      } else if (error.response?.status === 400) {
        setError ("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist])

  return (
    <section className='relative w-full h-full flex items-center justify-center'>
      <img src={LoginGlyph} className='absolute top-0 left-0 w-full h-full object-cover z-0' alt='login' />
      <div className='absolute top-0 left-0 w-full h-full bg-[#15151599] z-10'></div>
      <div className="max-w-[1280px] w-full flex flex-row items-center justify-between px-32 z-20">
        <div className='flex flex-col gap-2 w-[380px]'>
          <img src={Logo} alt="" className="w-[380px] h-auto" />
          <p className='text-lg text-white font-medium'>
            Detect Fracture
          </p>
        </div>
        <form onSubmit={handleSubmit((data) => mutate(data))} className='bg-white flex flex-col gap-4 w-[500px] rounded-xl px-16 py-16'>
          <h1 className='text-4xl'>Log in</h1>
          <div className="flex flex-col gap-2">
            <div>
              <Input label='Email' type='email' {...register("email", { required: true })} />
            </div>
            <div>
              <Input label='Password' type='password'  {...register("password", { required: true })} />
            </div>
          </div>
          <button className='h-12 w-full flex items-center justify-center rounded-md bg-[#3360FF] hover:bg-[hsl(227,71%,56%)] text-white'>
            {isPending ? (
              <Oval
              width={28}
              color="#fff"
              secondaryColor="#ffffff84"
              strokeWidth={3}
            />
            ): "LOG IN" }

          </button>
          <div className="flex flex-col items-center gap-3">
            <p>Forgot Password?</p>
            <Link to='/signup'>Don't have an account? <span className='font-semibold'>Sign In</span></Link>
          </div>
          {error && <p className='mt-4 text-red-500'>{error}</p>}
        </form>
      </div>
    </section>
  )
}
