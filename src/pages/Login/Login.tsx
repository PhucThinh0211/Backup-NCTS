import { useRef } from 'react';

import { SignIn } from '@/components';

export const LoginPage = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={scrollRef}>
      <SignIn />
    </div>
  );
};
