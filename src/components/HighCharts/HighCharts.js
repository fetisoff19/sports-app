import React, {useEffect, useRef} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting';
import {getMinSec} from "../../API/functionsDate&Values";
import {dict, userLang, chartsConfig} from "../../config/config";

Exporting(Highcharts);

const Charts = ({name, data,


                  addPolylinePowerCurve,

                  selection,
  setLoaded,
                  xAxis,
  exporting,
  tooltip,
                  mouseOver,
                  mouseOut,
                  style,
                  name2,
                  data2,
                  credits,
                  animation,
                }) => {

  useEffect(() => {
    if(name === 'powerCurve')
      Highcharts.charts.forEach((chart) =>
        chart.series[0].name === 'powerCurve' ?
          chart.xAxis[0].setExtremes(chart.xAxis[0].min,
            chart.xAxis[0].max < 1200 ? chart.xAxis[0].max
              : chart.xAxis[0].max < 5600 ? 1200
                :chart.xAxis[0].max < 10800 ? 4800 : 7200)
          : null)
    return () => {
      while (Highcharts.charts.length > 0) {
        Highcharts.charts.pop();
      }
    }
  },[])

  let plotLinesText = `${chartsConfig[name].plotLinesText && dict.fields[chartsConfig[name].plotLinesText][userLang]} 
    ${name === 'pace'
      ? getMinSec(data.avg) 
        : (data.avg ? data.avg.toString().replaceAll('.', ',') : '')} 
    ${data.sport === 'running' && name === 'cadence'
      ? dict.units[chartsConfig[name].plotLinesTextValueRunning][userLang]
        : dict.units[chartsConfig[name].plotLinesTextValue][userLang]}`

  const options = {
    series: [{
      data: data.data,
      name: name,
      color: chartsConfig[name].lineColor,
      lineWidth: 1,
      marker: { radius: 1 },
      zIndex: 2,
      point: {
        events:{
          mouseOver: addPolylinePowerCurve && mouseOver ? function (){
            addPolylinePowerCurve(this, ...mouseOver)
  } : null,
          mouseOut: mouseOut || null,
        },
      },
    },
    {
      data: data2?.data,
      name: name2 && null,
      color: data2 && chartsConfig[name2].lineColor,
      lineWidth: 1,
      zIndex: 1,
      marker: { radius: 1 },
      },
    ],

    accessibility: {
      enabled: false
    },
    credits: credits || false,
    chart: {
      // backgroundColor: chartsConfig[name]?.reversed ? chartsConfig[name].lineColor : 'white',
      margin: [40, 0, 20, 0],
      marginLeft: 0,
      height: style.height,
      width: style.width,
      spacingTop: 0,
      type: 'areaspline',
      // styledMode: true,
      zoomType: 'x',
      resetZoomButton: {
        position:
        // data2
        //   ? {x: - 1, y: 0,} :
          {x: 5000, y: 1000,},
        // theme: {
          // backgroundColor: chartsConfig[name]?.reversed ? chartsConfig[name].lineColor : 'white' ,
          //   stroke: 'silver',
          //   states: {
          //   hover: {
          //     fill: config[name].themeColor,
          //       style: {
          //       display: 'none',
          //         color: config[name].themeLightBG,
          //     }
          //   }
          // }
        // }
      },
      panning: true,
      panKey: 'shift',
      events: {
        selection: selection || null,
        load: setLoaded || null,
        // render: function() {
        //   let chart = this;
        //
        //   chart.renderer
        //     .button("<<", 620, 40, () => refreshPosition (true, chart))
        //     .attr({
        //       zIndex: 3
        //     })
        //     .add();
        //   chart.renderer
        //     .button(">>", 660, 40, () => refreshPosition (false, chart))
        //     .attr({
        //       zIndex: 3
        //     })
        //     .add();
        //   chart.renderer
        //     .button("-", 620, 80, () => zoomOut(chart))
        //     .attr({
        //       zIndex: 3
        //     })
        //     .add();
        //   chart.renderer
        //     .button("+", 660, 80, () => zoomIn(chart))
        //     .attr({
        //       zIndex: 3
        //     })
        //     .add();
        //
        // }
      },
    },
    title: {
      enabled: false,
      text: '&#9900' + ' ' + dict.fields[chartsConfig[name].title][userLang],
        align: 'left',
        x: - 10,
        y: 30,
        style: {
        color: chartsConfig[name].themeColor,
        fontSize: '1rem',
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: xAxis || {
      // opposite: true,
      tickWidth: 0,
      // minorTickPosition: 'inside',
      showFirstLabel: false,
      labels: {
        enabled: true,
        formatter: function () {
          return this.value + dict.units.km[userLang];
        },
        y: 12,
      },
      min: 0,
      max: data.data.at(-1)[0],
    },
      yAxis: [{
    title: {
      enabled: false,
    },
        // gridZIndex: 2,
    min: data?.min || 0,
    labels: {
      align: 'left',
      x: 0,
      y: 12,
      zIndex: 5,
      style: {
        color: '#383838',
        textShadow: 'white 0 0 10px',
      }
    },
    reversed: chartsConfig[name]?.reversed,
    plotLines: [{
      color: '#383838',
      width: 1,
      value: data.avg ? data.avg : null,
      dashStyle: 'shortdash',
      label: {
        text: plotLinesText,
        align: 'right',
        x: - 5,
        y: 15,
        style:{
          fontWeight: 'bold',
          color: '#383838',
          textShadow: 'white 0 0 10px',
        }
      },
      zIndex: 4
    }],
  }],
    plotOptions: {
      series: {
        marker: {
          fillColor: chartsConfig[name].themeColor,
          // lineWidth: 1,
          // lineColor: 'black' // inherit from series
        },
        allowPointSelect: animation,
        states: {
          hover: {
            enabled: animation
          },
          inactive: {
            enabled: animation
          },
          select: {
            enabled: animation
          }
        },
      },
    areaspline: {
      fillOpacity: 1,
    },
  },
    tooltip: {
      enabled: tooltip || false,
      formatter: chartsConfig[name].formatter ? function (){
        // const date = this.color !== chartsConfig[name].lineColor
        //   ? powerCurveAllTimeMap.get(this.x).timestamp.toLocaleDateString() : null
        return chartsConfig[name].formatter(this.x, this.y)
       //  const date = this.color !== chartsConfig[name].lineColor
       //    ? powerCurveAllTimeMap.get(this.x).timestamp.toLocaleDateString() : null;
       //  const id = this.color !== chartsConfig[name].lineColor
       //    ? powerCurveAllTimeMap.get(this.x).id : null
       //
       //  return `<span>
       //  {chartsConfig[name].formatter(this.x, this.y)}
       //  <a href={'/workouts/' + id}>{date}</a>
       // </span>`
        // return (<span>{chartsConfig[name].formatter(this.x, this.y)}
        //   <Navigate to={'/workouts/' + id}>{date}</Navigate>
        // </span>)
      }  : null,
        // backgroundColor: {
        // linearGradient: [0, 0, 0, 60],
        //   stops: [
      //     [0, '#FFFFFF'],
      //     [1, '#E0E0E0']
      //   ]
      // },
      // borderWidth: 1,
      //   borderColor: '#AAA'
    },
    navigation: {
      buttonOptions: {
        y: 15,
        x: 10,
      },
    },
    exporting: {
      enabled: exporting || true,
      // enabled: false,
      buttons: {
        contextButton: {
          symbolStrokeWidth: 2,
          symbolStroke: chartsConfig[name].themeColor,
          symbol: 'menu',
          symbolFill: chartsConfig[name].themeColor,
        }
      },
    },
  }
  return (
    <div key={Date.now()} className={name}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        allowChartUpdate={false}
      />
    </div>
  );
};

export default Charts;