'use client';

import { registerRequest } from '@/types/note';
import css from './page.module.css';
import { useRouter } from 'next/router';
import { register } from '@/lib/api';

const SignUp = () => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const registerUser = Object.fromEntries(formData);
    const data: registerRequest = {
      email: registerUser.email as string,
      password: registerUser.password as string,
    };
    const response = await register(data);
    if (response) {
      router.push('/profile');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>Error</p>
      </form>
    </main>
  );
};

export default SignUp;
