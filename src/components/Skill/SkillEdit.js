import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx';
import { Layout, Spin, Button, Form, Input, message } from 'antd'
import { FormattedMessage } from 'react-intl';
import { is, fromJS } from 'immutable';

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
    wrapperCol: { span: 8 }
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('skillStore') @observer
class EditForm extends Component {

    @observable params = null
    @observable skillId = null
    @observable contentId = null
    @observable contractsId = null

    componentDidMount() {
        this.props.skillStore.loading = true
        this.props.skillStore.getSkill(this.props.skillId).then(res => {
            let data = res.data || {}
            data.skill = data.skill || {}
            data.content = data.content || {}
            data.contacts = data.contacts || {}
            this.skillId = data.skill.id
            this.contentId = data.content ? data.content.id : null
            this.contractsId = data.contracts ? data.contracts.id : null
            const defaultValues = {
                name: data.skill.name,
                description: data.skill.description,
                contentName: data.content.name,
                contentValue: data.content.text,
                email: data.contacts.email,
                phoneNumber: data.contacts.phoneNumber,
            }
            this.props.form.setFieldsValue({
                ...defaultValues
            })
            this.props.form.validateFields()
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.props.skillStore.loading = false
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.params = {}
            this.params.skill = {
                name: values.name,
                description: values.description
            }
            this.params.content = {
                name: values.contentName,
                text: values.contentValue
            }
            this.params.contacts = {
                email: values.email,
                phoneNumber: values.phoneNumber
            }
            if (this.skillId) {
                this.params.skill.id = this.skillId
            }
            if (this.contentId) {
                this.params.content.id = this.contentId
            }
            if (this.contractsId) {
                this.params.contacts.id = this.contractsId
            }
            if (!err) {
                this.props.skillStore.updateSkill(this.params)
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

const SkillEditForm = Form.create()(EditForm)

@inject('skillStore') @observer
class SkillEdit extends Component {
    render() {
        const skillId = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.skillStore.loading}>
                <SkillEditForm skillId={skillId} />
            </Spin>
        </Layout>
    }
}

export default SkillEdit

