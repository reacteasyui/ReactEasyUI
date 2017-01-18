(function(root, factory) {
    factory({}, root.echarts);
}(window, function(exports, echarts) {
    var log = function(msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }

    //dma样式
    var colorPalette = [
        '#ff4f4f', '#0099ff', '#57d480','#febd57','#9a25ff','#43a647',"#8893AF"
    ];

    var theme = {
        color: colorPalette,

        title: {
            textStyle: {
                fontWeight: 'normal',
                color: '#008acd'
            }
        },

        visualMap: {
            itemWidth: 15,
            color: ['#5ab1ef', '#e0ffff']
        },

        toolbox: {
            iconStyle: {
                normal: {
                    borderColor: colorPalette[0]
                }
            }
        },

        tooltip: {
            backgroundColor: 'rgba(50,50,50,0.5)',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#008acd'
                },
                crossStyle: {
                    color: '#008acd'
                },
                shadowStyle: {
                    color: 'rgba(200,200,200,0.2)'
                }
            }
        },

        dataZoom: {
            dataBackgroundColor: '#efefff',
            fillerColor: 'rgba(182,162,222,0.2)',
            handleColor: '#008acd'
        },

        grid: {
            borderWidth: 0,
            borderColor: '#eee'
        },

        categoryAxis: {
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['#eee']
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#EEEEEE'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#8a8a8a'
                }
            },
            nameTextStyle: {
                color: '#8a8a8a'
            },
            axisTick: {
                show: false,
                length: 5,
                lineStyle: {
                    color: '#aaa'
                }
            },
        },

        valueAxis: {
            axisLine: {
                lineStyle: {
                    color: '#EEEEEE',
                }
            },
            splitArea: {
                show: false,
                areaStyle: {
                    color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                }
            },
            nameTextStyle: {
                color: '#8a8a8a',
            },
            axisLabel: {
                textStyle: {
                    color: '#8a8a8a'
                }
            },
            axisTick: {
                show: false
            },
            splitArea: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: ['#f4f4f4', '#fff']
                }
            }
        },
        timeline: {
            lineStyle: {
                color: '#008acd'
            },
            controlStyle: {
                normal: {
                    color: '#008acd'
                },
                emphasis: {
                    color: '#008acd'
                }
            },
            symbol: 'emptyCircle',
            symbolSize: 3
        },
        line: {
            smooth: true,
            symbol: 'emptyCircle',
            symbolSize: 6,
        },
        candlestick: {
            itemStyle: {
                normal: {
                    color: '#d87a80',
                    color0: '#2ec7c9',
                    lineStyle: {
                        color: '#d87a80',
                        color0: '#2ec7c9'
                    }
                }
            }
        },
        scatter: {
            symbol: 'circle',
            symbolSize: 4
        },
        map: {
            label: {
                normal: {
                    textStyle: {
                        color: '#d87a80'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#eee',
                    areaColor: '#ddd'
                },
                emphasis: {
                    areaColor: '#fe994e'
                }
            }
        },
        graph: {
            color: colorPalette
        },
        gauge: {
            axisLine: {
                lineStyle: {
                    color: [
                        [0.2, '#2ec7c9'],
                        [0.8, '#5ab1ef'],
                        [1, '#d87a80']
                    ],
                    width: 10
                }
            },
            axisTick: {
                splitNumber: 10,
                length: 15,
                lineStyle: {
                    color: 'auto'
                }
            },
            splitLine: {
                length: 22,
                lineStyle: {
                    color: 'auto'
                }
            },
            pointer: {
                width: 5
            }
        }
    };
    echarts.registerTheme('macarons', theme);
}));