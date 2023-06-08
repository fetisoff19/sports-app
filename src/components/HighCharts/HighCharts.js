import React, {useEffect} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting';
import {getMinSec} from "../../API/functionsDate&Values";
import {dict, userLang, chartsConfig} from "../../config/config";

Exporting(Highcharts);

const Charts = props => {

  useEffect(() => {
    return () => {
      while (Highcharts.charts.length > 0) {
        Highcharts.charts.pop();
      }
    }
  },[])

  const animation = props.animation || false;

  const options = {
    series: [{
      data: props.data.data,
      name: props.name,
      color: chartsConfig[props.name].lineColor,
      lineWidth: 1,
      marker: { radius: 1 },
      zIndex: 2,
      point: {
        events:{
          mouseOver: props.addPolylinePowerCurve && props?.mouseOver ? function (){
            props.addPolylinePowerCurve(this, ...props.mouseOver)
  } : null,
          mouseOut: props?.mouseOut,
        },
      },
    },
    {
      data: props.data2?.data,
      name: props.name2 && null,
      color: props.data2 && chartsConfig[props.name2].lineColor,
      lineWidth: 1,
      zIndex: 1,
      marker: { radius: 1 },
      },
    ],

    accessibility: {
      enabled: false
    },
    credits: props.credits || false,
    chart: {
      // backgroundColor: chartsConfig[props.name]?.reversed ? chartsConfig[props.name].lineColor : 'white',
      margin: [40, 0, 20, 0],
      marginLeft: 0,
      height: props.style.height,
      width: props.style.width,
        spacingTop: 0,
        type: 'areaspline',
        // styledMode: true,
        zoomType: 'x',
        resetZoomButton: {
        position:
        // props.data2
        //   ? {x: - 1, y: 0,} :
        {x: 5000, y: 1000,},
        // theme: {
          // backgroundColor: chartsConfig[props.name]?.reversed ? chartsConfig[props.name].lineColor : 'white' ,
          //   stroke: 'silver',
          //   states: {
          //   hover: {
          //     fill: config[props.name].themeColor,
          //       style: {
          //       display: 'none',
          //         color: config[props.name].themeLightBG,
          //     }
          //   }
          // }
        // }
      },
      panning: true,
      panKey: 'shift',
      events: {
        selection: props.selection || null,
        load: props.setLoaded || null,
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
      text: '&#9900' + ' ' + dict.fields[chartsConfig[props.name].title][userLang],
        align: 'left',
        x: - 10,
        y: 30,
        style: {
        color: chartsConfig[props.name].themeColor,
        fontSize: '1rem',
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: props.xAxis || {
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
      max: props.data.data.at(-1)[0],
    },
      yAxis: [{
    title: {
      enabled: false,
    },
        // gridZIndex: 2,
    min: props.data.data.min || 0,
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
    reversed: chartsConfig[props.name]?.reversed,
    plotLines: [{
      color: '#383838',
      width: 1,
      value: props.data.avg ? props.data.avg : null,
      dashStyle: 'shortdash',
      label: {
        text: `${chartsConfig[props.name].plotLinesText && dict.fields[chartsConfig[props.name].plotLinesText][userLang]} 
          ${props.name === 'pace'
            ? getMinSec(props.data.avg) : props.data.avg} 
          ${props.sport === 'running' && props.name === 'cadence' 
            ? dict.units[chartsConfig[props.name].plotLinesTextValueRunning][userLang]
            : dict.units[chartsConfig[props.name].plotLinesTextValue][userLang]}`,
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
          fillColor: chartsConfig[props.name].themeColor,
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
      enabled: props.tooltip || false,
      formatter: chartsConfig[props.name].formatter ? function (){
        // const date = this.color !== chartsConfig[props.name].lineColor
        //   ? props.powerCurveAllTimeMap.get(this.x).timestamp.toLocaleDateString() : null
        return chartsConfig[props.name].formatter(this.x, this.y)
       //  const date = this.color !== chartsConfig[props.name].lineColor
       //    ? props.powerCurveAllTimeMap.get(this.x).timestamp.toLocaleDateString() : null;
       //  const id = this.color !== chartsConfig[props.name].lineColor
       //    ? props.powerCurveAllTimeMap.get(this.x).id : null
       //
       //  return `<span>
       //  {chartsConfig[props.name].formatter(this.x, this.y)}
       //  <a href={'/workouts/' + id}>{date}</a>
       // </span>`
        // return (<span>{chartsConfig[props.name].formatter(this.x, this.y)}
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
      enabled: props.exporting || true,
      // enabled: false,
      buttons: {
        contextButton: {
          symbolStrokeWidth: 2,
          symbolStroke: chartsConfig[props.name].themeColor,
          symbol: 'menu',
          symbolFill: chartsConfig[props.name].themeColor,
        }
      },
    },
  }
  return (
    <div key={new Date} className={props.name}>
      <HighchartsReact
        key={new Date + 1}
        highcharts={Highcharts}
        options={options}
        allowChartUpdate={false}
      />
    </div>
  );
};

export default Charts;