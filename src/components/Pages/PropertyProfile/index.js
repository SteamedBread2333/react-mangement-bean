import React, { Component } from 'react'
import { Layout, Skeleton, Card, Icon, Row, Col } from 'antd'
import { observer, inject } from 'mobx-react'
import styles from './style.less'
import ReactEchartsCore from 'echarts-for-react/lib/core';
// then import echarts modules those you have used manually.
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import { getDeviceEchartsOption } from './DeviceEchartsOption'


const { Meta } = Card;
const { Content } = Layout;

const chartsWrapperStyle = { width: '40vw', height: '30vh' }

@inject('propertyProfileStore', 'deviceStore', 'roomStore', 'hotelStore') @observer
class PropertyProfile extends Component {

    componentDidMount() {
        this.props.propertyProfileStore.getCountMap(1)
        this.props.deviceStore.getDevices(1)
        // this.props.roomStore.getRooms(1)
        // this.props.hotelStore.getHotels(1)
    }

    render() {
        const { loading, countMap } = this.props.propertyProfileStore
        const deviceData = { disable: 0, enable: 0 }

        // let hotelRoomData = {}

        const { devicesList } = this.props.deviceStore
        const { data: devices } = devicesList

        // const { roomsList } = this.props.roomStore
        // const { data: rooms } = roomsList        

        // const { hotelsList } = this.props.hotelStore
        // const { data: hotels } = hotelsList        

        if (devicesList && devices) {
            devices.map(device => {
                device.status ? deviceData.enable += 1 : deviceData.disable += 1
            })
        }

        // if(roomsList && rooms && hotelsList && hotels) {
        //     hotels.map(hotel => {
        //         rooms.map(room => {
        //             if(hotel.id === room.hotelId){
        //                 hotelRoomData[hotel.name]?
        //                 hotelRoomData[hotel.name] += 1
        //                 :  hotelRoomData[hotel.name] = 1
        //             }
        //         })
        //     })
        //     console.log(hotelRoomData)
        // }

        const PropertyProfileContent = () => <div className={styles['property-profile-content']}>
            {countMap.map((countObj, index) => <Card
                key={countObj.name || index}
                hoverable
                className={styles['pp-card']}
                actions={[<Icon type="profile" onClick={() => { location.href = `./#/${countObj.routeLinks[0]}` }} />, <Icon type="plus-square" onClick={() => { location.href = `./#/${countObj.routeLinks[1]}` }} />]}>
                <Skeleton loading={loading} paragraph={{ rows: 0 }} active>
                    <p className={styles['card-title']}>{countObj.name}:&nbsp;&nbsp;{countObj.counts}</p>
                </Skeleton>
            </Card>)}
        </div>

        return <Content className={styles['property-profile-page']}>
            <PropertyProfileContent />
            <Row className={styles['charts-wrapper']}>
                <Col span={12}>
                    <Card hoverable>
                        <Skeleton loading={!(devicesList && devicesList.data)} paragraph={{ rows: 1 }} active>
                            <p className={styles['card-title']}>Usage Rate Of Device</p>
                            <ReactEchartsCore
                                echarts={echarts}
                                style={chartsWrapperStyle}
                                option={getDeviceEchartsOption(deviceData)} />
                        </Skeleton>
                    </Card>
                </Col>
                <Col span={12}></Col>
            </Row>
        </Content>
    }
}

export default PropertyProfile

