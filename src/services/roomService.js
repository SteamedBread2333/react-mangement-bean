import request from '../utils/request'

import config from './common'

export default {
    fetchRooms(userId = 1) {
        return request.get(`${config.BASE_URL}/rooms/${userId}`)
    },
    fetchRoom(id, userId = 1) {
        return request.get(`${config.BASE_URL}/rooms/${userId}/room/${id}`)
    },
    createRoom(params, userId = 1){
        return request.post(`${config.BASE_URL}/rooms/${userId}/add`, params)
    },
    updateRoom(params, userId = 1){
        return request.post(`${config.BASE_URL}/rooms/${userId}/update`, params)
    }
}