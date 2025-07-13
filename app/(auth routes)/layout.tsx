'use client';

import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const NotesLayout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);
  return <>{loading ? <Loader /> : children}</>;
};

export default NotesLayout;
