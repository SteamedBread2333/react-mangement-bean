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
        title: 'Phone Number',
        key: 'phoneNumber',
        align: 'center',
        render: data => data.phoneNumber
    },
    {
        title: 'E-mail',
        key: 'text',
        align: 'center',
        render: data => data.email
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
            return <Link to={`/contactsEdit/${data.id}`} ><Icon type="edit" /></Link>
        }
    }
]

@inject('contactStore') @observer
class ContactList extends Component {

    componentDidMount() {
        this.props.contactStore.getContacts(1);
    }

    render() {
        const { contactsList, loading } = this.props.contactStore

        return (<Layout>
            <Button type="primary" style={{ width: 100, margin: '20px 0' }} onClick={() => { location.href = './#/contactsCreate' }}>Create</Button>
            <Content>
                <Table
                    rowKey={data => data.id}
                    columns={columns}
                    dataSource={contactsList ? contactsList.data : []}
                    loading={loading}
                    bordered
                />
            </Content>
        </Layout>
        )
    }
}

export default ContactList