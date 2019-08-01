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
        title: 'Brand',
        key: 'brand',
        align: 'center',
        render: data => data.brand || '--'
    },
    {
        title: 'Front-Desk Number',
        key: 'frontDeskNumber',
        align: 'center',
        render: data => data.frontDeskNumber || '--'
    },
    {
        title: 'Address',
        key: 'address',
        align: 'center',
        render: data => data.address || '--'
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
            return <Link to={`/hotelsEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('hotelStore') @observer
class HotelList extends Component {

    componentDidMount() {
        this.props.hotelStore.getHotels(1);
    }

    render() {
        const { hotelsList, loading } = this.props.hotelStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/hotelsCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={hotelsList ? hotelsList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default HotelList