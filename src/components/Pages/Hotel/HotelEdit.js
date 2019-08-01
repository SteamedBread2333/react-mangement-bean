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

@inject('hotelStore') @observer
class EditFormWrapper extends Component {

    componentDidMount() {
        if (this.props.id) {
            this.props.hotelStore.loading = true
            this.props.hotelStore.getHotel(this.props.id, 1).then(res => {
                const { name, brand, frontDeskNumber, address, latitude, longitude } = res.data
                let defaultValues = { name, brand, frontDeskNumber, address, latitude: latitude + '', longitude: longitude + '' }
                this.props.form.setFieldsValue({
                    ...defaultValues
                })
                this.props.form.validateFields()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.props.hotelStore.loading = false
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
                this.props.hotelStore.updateHotel(params, 1)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Name'>
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your Hotel Name',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Brand'>
                {getFieldDecorator('brand', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Front-Desk Number'>
                {getFieldDecorator('frontDeskNumber', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Address'>
                {getFieldDecorator('address', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Latitude'>
                {getFieldDecorator('latitude', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Longitude'>
                {getFieldDecorator('longitude', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>

            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/contents`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const EditForm = Form.create()(EditFormWrapper)

@inject('hotelStore') @observer
class HotelEdit extends Component {
    render() {

        const id = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.hotelStore.loading}>
                <EditForm id={id} />
            </Spin>
        </Layout>
    }
}

export default HotelEdit

