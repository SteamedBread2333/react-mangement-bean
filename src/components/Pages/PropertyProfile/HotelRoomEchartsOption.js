export const getHotelRoomEchartsOption = hotelRoomData => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            top: '38%',
            left: 200,
            itemWidth: 15,
            itemHeight: 15,
            data: ['Enable', 'Disable',]
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                roseType: 'radius',
                center: ['25%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    ...hotelRoomData
                ]
            }
        ],
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
            return Math.random() * 200;
        },
    }
}