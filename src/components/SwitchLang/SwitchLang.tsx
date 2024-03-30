import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Avatar, Dropdown, Flex, Space } from 'antd';

import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getLanguage, persistStateActions } from '@/store/persistState';

export const SwitchLang = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const lang = useAppSelector(getLanguage());

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    dispatch(persistStateActions.setLanguage(e.key));
    setOpen(false);
  };

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          <Avatar src={vi} shape="square" size="small" />
          <span>Tiếng Việt</span>
        </Space>
      ),
      key: 'vi',
    },
    {
      label: (
        <Space>
          <Avatar src={en} shape="square" size="small" />
          <span>English</span>
        </Space>
      ),
      key: 'en',
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}>
      <a onClick={(e) => e.preventDefault()}>
        <Flex gap={4}>
          <Avatar size="small" src={lang === 'vi' ? vi : en} />
          <DownOutlined />
        </Flex>
      </a>
    </Dropdown>
  );
};
