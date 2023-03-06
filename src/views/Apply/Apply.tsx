import React, { useState } from 'react';
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

const approverTypes = [
  { label: '全部', value: '全部' },
  { label: '待审批', value: '待审批' },
  { label: '已通过', value: '已通过' },
  { label: '未通过', value: '未通过' },
];

const defaultType = approverTypes[0].value;

const dataSource: any = [];
const columns = [
  {
    title: '申请人',
    dataIndex: 'applicantname',
    key: 'applicantname',
  },
  {
    title: '审批事由',
    dataIndex: 'reason',
    key: 'reason',
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
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
  },
];

export default function Apply() {
  const [approverType, setApproverType] = useState(defaultType);

  const approverTypeChange = (ev: RadioChangeEvent) => {
    setApproverType(ev.target.value);
  };
  return (
    <div>
      <Row className={styles['apply-title']} justify="space-between">
        <Button type="primary">添加审批</Button>
        <Space>
          <Input placeholder="请输入搜索关键词" />
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
        dataSource={dataSource}
        columns={columns}
        className={styles['apply-table']}
      />
    </div>
  );
}
