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

  const options = {
    series: [{
      data: props.data.data,
      name: props.name,
      color: chartsConfig[props.name].lineColor,
      lineWidth: 1,
      marker: { radius: 1 },
      point: {
        events:{
          mouseOver: props.f && props?.mouseOver ? function (){
            props.f(this, ...props.mouseOver)
  } : null,
          mouseOut: props?.mouseOut,
        },
      },
    }],
    accessibility: {
      enabled: false
    },
    credits: props.credits || false,
    chart: {
      margin: [40, 0, 20, 0],
      marginLeft: 0,
      height: props.style.height,
      width: props.style.width,
        spacingTop: 0,
        type: 'areaspline',
        // styledMode: true,
        zoomType: 'x',
        resetZoomButton: {
        position: {
          // x: 0,
          // y: -40,
          x: 5000,
          y: 1000,
        },
        // theme: {
        //   fill: config[props.name].themeLightBG,
        //     stroke: 'silver',
        //     states: {
        //     hover: {
        //       fill: config[props.name].themeColor,
        //         style: {
        //         display: 'none',
        //           color: config[props.name].themeLightBG,
        //       }
        //     }
        //   }
        // }
      },
      panning: true,
      panKey: 'shift',
      events: {
        selection: props.selection || null,
        load: props.setLoaded || null,
      },
    },
    title: {
      enabled: false,
      text: '&#9900' + ' ' + dict.fields[chartsConfig[props.name].title][userLang],
        align: 'left',
        x: - 10,
        y: 30,
        style: {
        color: chartsConfig[props.name].lineColor,
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
    min: props.data.data.min,
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
    reversed: chartsConfig[props.name].reversed,
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
    areaspline: {
      fillOpacity: 1,
    },
  },
    tooltip: {
      enabled: props.tooltip || false,
      formatter: chartsConfig[props.name].formatter ? chartsConfig[props.name].formatter : null,
        backgroundColor: {
        linearGradient: [0, 0, 0, 60],
          stops: [
          [0, '#FFFFFF'],
          [1, '#E0E0E0']
        ]
      },
      borderWidth: 1,
        borderColor: '#AAA'
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
          symbolStroke: chartsConfig[props.name].lineColor,
          symbol: 'menu',
          symbolFill: chartsConfig[props.name].lineColor,
        }
      },
    },
  }
  return (
    <div key={new Date}>
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