import { useEffect, useRef } from 'react';

import { SignIn } from '@/components';
import { TopNavHeight } from '@/common';

export const LoginPage = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef?.current) {
      window.scrollTo({ top: scrollRef.current.offsetTop - TopNavHeight, behavior: 'smooth' });
    }
  }, [scrollRef]);

  return (
    <div ref={scrollRef}>
      <SignIn />
    </div>
  );
};
