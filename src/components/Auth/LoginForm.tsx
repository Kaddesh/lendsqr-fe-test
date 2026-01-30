import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../Form/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, clearError } from '../../redux/slices/authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginData = z.infer<typeof loginSchema>;

type Props = {
  onSubmit?: (data: LoginData) => void;
  className?: string; // top-level form wrapper
};

export const LoginForm: React.FC<Props> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const submit = async (data: LoginData) => {
    try {
      await dispatch(loginAsync(data)).unwrap();
      navigate('/'); 
    } catch (err) {
      console.log('Login failed:', err);
    }
  };


  return (
    <form onSubmit={handleSubmit(submit)} noValidate className={className ?? 'login-form'}>
        {error && (
  <p className="login-form__error" onClick={() => dispatch(clearError())}>
    {error}
  </p>
)}
      <div className="login-form__field">
        <TextInput
          name="email"
          type="email"
          register={register('email')}
          error={errors.email?.message ?? null}
          placeholder="Enter email"
          className="login-form__field-wrapper"
          inputClassName="login-form__input"
          labelClassName="login-form__label"
          errorClassName="login-form__error"
        />
      </div>

      <div className="login-form__field">
        <TextInput
          name="password"
          type={showPassword ? 'text' : 'password'}
          register={register('password')}
          error={errors.password?.message ?? null}
          placeholder="Enter password"
          className="login-form__field-wrapper"
          inputClassName="login-form__input"
          labelClassName="login-form__label"
          errorClassName="login-form__error"
          right={
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="login-form__toggle">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          }
          rightClassName="login-form__toggle-wrapper"
        />
      </div>

      <div className="login-form__forgot-wrapper">
        <button type="button" className="login-form__forgot">Forgot password?</button>
      </div>

      <div className="login-form__actions">
        <button type="submit" disabled={loading} className="login-form__submit">
          Log in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
