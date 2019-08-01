import request from '../utils/request'

import config from './common'

export default {
    fetchSkills(userId = 1) {
        return request.get(`${config.BASE_URL}/skills/${userId}`)
    },
    fetchSkill(skillId = 1, userId = 1) {
        return request.get(`${config.BASE_URL}/skills/${userId}/skill/${skillId}`)
    },
    createSkill(params, userId = 1){
        return request.post(`${config.BASE_URL}/skills/${userId}/add`, params)
    },
    updateSkill(params, userId = 1){
        return request.post(`${config.BASE_URL}/skills/${userId}/update`, params)
    }
}