export const getDeviceEchartsOption = deviceData => {
    return {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '55%',
                roseType: 'radius',
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'left'
                    },
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: [
                    { value: deviceData.disable, name: 'Disable' },
                    { value: deviceData.enable, name: 'Enable' },
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