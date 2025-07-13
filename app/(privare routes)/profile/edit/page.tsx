'use client';

import { updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import css from './page.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

const EditProfile = () => {
  const router = useRouter();
  const userName = useAuthStore(state => state.user);
  const setUserName = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as { username: string };
    try {
      const response = await updateMe({ username: data.username });
      setUserName(response);
      router.push('/profile');
    } catch {
      throw new Error('Invalid name');
    }
  };

  const handlePush = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={userName?.avatar || '/no-photo.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={userName?.username}
            />
          </div>

          <p>Email: {userName?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handlePush}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
