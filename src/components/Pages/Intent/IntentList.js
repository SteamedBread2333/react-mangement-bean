import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl';

const { Content } = Layout

const columns = [
    {
        title: "Name",
        key: 'name',
        align: 'center',
        render: data => data.name
    },
    {
        title: 'Description',
        key: 'description',
        align: 'center',
        render: data => data.description || '--'
    },
    {
        title: 'Need Content',
        key: 'needContent',
        align: 'center',
        render: data => data.needContent ? <Icon style={{color: '#48cb59'}} type="check-circle" theme="filled" /> : <Icon style={{color: '#ff5959'}} type="close-circle" theme="filled" />
    },
    {
        title: 'Need Contact',
        key: 'needContact',
        align: 'center',
        render: data => data.needContact ? <Icon style={{color: '#48cb59'}} type="check-circle" theme="filled" /> : <Icon style={{color: '#ff5959'}} type="close-circle" theme="filled" />
    },
    {
        title: 'Create Time',
        key: 'createdTime',
        align: 'center',
        render: data => data.createTime ? moment(data.createTime).format('YYYY-MM-DD') : '--'
    },
    {
        title: 'Last Update Time',
        key: 'lastUpdateTime',
        align: 'center',
        render: data => data.lastUpdateTime ? moment(data.lastUpdateTime).format('YYYY-MM-DD') : '--'
    },
    {
        title: <FormattedMessage id='TABLE_TITLE_OPERATE'></FormattedMessage>,
        key: 'id',
        align: 'center',
        render: data => {
            return <Link to={`/intentsEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('intentStore') @observer
class IntentList extends Component {

    componentDidMount() {
        this.props.intentStore.getIntents(1);
    }

    render() {
        const { intentsList, loading } = this.props.intentStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/intentsCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={intentsList ? intentsList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default IntentList