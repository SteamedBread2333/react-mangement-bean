import roomTypeService from '../services/roomTypeService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class RoomTypesStore {

    @observable _roomTypesList = null
    @observable loading = false

    @computed get roomTypesList() {
        return this._roomTypesList ? toJS(this._roomTypesList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getRoomTypes(userId) {
        this.loading = true
        this.service.fetchRoomTypes(userId).then(res => {
            this._roomTypesList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getRoomType(id, userId) {
        return this.service.fetchRoomType(id, userId)
    }

    @action addRoomType(params, userId) {
        this.loading = true
        this.service.createRoomType(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/roomTypes`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateRoomType(params, userId) {
        this.loading = true
        this.service.updateRoomType(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/roomTypes`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let roomTypeStore = new RoomTypesStore(roomTypeService)

export default roomTypeStore