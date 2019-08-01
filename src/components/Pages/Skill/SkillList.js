import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
// import OperationBar from '../Layout/OperationBar.js'
import { FormattedMessage } from 'react-intl';
// import DerbyIcon from '../Common/DerbyIcon'
import moment from 'moment'

const { Content } = Layout

const columns = [
  {
    title: <FormattedMessage id='TABLE_TITLE_NAME'></FormattedMessage>,
    key: 'name',
    align: 'center',
    render: data => data.name
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_DESC'></FormattedMessage>,
    key: 'desc',
    align: 'center',
    render: data => data.description || '--'
  },
  {
    title: 'Type',
    key: 'type',
    align: 'center',
    render: data => data.type || '--'
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center',
    render: data => data.status || '--'
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_CT'></FormattedMessage>,
    key: 'createdTime',
    align: 'center',
    render: data => moment(data.createTime).format('YYYY-MM-DD') || '--'
  },
  {
    title: <FormattedMessage id='TABLE_TITLE_OPERATE'></FormattedMessage>,
    key: 'id',
    align: 'center',
    render: data => {
      return <Link to={`/skillsEdit/${data.id}`} ><Icon type="edit" /></Link>
    }
  }
]

@inject('skillStore') @observer
class SkillList extends Component {

  componentDidMount() {
    // console.log(this.props.location)
    this.props.skillStore.getSkills(1);
  }

  render() {

    const { skillsList, loading } = this.props.skillStore

    return (
      <Layout>
        <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/skillsCreate' }}><FormattedMessage id='CREATE'></FormattedMessage></Button>
        <Content>
          <Table
            rowKey={data => data.id}
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