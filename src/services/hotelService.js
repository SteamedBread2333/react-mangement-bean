import request from '../utils/request'

import config from './common'

export default {
    fetchHotels(userId = 1) {
        return request.get(`${config.BASE_URL}/hotels/${userId}`)
    },
    fetchHotel(id, userId = 1) {
        return request.get(`${config.BASE_URL}/hotels/${userId}/hotel/${id}`)
    },
    createHotel(params, userId = 1){
        return request.post(`${config.BASE_URL}/hotels/${userId}/add`, params)
    },
    updateHotel(params, userId = 1){
        return request.post(`${config.BASE_URL}/hotels/${userId}/update`, params)
    }
}