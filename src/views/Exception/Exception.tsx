import React, { useState, useEffect } from 'react';
import styles from './Exception.module.scss';
import { Button, Row, Space, Select, Col, Empty, Timeline, Card } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getTimeAction, updateInfos } from '../../store/modules/signs';
import type { Infos } from '../../store/modules/signs';
import _ from 'lodash';
import { preZero } from '../../utils/common';

let date = new Date();
let year = date.getFullYear();

export default function Exception() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [month, setMonth] = useState(
    Number(searchParams.get('month')) - 1 || date.getMonth()
  );
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

  const monthOptions = Array(12)
    .fill({ value: 0, label: 0 })
    .map((item, index) => ({ value: index, label: `${index + 1}月` }));

  let detail;
  if (signsInfos.detail) {
    const detailMonth = (signsInfos.detail as { [index: string]: unknown })[
      preZero(month + 1)
    ] as { [index: string]: string };
    detail = Object.entries(detailMonth)
      .filter((item) => item[1] !== '正常出勤')
      .sort();
  }
  console.log(detail);

  const renderTime = (date: string) => {
    const ret = (
      (signsInfos.time as { [index: string]: unknown })[preZero(month + 1)] as {
        [index: string]: unknown;
      }
    )[date];
    if (Array.isArray(ret)) {
      return ret.join('-');
    } else {
      return '暂无打卡记录';
    }
  };

  const timelineItems = detail?.map((item) => ({
    children: (
      <div>
        <h3>
          {year}/{month + 1}/{item[0]}
        </h3>
        <Card size="small">
          <Space>
            <h4>{item[1]}</h4>
            <p>考勤详情：{renderTime(item[0])}</p>
          </Space>
        </Card>
      </div>
    ),
  }));

  const handnleChange = (value: number) => {
    setMonth(value);
    setSearchParams({ month: String(value + 1) });
  };

  return (
    <div className={styles['exception']}>
      <Row justify="space-between" align="middle">
        <Button type="primary">异常处理</Button>
        <Space>
          <Button>{year}</Button>
          <Select
            value={month}
            options={monthOptions}
            onChange={handnleChange}
          />
        </Space>
      </Row>
      <Row gutter={20} className={styles['exception-line']}>
        <Col span={12}>
          {/* <Empty /> */}
          <Timeline items={timelineItems} />
        </Col>
        <Col span={12}>
          <Empty />
        </Col>
      </Row>
    </div>
  );
}
