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
        title: 'Text',
        key: 'text',
        align: 'center',
        render: data => data.text
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
            return <Link to={`/contentsEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('contentStore') @observer
class ContentList extends Component {

    componentDidMount() {
        this.props.contentStore.getContents(1);
    }

    render() {
        const { contentsList, loading } = this.props.contentStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/contentsCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={contentsList ? contentsList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default ContentList