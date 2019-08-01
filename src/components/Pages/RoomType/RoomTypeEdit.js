import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input, message } from 'antd'
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
class EditFormWrapper extends Component {

    componentDidMount() {
        if (this.props.id) {
            this.props.roomTypeStore.loading = true
            this.props.roomTypeStore.getRoomType(this.props.id).then(res => {
                const { roomTypeName, description, } = res.data
                const defaultValues = { roomTypeName, description, }
                this.props.form.setFieldsValue({
                    ...defaultValues
                })
                this.props.form.validateFields()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.props.roomTypeStore.loading = false
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                id: this.props.id,
                ...values
            }
            if (!err) {
                this.props.roomTypeStore.updateRoomType(params)
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

const EditForm = Form.create()(EditFormWrapper)

@inject('roomTypeStore') @observer
class RoomTypeEdit extends Component {
    render() {
        const id = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.roomTypeStore.loading}>
                <EditForm id={id} />
            </Spin>
        </Layout>
    }
}

export default RoomTypeEdit

