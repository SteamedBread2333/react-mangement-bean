import request from '../utils/request'

import config from './common'

export default {
    fetchIntents(userId = 1) {
        return request.get(`${config.BASE_URL}/intents/${userId}`)
    },
    fetchIntent(id, userId = 1) {
        return request.get(`${config.BASE_URL}/intents/${userId}/intent/${id}`)
    },
    createIntent(params, userId = 1){
        return request.post(`${config.BASE_URL}/intents/${userId}/add`, params)
    },
    updateIntent(params, userId = 1){
        return request.post(`${config.BASE_URL}/intents/${userId}/update`, params)
    }
}