import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Layout, Spin, Button, Form, Input, Select, message } from 'antd'
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

@inject('roomStore', 'roomTypeStore', 'hotelStore', 'deviceStore') @observer
class EditFormWrapper extends Component {

    componentDidMount() {
        this.props.roomTypeStore.getRoomTypes(1)
        this.props.hotelStore.getHotels(1)
        this.props.deviceStore.getDevices(1)
        if (this.props.id) {
            this.props.roomStore.loading = true
            this.props.roomStore.getRoom(this.props.id).then(res => {
                const { roomNo, roomName, roomDesc, roomTypeId, hotelId, deviceIds } = res.data
                const defaultValues = { roomNo, roomName, roomDesc, roomTypeId: roomTypeId + '', hotelId: hotelId + '', deviceIds }
                this.props.form.setFieldsValue({
                    ...defaultValues
                })
                this.props.form.validateFields()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => {
                this.props.roomStore.loading = false
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
                this.props.roomStore.updateRoom(params)
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError } = this.props.form;

        const { roomTypesList } = this.props.roomTypeStore
        const { hotelsList } = this.props.hotelStore
        const { devicesList } = this.props.deviceStore

        return <Form style={{ width: '80%' }}>
            <FormItem
                {...formItemLayout}
                label='Room Number'>
                {getFieldDecorator('roomNo', {
                    rules: [{
                        required: true, message: 'Please input your roomNo',
                    }],
                })(
                    <Input maxLength={20} />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Name'>
                {getFieldDecorator('roomName', {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Desc'>
                {getFieldDecorator('roomDesc', {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Room Type'>
                {getFieldDecorator('roomTypeId', {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Select
                        optionFilterProp='children'
                        showSearch>
                        {roomTypesList.data ? roomTypesList.data.map(roomType => {
                            return <Option key={roomType.id} value={roomType.id + ''}>{roomType.roomTypeName}</Option>
                        }) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Hotel'>
                {getFieldDecorator('hotelId', {
                    rules: [{
                        // required: true, message: 'Please input your Content text'
                    }],
                })(
                    <Select
                        optionFilterProp='children'
                        showSearch>
                        {hotelsList.data ? hotelsList.data.map(hotel => {
                            return <Option key={hotel.id} value={hotel.id + ''}>{hotel.name}</Option>
                        }) : null}
                    </Select>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='Devices'>
                {getFieldDecorator('deviceIds', {
                    valuePropName: 'value',
                    // initialValue: [...],
                }, {
                        rules: [{
                            // required: true, message: 'Please input your Content text'
                        }],
                    })(
                        <Select
                            mode="multiple"
                            optionFilterProp='children'
                            placeholder="Please select Devices"
                            showSearch>
                            {devicesList.data ? devicesList.data.map(device => {
                                return <Option key={device.id} value={device.id}>{device.name}</Option>
                            }) : null}
                        </Select>
                    )}
            </FormItem>
            <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" disabled={hasErrors(getFieldsError())} onClick={this.handleSubmit}><FormattedMessage id='SAVE'></FormattedMessage></Button>
                <Button style={{ marginLeft: 20 }} onClick={() => { location.href = `./#/rooms`; }}><FormattedMessage id='CANCEL'></FormattedMessage></Button>
            </FormItem>
        </Form>
    }
}

const EditForm = Form.create()(EditFormWrapper)

@inject('roomStore') @observer
class RoomEdit extends Component {
    render() {
        const id = this.props.match.params.id

        return <Layout style={{ marginTop: 20 }}>
            <Spin spinning={this.props.roomStore.loading}>
                <EditForm id={id} />
            </Spin>
        </Layout>
    }
}

export default RoomEdit

