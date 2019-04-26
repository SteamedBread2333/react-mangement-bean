import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
// import OperationBar from '../Layout/OperationBar.js'
import { FormattedMessage } from 'react-intl';
// import DerbyIcon from '../Common/DerbyIcon'
import moment from 'moment'
import { is, fromJS } from 'immutable';

const { Content } = Layout

const columns = [
  {
    title: <FormattedMessage id='TABLE_TITLE_NAME'></FormattedMessage>,
    key: 'name',
    align: 'center',
    render: data => data.skill.name
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_DESC'></FormattedMessage>,
    key: 'desc',
    align: 'center',
    render: data => data.skill.description || '--'
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CONTENT'></FormattedMessage>,
    key: 'content',
    children: [{
      title: <FormattedMessage id='TABLE_TITLE_KEY'></FormattedMessage>,
      key: 'contentName',
      align: 'center',
      render: data => data.content ? data.content.name : '--'
    }, {
      title: <FormattedMessage id='TABLE_TITLE_VALUE'></FormattedMessage>,
      key: 'contentValue',
      align: 'center',
      render: data => data.content ? data.content.text : '--'
    }]
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CONTACTMODES'></FormattedMessage>,
    key: 'contactModes',
    children: [{
      title: <FormattedMessage id='TABLE_TITLE_EMAIL'></FormattedMessage>,
      key: 'email',
      align: 'center',
      render: data => data.contacts ? data.contacts.email : '--'
    }, {
      title: <FormattedMessage id='TABLE_TITLE_SMS'></FormattedMessage>,
      key: 'sms',
      align: 'center',
      render: data => data.contacts ? data.contacts.phoneNumber : '--'
    }]
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CT'></FormattedMessage>,
    key: 'createdTime',
    align: 'center',
    render: data => data.skill.createTime ? moment(data.skill.createTime).format('YYYY-MM-DD') : '--'
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_OPERATE'></FormattedMessage>,
    key: 'id',
    align: 'center',
    render: data => {
      return <Link to={`/skillsEdit/${data.skill.id}`} ><Icon type="edit" /></Link>
    }
  }
]

@inject('skillStore') @observer
class SkillList extends Component {

  componentDidMount() {
    // console.log(this.props.location)
    this.props.skillStore.getSkills(1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  render() {

    const { skillsList, loading } = this.props.skillStore

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
        <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/skillsCreate' }}><FormattedMessage id='CREATE'></FormattedMessage></Button>
        <Content>
          <Table
            rowKey={data => data.skill.id}
            columns={columns}
            dataSource={skillsList ? skillsList.data : []}
            loading={loading}
            bordered
          />
        </Content>
      </Layout>
    )
  }
}

export default SkillList