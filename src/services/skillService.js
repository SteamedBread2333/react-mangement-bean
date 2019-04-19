import request from '../utils/request'

import config from './common'

export default {
    fetchSkills(userId = 1) {
        return request.get(`${config.BASE_URL}/skill/user/${userId}`)
    },
    fetchSkill(skillId = 1) {
        return request.get(`${config.BASE_URL}/skill/${skillId}`)
    },
    createSkill(params){
        return request.post(`${config.BASE_URL}/skill/add`, params)
    },
    updateSkill(params){
        return request.post(`${config.BASE_URL}/skill/update`, params)
    }
    // fetchSkills(userId = 1) {
    //     // console.log('rzh', config.BASE_URL)
    //     return request.get(`http://10.200.3.121/${config.BASE_URL}/skill/${userId}`)
    // }
}