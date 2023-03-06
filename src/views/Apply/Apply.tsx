import React, { useState, useEffect } from 'react';
import styles from './Apply.module.scss';
import {
  Button,
  Divider,
  Input,
  Radio,
  Row,
  Space,
  RadioChangeEvent,
  Table,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Infos } from '../../store/modules/checks';
import { useAppDispatch, useAppSelector } from '../../store';
import { getApplyAction, updateApplyList } from '../../store/modules/checks';
import _ from 'lodash';

const approverTypes = [
  { label: '全部', value: '全部' },
  { label: '待审批', value: '待审批' },
  { label: '已通过', value: '已通过' },
  { label: '未通过', value: '未通过' },
];

const defaultType = approverTypes[0].value;

const columns: ColumnsType<Infos> = [
  {
    title: '申请人',
    dataIndex: 'applicantname',
    key: 'applicantname',
    width: 180,
  },
  {
    title: '审批事由',
    dataIndex: 'reason',
    key: 'reason',
    width: 180,
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: '审批人',
    dataIndex: 'approvername',
    key: 'approvername',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    width: 180,
  },
];

export default function Apply() {
  const [approverType, setApproverType] = useState(defaultType);
  const [searchWord, setSearchWord] = useState('');
  const usersInfos = useAppSelector((state) => state.users.infos);
  const applyList = useAppSelector((state) => state.checks.applyList).filter(
    (v) =>
      (v.state === approverType || defaultType === approverType) &&
      (v.note as string).includes(searchWord)
  );
  const dispatch = useAppDispatch();

  const approverTypeChange = (ev: RadioChangeEvent) => {
    setApproverType(ev.target.value);
  };
  const searchWordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(ev.target.value);
  };

  useEffect(() => {
    if (_.isEmpty(applyList)) {
      dispatch(getApplyAction({ applicantid: usersInfos._id as string })).then(
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
  }, [applyList, usersInfos, dispatch]);

  return (
    <div>
      <Row className={styles['apply-title']} justify="space-between">
        <Button type="primary">添加审批</Button>
        <Space>
          <Input
            placeholder="请输入搜索关键词"
            value={searchWord}
            onChange={searchWordChange}
          />
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
          <Divider type="vertical" style={{ borderLeftColor: '#dcdfe6' }} />
          <Radio.Group
            options={approverTypes}
            optionType="button"
            buttonStyle="solid"
            value={approverType}
            onChange={approverTypeChange}
          />
        </Space>
      </Row>
      <Table
        dataSource={applyList}
        columns={columns}
        className={styles['apply-table']}
        bordered
        size="small"
        pagination={{
          defaultPageSize: 5,
        }}
      />
    </div>
  );
}
