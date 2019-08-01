import hotelService from '../services/hotelService'

import { observable, computed, action, toJS } from 'mobx';
import { message } from 'antd'

class HotelStore {

    @observable _hotelsList = null
    @observable loading = false

    @computed get hotelsList() {
        return this._hotelsList ? toJS(this._hotelsList) : {};
    }

    constructor(service) {
        this.service = service
    }

    @action getHotels(userId) {
        this.loading = true
        this.service.fetchHotels(userId).then(res => {
            this._hotelsList = res
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }
    
    @action getHotel(id, userId) {
        return this.service.fetchHotel(id, userId)
    }

    @action addHotel(params, userId) {
        this.loading = true
        this.service.createHotel(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/hotels`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

    @action updateHotel(params, userId) {
        this.loading = true
        this.service.updateHotel(params, userId).then(res => {
            message.success('Success')
            location.href = `./#/hotels`
        }).catch(err => {
            message.error(err.message)
        }).finally(() => {
            this.loading = false
        })
    }

}

let hotelStore = new HotelStore(hotelService)

export default hotelStore