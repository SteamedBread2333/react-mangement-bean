import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input, Select, message } from 'antd'
import { FormattedMessage } from 'react-intl';
import utils from './SkillUtils';

const FormItem = Form.Item
const { TextArea } = Input;
const { Option } = Select

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('skillStore', 'intentStore') @observer
class EditFormWrapper extends Component {

    componentDidMount() {
        this.props.intentStore.getIntents(1)
        if (this.props.id) {
            this.props.skillStore.getSkill(this.props.id).then(res => {
                const {
                    name,
                    description,
                    // test init
                    // intentIds = [11,12],
                    intentIds,
                    type,
                    status,
                    welcomeWord,
                    exitWord,
                    helpWord,
                } = res.data

                const defaultValues = { name, description, intentIds, type, status, welcomeWord, exitWord, helpWord, }
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
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let params = {
                id: this.props.id,
                ...values
            }
            // console.log(params)
            if (!err) {
                this.props.skillStore.updateSkill(params, 1)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const { intentsList } = this.props.intentStore

        return <Form style={{ width: '80%' }}>
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
                        // required: true, message: 'Please input your skill description!'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Intents'>
                {getFieldDecorator('intentIds', {
                    valuePropName: 'value',
                    // initialValue: [...],
                }, {
                    rules: [{
                        required: true, message: 'Please select Intents'
                    }],
                })(
                    <Select
                        mode="multiple"
                        optionFilterProp='children'
                        placeholder="Please select Intents">
                        {intentsList.data ? intentsList.data.map(intent => <Option key={intent.id} value={intent.id}>{intent.name}</Option>) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Type'>
                {getFieldDecorator('type', {
                    rules: [{
                        required: true, message: 'Please input your Skill Type'
                    }],
                })(
                    <Select
                        placeholder="Select a Type"
                    // onChange={this.handleSelectChange}
                    >
                        {utils.getSkillTypeEm().map((type, index) => <Option key={index} value={type}>{type}</Option>)}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Status'>
                {getFieldDecorator('status', {
                    rules: [{
                        required: true, message: 'Please input your Skill Status'
                    }],
                })(
                    <Select
                        placeholder="Select a Status"
                    // onChange={this.handleSelectChange}
                    >
                        {utils.getSkillStatusEm().map((status, index) => <Option key={index} value={status}>{status}</Option>)}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Welcome Word'
            >
                {getFieldDecorator('welcomeWord', {
                    rules: [{
                        // required: true, message: 'Please input your Skill welcomeWord!'
                    }],
                })(
                    <TextArea />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Exit Word'
            >
                {getFieldDecorator('exitWord', {
                    rules: [{
                        // required: true, message: 'Please input your skill exitWord!'
                    }],
                })(
                    <TextArea />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Help Word'
            >
                {getFieldDecorator('helpWord', {
                    rules: [{
                        // required: true, message: 'Please input your skill helpWord!'
                    }],
                })(
                    <TextArea />
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/skills`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const EditForm = Form.create()(EditFormWrapper)

@inject('skillStore') @observer
class SkillEdit extends Component {

    render() {
        const id = this.props.match.params.id
        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.skillStore.loading}>
                <EditForm id={id} />
            </Spin>
        </Layout>
    }
}

export default SkillEdit

