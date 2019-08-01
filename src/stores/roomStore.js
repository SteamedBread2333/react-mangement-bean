import roomService from '../services/roomService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class RoomStore {

    @observable _roomsList = null
    @observable loading = false

    @computed get roomsList() {
        return this._roomsList ? toJS(this._roomsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getRooms(userId) {
        this.loading = true
        this.service.fetchRooms(userId).then(res => {
            this._roomsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action getRoom(id, userId) {
        return this.service.fetchRoom(id, userId)
    }

    @action addRoom(params, userId) {
        this.loading = true
        this.service.createRoom(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/rooms`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateRoom(params, userId) {
        this.loading = true
        this.service.updateRoom(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/rooms`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let roomStore = new RoomStore(roomService)

export default roomStore