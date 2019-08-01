import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input, Checkbox, Select, message } from 'antd'
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 8 },
};

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@inject('intentStore', 'contentStore', 'contactStore') @observer
class EditFormWrapper extends Component {

    state = {
        needContentChecked: false,
        needContactChecked: false,
    };

    componentDidMount() {
        this.props.contentStore.getContents(1);
        this.props.contactStore.getContacts(1);
        if (this.props.id) {
            this.props.intentStore.loading = true
            this.props.intentStore.getIntent(this.props.id, 1).then(res => {
                const { name, description, needContent, contentId, needContact, contactId, } = res.data
                let defaultValues = { name, description, needContent, contentId, needContact, contactId, }
                this.setState({ needContentChecked: needContent, needContactChecked: needContact, }, () => {
                    // this.props.form.validateFields(['contactId', 'contentId'])
                })
                this.props.form.setFieldsValue({
                    ...defaultValues
                })
                this.props.form.validateFields()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.props.intentStore.loading = false
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
                this.props.intentStore.updateIntent(params, 1)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldValue, validateFields } = this.props.form;
        const { contentsList } = this.props.contentStore
        const { contactsList } = this.props.contactStore
        const { needContentChecked, needContactChecked } = this.state

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Name'>
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your Intent name',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Description'>
                {getFieldDecorator('description', {
                    rules: [{
                        // required: true, message: 'Please input your Intent description'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout} label='Need Content'>
                {getFieldDecorator('needContent', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <Checkbox onChange={e => {
                        this.setState({ needContentChecked: e.target.checked }, () => {
                            validateFields(['contentId'])
                        })
                    }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Content'
            >
                {getFieldDecorator('contentId', {
                    rules: [{
                        required: needContentChecked, message: 'Please select your Content'
                    }],
                })(
                    <Select
                        disabled={!getFieldValue('needContent')}
                        placeholder="Select a Content"
                        optionFilterProp='children'
                        showSearch
                    // onChange={this.handleSelectChange}
                    >
                        {contentsList.data ? contentsList.data.map(content => <Option key={content.id} value={content.id}>{content.name}</Option>) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout} label='Need Contact'>
                {getFieldDecorator('needContact', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <Checkbox onChange={e => {
                        this.setState({ needContactChecked: e.target.checked }, () => {
                            validateFields(['contactId'])
                        })
                    }} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Contact'>
                {getFieldDecorator('contactId', {
                    rules: [{
                        required: needContactChecked, message: 'Please select your Contact'
                    }],
                })(
                    <Select
                        disabled={!getFieldValue('needContact')}
                        placeholder="Select a Contact"
                        optionFilterProp='children'
                        showSearch
                    // onChange={this.handleSelectChange}
                    >
                        {contactsList.data ? contactsList.data.map(contact => <Option key={contact.id} value={contact.id}>{contact.name}</Option>) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/intents`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const EditForm = Form.create()(EditFormWrapper)

@inject('intentStore') @observer
class IntentEdit extends Component {
    render() {

        const id = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.intentStore.loading}>
                <EditForm id={id} />
            </Spin>
        </Layout>
    }
}

export default IntentEdit

