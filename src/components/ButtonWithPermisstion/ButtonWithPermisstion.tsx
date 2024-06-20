import { Button } from 'antd';

import { withPermission } from '@/hocs/PermissionHOC';

export const ButtonWithPermisstion = withPermission(Button);
