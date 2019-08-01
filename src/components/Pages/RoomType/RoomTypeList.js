import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
import moment from 'moment'

import { FormattedMessage } from 'react-intl';

const { Content } = Layout

const columns = [
    {
        title: "Room Type Name",
        key: 'roomTypeName',
        align: 'center',
        render: data => data.roomTypeName
    },
    {
        title: 'Description',
        key: 'description',
        align: 'center',
        render: data => data.description
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
            return <Link to={`/roomTypesEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('roomTypeStore') @observer
class RoomTypeList extends Component {

    componentDidMount() {
        this.props.roomTypeStore.getRoomTypes(1);
    }

    render() {
        const { roomTypesList, loading } = this.props.roomTypeStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/roomTypesCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={roomTypesList ? roomTypesList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default RoomTypeList