import React, { useState, useEffect } from 'react';
import styles from './Exception.module.scss';
import { Button, Row, Space, Select, Col, Empty, Timeline, Card } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { getTimeAction, updateInfos } from '../../store/modules/signs';
import type { Infos } from '../../store/modules/signs';
import { getApplyAction, updateApplyList } from '../../store/modules/checks';
import _ from 'lodash';
import { preZero } from '../../utils/common';

let date = new Date();
let year = date.getFullYear();

export default function Exception() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [month, setMonth] = useState(
    searchParams.get('month')
      ? Number(searchParams.get('month')) - 1
      : date.getMonth()
  );
  const signsInfos = useAppSelector((state) => state.signs.infos);
  const userInfos = useAppSelector((state) => state.users.infos);
  const applyList = useAppSelector((state) => state.checks.applyList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_.isEmpty(signsInfos)) {
      dispatch(getTimeAction({ userid: userInfos._id as string })).then(
        (action) => {
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

  useEffect(() => {
    if (_.isEmpty(applyList)) {
      dispatch(getApplyAction({ applicantid: userInfos._id as string })).then(
        (action) => {
          const { errcode, rets } = (
            action.payload as { [index: string]: unknown }
          ).data as { [index: string]: unknown };
          if (errcode === 0) {
            dispatch(updateApplyList(rets as Infos[]));
          }
        }
      );
    }
  }, [applyList, userInfos, dispatch]);

  const monthOptions = Array(12)
    .fill({ value: 0, label: 0 })
    .map((item, index) => ({ value: index, label: `${index + 1}月` }));

  let details;
  if (signsInfos.detail) {
    const detailMonth = (signsInfos.detail as { [index: string]: unknown })[
      preZero(month + 1)
    ] as { [index: string]: string };

    details = Object.entries(detailMonth)
      .filter((item) => item[1] !== '正常出勤')
      .sort();
  }

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

  const timelineItems = details?.map((item) => ({
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

  const applyListMonth = applyList.filter((v) => {
    const startTime = (v.time as string[])[0].split(' ')[0].split('-');
    const endTime = (v.time as string[])[1].split(' ')[0].split('-');
    return (
      startTime[1] <= preZero(month + 1) && endTime[1] >= preZero(month + 1)
    );
  });

  const applyListMonthTimeItems = applyListMonth?.map((item) => ({
    children: (
      <div>
        <h3>{item.reason as string}</h3>
        <Card className={styles['exception-card']}>
          <h4>{item.state as string}</h4>
          <p className={styles['exception-content']}>
            申请日期 {(item.time as string[])[0]} - {(item.time as string[])[1]}
          </p>
          <p className={styles['exception-content']}>
            申请详情 {item.note as string}
          </p>
        </Card>
      </div>
    ),
  }));

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
          {details ? (
            <Timeline items={timelineItems} />
          ) : (
            <Empty description="暂无异常考勤" imageStyle={{ height: 200 }} />
          )}
        </Col>
        <Col span={12}>
          {applyListMonth.length ? (
            <Timeline items={applyListMonthTimeItems} />
          ) : (
            <Empty description="暂无申请审批" imageStyle={{ height: 200 }} />
          )}
        </Col>
      </Row>
    </div>
  );
}
