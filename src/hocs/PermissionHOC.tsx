import React, { forwardRef, Ref, ComponentType } from 'react';

import { usePermission } from '@/hooks/usePermission';

type WithPermissionProps = {
  policyKey?: string;
}

export function withPermission<P>(Component: ComponentType<P>, policyKey?: string) {
  const Forwarded = forwardRef<Ref<any>, P & WithPermissionProps>((props, ref) => {
    const { policyKey: policyKeyProp, ...rest } = props;
    const isGranted = policyKey || policyKeyProp ? usePermission(policyKey || policyKeyProp || '') : true;
    return isGranted ? <Component ref={ref} {...(rest as P)} /> : null;
  });

  return Forwarded;
}