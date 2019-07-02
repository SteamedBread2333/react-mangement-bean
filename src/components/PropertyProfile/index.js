import React, { Component } from 'react'
import { Layout, Skeleton, Card, Icon } from 'antd'
import styles from './style.less'

const { Meta } = Card;

class PropertyProfile extends Component {

    state = {
        loading: true,
    };

    componentDidMount() {
        setTimeout(() => { this.setState({ loading: !this.state.loading }) }, 1000)
    }

    render() {
        const { loading } = this.state;

        return <Layout className={styles['property-profile-content']}>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="experiment" theme="twoTone" />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="amazon" style={{color: '#1890ff'}} />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="shop" theme="twoTone" />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="experiment" theme="twoTone" />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="amazon" style={{color: '#1890ff'}} />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
            <Card
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = './#/skills' }} theme="twoTone" />, <Icon type="plus-square" onClick={() => { location.href = './#/skillsCreate' }} theme="twoTone" />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}><Icon type="shop" theme="twoTone" />&nbsp;&nbsp;16</p>
                </Skeleton>
            </Card>
        </Layout>
    }
}

export default PropertyProfile

