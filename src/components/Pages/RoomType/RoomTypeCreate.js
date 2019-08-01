import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input } from 'antd'
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('roomTypeStore') @observer
class CreateFormWrapper extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                roomTypeName: values.roomTypeName,
                description: values.description
            }
            if (!err) {
                this.props.roomTypeStore.addRoomType(params, 1)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Room Type Name'>
                {getFieldDecorator('roomTypeName', {
                    rules: [{
                        required: true, message: 'Please input your Room Type Name',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Description'>
                {getFieldDecorator('description', {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/roomTypes`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const CreateForm = Form.create()(CreateFormWrapper)

@inject('roomTypeStore') @observer
class RoomTypeCreate extends Component {
    render() {

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.roomTypeStore.loading}>
                <CreateForm />
            </Spin>
        </Layout>
    }
}

export default RoomTypeCreate

