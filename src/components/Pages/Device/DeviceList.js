import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Layout, Icon, Button, Table } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl';

const { Content } = Layout

const columns = [
    {
        title: "Serial Number",
        key: 'serialNumber',
        align: 'center',
        render: data => data.serialNumber
    },
    {
        title: 'Name',
        key: 'name',
        align: 'center',
        render: data => data.name
    },
    {
        title: 'Vendor',
        key: 'vendor',
        align: 'center',
        render: data => data.vendor
    },
    {
        title: 'Device Type',
        key: 'deviceType',
        align: 'center',
        render: data => data.deviceType
    },
    {
        title: 'MAC Address',
        key: 'macAddress',
        align: 'center',
        render: data => data.macAddress
    },
    {
        title: 'Status',
        key: 'status',
        align: 'center',
        render: data => data.status ? 'Enable' : 'Disable'
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
            return <Link to={`/devicesEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('deviceStore') @observer
class DeviceList extends Component {

    componentDidMount() {
        this.props.deviceStore.getDevices(1);
    }

    render() {
        const { devicesList, loading } = this.props.deviceStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/devicesCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={devicesList ? devicesList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default DeviceList