import React from 'react';
import styles from '../Home.module.scss';
import classNames from 'classnames';
import { Dropdown, Badge, Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const items1: MenuProps['items'] = [
  {
    key: 1,
    label: '暂无消息',
  },
];

const items2: MenuProps['items'] = [
  {
    key: 1,
    label: '暂无消息',
  },
];

export default function HomeHeader() {
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
          <Avatar />
        </Dropdown>
      </Space>
    </div>
  );
}
