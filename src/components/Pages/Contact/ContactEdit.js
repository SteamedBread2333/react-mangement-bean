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

@inject('contactStore') @observer
class ContactFormWrapper extends Component {

    componentDidMount() {
        if (this.props.contactId) {
            this.props.contactStore.loading = true
            this.props.contactStore.getContact(this.props.contactId, 1).then(res => {
                const { name, email, phoneNumber, description, } = res.data
                const defaultValues = { name, email, phoneNumber, description, }
                this.props.form.setFieldsValue({
                    ...defaultValues
                })
                this.props.form.validateFields()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.props.contactStore.loading = false
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                id: this.props.contactId,
                ...values
            }
            if (!err) {
                this.props.contactStore.updateContact(params, 1)
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
                        required: true, message: 'Please input your Contact name',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_EMAIL'></FormattedMessage>}
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_SMS'></FormattedMessage>}>
                {getFieldDecorator('phoneNumber', {
                    rules: [{
                        required: true, message: 'Please input your phone number!'
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
                        // required: true, message: 'Please input your Contact name',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/contacts`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const ContactForm = Form.create()(ContactFormWrapper)

@inject('contactStore') @observer
class ContactEdit extends Component {
    render() {
        const contactId = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.contactStore.loading}>
                <ContactForm contactId={contactId} />
            </Spin>
        </Layout>
    }
}

export default ContactEdit

