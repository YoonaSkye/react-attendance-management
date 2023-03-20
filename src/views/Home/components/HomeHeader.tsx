import React, { useEffect } from 'react';
import styles from '../Home.module.scss';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../store';
import { clearToken } from '../../../store/modules/users';
import { getRemindAction, updateInfo } from '../../../store/modules/news';
import type { Info } from '../../../store/modules/news';
// antd && icons
import { Dropdown, Badge, Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function HomeHeader() {
  const name = useAppSelector((state) => state.users.infos?.name) as string;
  const head = useAppSelector((state) => state.users.infos.head) as string;
  const _id = useAppSelector((state) => state.users.infos._id) as string;
  const newsInfo = useAppSelector((state) => state.news.info);
  const dispatch = useAppDispatch();

  const isDot = (newsInfo.applicant || newsInfo.approver) as
    | boolean
    | undefined;

  useEffect(() => {
    dispatch(getRemindAction({ userid: _id })).then((action) => {
      const { errcode, info } = (action.payload as { [index: string]: unknown })
        .data as { [index: string]: unknown };
      if (errcode === 0) {
        dispatch(updateInfo(info as Info));
      }
    });
  }, [dispatch, _id]);

  const handleLogout = () => {
    dispatch(clearToken());
    setTimeout(() => {
      window.location.replace('/login');
    });
  };

  const items1: MenuProps['items'] = [];

  if (newsInfo.applicant) {
    items1.push({
      key: '1',
      label: <Link to="/apply">有审批结果消息</Link>,
    });
  }
  if (newsInfo.approver) {
    items1.push({
      key: '2',
      label: <Link to="/check">有审批请求消息</Link>,
    });
  }
  if (!newsInfo.applicant && !newsInfo.approver) {
    items1.push({
      key: '3',
      label: <div>暂无消息</div>,
    });
  }

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
          <Badge dot={isDot}>
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
