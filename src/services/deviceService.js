import request from '../utils/request'

import config from './common'

export default {
    fetchDevices(userId = 1) {
        return request.get(`${config.BASE_URL}/devices/${userId}`)
    },
    fetchDevice(id, userId = 1) {
        return request.get(`${config.BASE_URL}/devices/${userId}/device/${id}`)
    },
    createDevice(params, userId = 1){
        return request.post(`${config.BASE_URL}/devices/${userId}/add`, params)
    },
    updateDevice(params, userId = 1){
        return request.post(`${config.BASE_URL}/devices/${userId}/update`, params)
    }
}