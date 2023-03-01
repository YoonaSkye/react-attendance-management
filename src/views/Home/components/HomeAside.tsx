import React from 'react';
import styles from '../Home.module.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

export default function HomeAside() {
  const items: MenuProps['items'] = [
    {
      key: 1,
      label: '一级菜单',
      children: [
        {
          key: 2,
          label: '二级菜单1',
        },
        {
          key: 3,
          label: '二级菜单2',
        },
      ],
    },
  ];
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['2']}
      defaultOpenKeys={['1']}
      items={items}
      className={styles['home-aside']}
    />
  );
}
