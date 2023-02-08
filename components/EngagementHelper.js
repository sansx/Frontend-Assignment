export default {
  engagementMessageOverTimeChartOptions: (channels, messageCountList, minCount = 1) => {
    let obj = {}

    if (!Array?.isArray(messageCountList)) return {}

    messageCountList?.map(msgList => {
      let { count, timeBucket, channelId } = msgList
      if (!obj?.hasOwnProperty(channelId)) obj[channelId] = []
      obj[channelId]?.push({ count, timeBucket })
    });

    let arr = Object?.keys(obj)?.filter(e => obj[e]?.length > minCount)
    let targetChannels = channels?.filter(e => arr?.includes(e?.id))
    let channelsData = targetChannels?.map(({ label, id }) => ({
      name: label,
      data: obj[id]?.map(({ count, timeBucket }) => [new Date(timeBucket)?.getTime(), count * 1]) || [],
      color: '#028786'
    }))
    let options = {
      chart: {
        backgroundColor: "#22222C",
        type: "spline",
        height: "400px",
        spacingTop: 30
      },
      title: null,
      xAxis: {
        crosshair: {
          snap: true
        },
        showFirstLabel: true,
        type: 'datetime',
        minTickInterval: 1,
        labels: {
          format: '{value:%d %b}',
        },
        lineColor: "#595A5E",
        tickColor: "#595A5E",
        alignTicks: false,
        tickPositioner: function (min, max) {
          return this?.getLinearTickPositions(this?.tickInterval, min, max)?.map(e => e + 12 * 3600 * 1000)
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        },
      },
      yAxis: {
        title: {
          text: null
        },
        gridLineWidth: 0,
        tickPosition: "outside",
        tickLength: 10,
        tickWidth: 1,
        tickColor: "#595A5E",
      },
      tooltip: {
        headerFormat: '<b>{series?.name}</b><br>',
        pointFormat: '{point?.y} messages on {point?.x:%b %d}',
        borderWidth: 2,
        backgroundColor: "#0C0C0F",
        style: {
          color: "#C3C3C4"
        }
      },
      legend: {
        backgroundColor: "#15161B",
        itemStyle: {
          color: "#C3C3C4"
        },
        itemHoverStyle: {
          color: "#fff"
        }
      },
      series: channelsData,
    };
    return options
  }
}