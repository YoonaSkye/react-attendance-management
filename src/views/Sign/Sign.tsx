import React, { useState, useEffect } from 'react';
import styles from './Sign.module.scss';
import {
  Descriptions,
  Button,
  Tag,
  Calendar,
  Row,
  Space,
  Select,
  message,
} from 'antd';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import type { Dayjs } from 'dayjs';
import { useAppSelector, useAppDispatch } from '../../store';
import {
  getTimeAction,
  putTimeAction,
  updateInfos,
} from '../../store/modules/signs';
import type { Infos } from '../../store/modules/signs';
import _ from 'lodash';
import { preZero } from '../../utils/common';

let date = new Date();

enum DetailKey {
  normal = '正常出勤',
  absent = '旷工',
  miss = '漏打卡',
  late = '迟到',
  early = '早退',
  lateAndEarly = '迟到并早退',
}

const detailValue: Record<keyof typeof DetailKey, number> = {
  normal: 0,
  absent: 0,
  miss: 3,
  late: 0,
  early: 0,
  lateAndEarly: 0,
};

export default function Sign() {
  const [month, setMonth] = useState(date.getMonth());
  const signsInfos = useAppSelector((state) => state.signs.infos);
  const userInfos = useAppSelector((state) => state.users.infos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({ userid: userInfos._id as string })).then(
        (action) => {
          // console.log(action.payload);
          const { errcode, infos } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos));
          }
        }
      );
    }
  }, [signsInfos, userInfos, dispatch]);

  const dateCellRender = (value: Dayjs) => {
    const month =
      signsInfos.time &&
      (signsInfos.time as { [k: string]: unknown })[preZero(value.month() + 1)];

    const date =
      month && (month as { [k: string]: unknown })[preZero(value.date())];

    let data = '';
    if (Array.isArray(date)) {
      data = date.join('-');
    }

    return <div className={styles['show-time']}>{data}</div>;
  };

  const handlePutTime = () => {
    dispatch(putTimeAction({ userid: userInfos._id as string })).then(
      (action) => {
        const { errcode, infos } = (
          action.payload as { [index: string]: unknown }
        ).data as { [index: string]: unknown };
        if (errcode === 0) {
          dispatch(updateInfos(infos as Infos));
          message.success('签到成功');
        }
      }
    );
  };

  return (
    <div>
      <Descriptions
        layout="vertical"
        column={9}
        bordered
        className={styles['descriptions']}
      >
        <Descriptions.Item label="月份">{month + 1}</Descriptions.Item>
        {Object.entries(DetailKey).map((item) => (
          <Descriptions.Item key={item[0]} label={item[1]}>
            {detailValue[item[0] as keyof typeof DetailKey]}
          </Descriptions.Item>
        ))}

        <Descriptions.Item label="操作">
          <Button type="primary" size="small">
            查看详情
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="考勤状态">
          <Tag color="green">正常</Tag>
        </Descriptions.Item>
      </Descriptions>
      <Calendar
        locale={locale}
        dateCellRender={dateCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const monthOptions = Array(12)
            .fill({ value: 0, label: 0 })
            .map((item, index) => ({ value: index, label: `${index + 1}月` }));

          return (
            <Row
              justify="space-between"
              align="middle"
              className={styles['calender-header']}
            >
              <Button type="primary" onClick={handlePutTime}>
                在线签到
              </Button>
              <Space>
                <Button>2023</Button>
                <Select
                  value={month}
                  onChange={(newMonth) => {
                    setMonth(newMonth);
                    onChange(value.clone().month(newMonth));
                  }}
                  options={monthOptions}
                />
              </Space>
            </Row>
          );
        }}
      />
    </div>
  );
}
