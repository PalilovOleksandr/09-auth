import Image from 'next/image';
import css from './page.module.css';
import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'View and manage your profile on Notehub. Update your personal information, account settings, and review your activity.',
  openGraph: {
    title: 'Profile',
    description:
      'View and manage your profile on Notehub. Update your personal information, account settings, and review your activity.',
    url: 'https://09-auth-chi.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile - Notehub',
      },
    ],
  },
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="/no-photo.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
