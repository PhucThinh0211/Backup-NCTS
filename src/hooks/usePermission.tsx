import { useEffect, useState } from 'react';

import { createGrantedPolicySelector } from '@/store/app';
import { useAppSelector } from '@/store/hooks';

export const usePermission = (key: string) => {
  const [permission, setPermission] = useState(false);

  const policy = useAppSelector(createGrantedPolicySelector(key));

  useEffect(() => {
    setPermission(policy);
  }, [policy]);

  return permission;
};
