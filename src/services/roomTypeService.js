import request from '../utils/request'

import config from './common'

export default {
    fetchRoomTypes(userId = 1) {
        return request.get(`${config.BASE_URL}/roomtypes/${userId}`)
    },
    fetchRoomType(id, userId = 1) {
        return request.get(`${config.BASE_URL}/roomtypes/${userId}/roomtype/${id}`)
    },
    createRoomType(params, userId = 1){
        return request.post(`${config.BASE_URL}/roomtypes/${userId}/add`, params)
    },
    updateRoomType(params, userId = 1){
        return request.post(`${config.BASE_URL}/roomtypes/${userId}/update`, params)
    }
}