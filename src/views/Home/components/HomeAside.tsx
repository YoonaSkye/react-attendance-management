import React from 'react';
import styles from '../Home.module.scss';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { routes } from '../../../router';
import { matchRoutes, useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import _ from 'lodash';

export default function HomeAside() {
  const permission = useAppSelector(
    (state) => state.users.infos.permission
  ) as unknown[];
  const location = useLocation();
  const matchs = matchRoutes(routes, location);
  const subPath = matchs![0].pathnameBase || '';
  const path = matchs![1].pathnameBase || '';

  const menus = _.cloneDeep(routes).filter((item) => {
    item.children = item.children?.filter(
      (i) => i.meta?.menu && permission?.includes(i.name)
    );
    return item.meta?.menu && permission?.includes(item.name);
  });

  const items: MenuProps['items'] = menus.map((m1) => {
    const children = m1.children?.map((m2) => {
      return {
        key: m1.path! + m2.path!,
        label: <Link to={m1.path! + m2.path!}>{m2.meta?.title}</Link>,
        icon: m2.meta?.icon,
      };
    });

    return {
      key: m1.path!,
      label: <Link to={m1.path!}>{m1.meta?.title}</Link>,
      icon: m1.meta?.icon,
      children,
    };
  });

  return (
    <Menu
      mode="inline"
      selectedKeys={[path]}
      openKeys={[subPath]}
      items={items}
      className={styles['home-aside']}
    />
  );
}
