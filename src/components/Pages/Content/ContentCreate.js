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

@inject('contentStore') @observer
class ContentFormWrapper extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                name: values.name,
                text: values.text
            }
            if (!err) {
                this.props.contentStore.addContent(params, 1)
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
                        required: true, message: 'Please input your Content name',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Text'>
                {getFieldDecorator('text', {
                    rules: [{
                        required: true, message: 'Please input your Content text'
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

const ContentForm = Form.create()(ContentFormWrapper)

@inject('contentStore') @observer
class ContentCreate extends Component {
    render() {

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.contentStore.loading}>
                <ContentForm />
            </Spin>
        </Layout>
    }
}

export default ContentCreate

