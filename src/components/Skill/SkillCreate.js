import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input } from 'antd'
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item

const titleStyle = {
    style: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    }
}

const descStyle = {
    style: {
        fontSize: 14,
        fontWeight: 400,
        color: '#999',
        marginBottom: 20
    }
}

const lineStyle = {
    style: {
        width: '100%',
        background: '#e8e8e8',
        height: 1,
        margin: '20px 0px'
    }
}

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('skillStore') @observer
class CreateForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                skill: {
                    name: values.name,
                    description: values.description
                },
                content: {
                    name: values.contentName,
                    text: values.contentValue
                },
                contacts: {
                    email: values.email,
                    phoneNumber: values.phoneNumber
                }
            }
            if (!err) {
                this.props.skillStore.addSkill(params)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        return <Form style={{ width: '80%' }}>
            <h3 {...titleStyle}><FormattedMessage id='CREATE_SKILL_TITLE1'></FormattedMessage></h3>
            <article {...descStyle}><FormattedMessage id='CREATE_SKILL_DESC1'></FormattedMessage></article>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_NAME'></FormattedMessage>}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your skill name!',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_DESC'></FormattedMessage>}
            >
                {getFieldDecorator('description', {
                    rules: [{
                        required: true, message: 'Please input your skill description!'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <div {...lineStyle}></div>
            <h3 {...titleStyle}><FormattedMessage id='CREATE_SKILL_TITLE2'></FormattedMessage></h3>
            <article {...descStyle}><FormattedMessage id='CREATE_SKILL_DESC2'></FormattedMessage></article>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_KEY'></FormattedMessage>}
            >
                {getFieldDecorator('contentName', {
                    rules: [{
                        // required: true, message: 'Please input your skill name!',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_VALUE'></FormattedMessage>}
            >
                {getFieldDecorator('contentValue', {
                    rules: [{
                        // required: true, message: 'Please input your skill description!'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <div {...lineStyle}></div>
            <h3 {...titleStyle}><FormattedMessage id='CREATE_SKILL_TITLE3'></FormattedMessage></h3>
            <article {...descStyle}><FormattedMessage id='CREATE_SKILL_DESC3'></FormattedMessage></article>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_EMAIL'></FormattedMessage>}
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        // required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={<FormattedMessage id='TABLE_TITLE_SMS'></FormattedMessage>}
            >
                {getFieldDecorator('phoneNumber', {
                    rules: [{
                        // required: true, message: 'Please input your phone number!' 
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/skills`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const SkillCreateForm = Form.create()(CreateForm)

@inject('skillStore') @observer
class SkillCreate extends Component {
    render() {
        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.skillStore.loading}>
                <SkillCreateForm />
            </Spin>
        </Layout>
    }
}

export default SkillCreate

