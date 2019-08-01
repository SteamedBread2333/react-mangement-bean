import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
import moment from 'moment'

import { FormattedMessage } from 'react-intl';

const { Content } = Layout

const columns = [
    {
        title: "Room Number",
        key: 'roomNo',
        align: 'center',
        render: data => data.roomNo
    },
    {
        title: 'Name',
        key: 'roomName',
        align: 'center',
        render: data => data.roomName
    },
    {
        title: 'Description',
        key: 'roomDesc',
        align: 'center',
        render: data => data.roomDesc
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
            return <Link to={`/roomsEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('roomStore') @observer
class RoomList extends Component {

    componentDidMount() {
        this.props.roomStore.getRooms(1);
    }

    render() {
        const { roomsList, loading } = this.props.roomStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/roomsCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={roomsList ? roomsList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default RoomList