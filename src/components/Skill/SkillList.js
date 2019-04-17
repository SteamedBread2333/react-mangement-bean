import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {Link} from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
import OperationBar from '../Layout/OperationBar.js'
import { FormattedMessage } from 'react-intl';
import DerbyIcon from '../Common/DerbyIcon'
import store from '../../stores/skillStore'

const { Content } = Layout

const columns = [
  {
    title: <FormattedMessage id='TABLE_TITLE_NAME'></FormattedMessage>,
    dataIndex: 'skill',
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_DESC'></FormattedMessage>,
    dataIndex: 'skill',
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CONTRACTMODES'></FormattedMessage>,
    dataIndex: 'contractModes',
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CT'></FormattedMessage>,
    dataIndex: 'created_time'
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_OPERATE'></FormattedMessage>,
    dataIndex: 'id',
    render: id => {
      return <Link to={`/skillsEdit/${id}`} ><Icon type="edit"/></Link>
    }
  }
]

@inject('appStore') @observer
class SkillList extends Component {

  componentDidMount() {
    // console.log(this.props.location)
    store.getSkills(1);
  }

  render() {

    const {skills} = store

    return (
      <Layout>
        {/* <OperationBar>
          <DerbyIcon type="icon-tuichu" />
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="开始时间"
          />
          <label>~</label>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="结束时间"
            onChange={(e, dataString) => { console.log(dataString) }}
          />
          <label>昵称：</label>
          <Input placeholder="请输入昵称" style={{ width: 200 }} />
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="rollback">重置</Button>
          <Button type="primary" icon="reload">刷新</Button>
        </OperationBar> */}
        <Button type="primary" style={{width: 100, margin: '20px 0'}} onClick={() => {location.href = './#/skillsCreate'}}><FormattedMessage id='CREATE'></FormattedMessage></Button>
        <Content>
          <Table
            columns={columns}
            dataSource={skills}
            bordered
          />
        </Content>
      </Layout>
    )
  }
}

export default SkillList