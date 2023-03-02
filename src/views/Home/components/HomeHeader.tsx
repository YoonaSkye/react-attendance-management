import React from 'react';
import styles from '../Home.module.scss';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../store';
import { clearToken } from '../../../store/modules/users';
// antd && icons
import { Dropdown, Badge, Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const items1: MenuProps['items'] = [
  {
    key: 1,
    label: '暂无消息',
  },
];

export default function HomeHeader() {
  const name = useAppSelector((state) => state.users.infos?.name) as string;
  const head = useAppSelector((state) => state.users.infos.head) as string;
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearToken());
    setTimeout(() => {
      window.location.replace('/login');
    });
  };

  const items2: MenuProps['items'] = [
    {
      key: '1',
      label: <div>个人信息</div>,
    },
    {
      key: '2',
      label: <div onClick={handleLogout}>退出</div>,
    },
  ];
  return (
    <div className={styles['home-header']}>
      <span className={styles['home-header-logo']}>
        <i
          className={classNames('iconfont icon-React', styles['icon-react'])}
        ></i>
        <i
          className={classNames('iconfont icon-plus', styles['icon-plus'])}
        ></i>
        <i
          className={classNames(
            'iconfont icon-typescript',
            styles['icon-typescript']
          )}
        ></i>
      </span>
      <span className={styles['home-header-title']}>在线考勤系统</span>
      <Space size="middle">
        <Dropdown menu={{ items: items1 }} placement="bottom" arrow>
          <Badge dot>
            <BellOutlined style={{ fontSize: '20px' }} />
          </Badge>
        </Dropdown>
        <Dropdown menu={{ items: items2 }} placement="bottom" arrow>
          <span>
            <Avatar src={head} /> {name}
          </span>
        </Dropdown>
      </Space>
    </div>
  );
}
