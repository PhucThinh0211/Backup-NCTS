import React, { forwardRef, Ref, ComponentType } from 'react';

import { usePermission } from '@/hooks/usePermission';

interface WithPermissionProps {
  policyKey?: string;
}

export function withPermission<P>(Component: ComponentType<P>, policyKey?: string) {
  const Forwarded = forwardRef<P & WithPermissionProps, Ref<any>>((props: any, ref) => {
    const isGranted = policyKey || props.policyKey ? usePermission(policyKey || props.policyKey) : true;
    return isGranted ? <Component ref={ref} {...(props as P)} /> : null;
  });

  return Forwarded;
}
