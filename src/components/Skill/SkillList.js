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
    dataIndex: 'name',
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_DESC'></FormattedMessage>,
    dataIndex: 'desc',
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

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    id: i,
    desc: `getPwdOfRoomWifi${i}`,
    name: `skill${i}`,
    openId: 'xxxx' + i,
    nickname: `老王${i}`,
    contractModes: 'E-mail,SMS,Alexa',
    integral: i + 10,
    created_time: '2017-03-17'
  })
}

@inject('appStore') @observer
class SkillList extends Component {

  componentDidMount() {
    // console.log(this.props.location)
    store.getSkills(1);
  }

  render() {
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
            dataSource={data}
            bordered
          />
        </Content>
      </Layout>
    )
  }
}

export default SkillList