import skillService from '../services/skillService'
import {observable, computed, action} from 'mobx';
import {message} from 'antd'

class SkillStore {

    @observable skills = []

    constructor(service) {
        this.service = service
    }

    @action getSkills(userId) {
        this.service.fetchSkills(userId).then(res => {
            console.log(res)
            message.success('success')
        }).catch(() => {
            message.error('error')
        })
    }

}

let skillStore = new SkillStore(skillService)

export default skillStore