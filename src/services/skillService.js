import request from '../utils/request'

import config from './common'

export default {
    fetchSkills(userId = 1) {
        console.log('rzh', config.BASE_URL)
        return request.get(`${config.BASE_URL}/skill/${userId}`)
    }
}