import deviceService from '../services/deviceService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class DeviceStore {

    @observable _devicesList = null
    @observable loading = false

    @computed get devicesList() {
        return this._devicesList ? toJS(this._devicesList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getDevices(userId) {
        this.loading = true
        this.service.fetchDevices(userId).then(res => {
            this._devicesList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getDevice(id, userId) {
        return this.service.fetchDevice(id, userId)
    }

    @action addDevice(params, userId) {
        this.loading = true
        this.service.createDevice(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/devices`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateDevice(params, userId) {
        this.loading = true
        this.service.updateDevice(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/devices`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let deviceStore = new DeviceStore(deviceService)

export default deviceStore