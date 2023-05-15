import Highcharts from "highcharts";
import Charts from "../../HighCharts/HighCharts";
import React from "react";

export function setCharts(data, order, setZooming) {
  if (data) {
    let result = []
    order.forEach(item => {
      if (data.charts[item].avg && data.charts[item].avg > 0 && data.charts[item].data.length)
        result.push(
          <Charts
          sport={data.sport}
          key={item}
          step={data.step}
          name={item} data={data.charts[item]}
          selection={() => {
            zooming();
            setZooming(true);
          }}
          style={{height: 210, width: 800}}/>
        )
    })
    return result
  }
}

export function getIndex(e, setIndex, ref, status) {
  if (!status) return
  let charts = Highcharts.charts;
  if (ref && charts?.length) {
    let width = +document.querySelector('.highcharts-plot-border').getAttribute('width')
    let rect = ref.getBoundingClientRect();
    let padding = charts[0].plotLeft;
    let x = (e.clientX - rect.x - padding);
    if (x < 0) x = 0;
    if (x > width) x = width;

    const getNumber = (arr, searchNum) =>
      arr.find(it =>
        Math.abs(it.clientX - searchNum)
        === Math.min(...arr.map(it => Math.abs(it.clientX - searchNum)))
      );

    let arrayPoints = charts[0].series[0].points;
    if (arrayPoints.length) {
      let step = Math.ceil(width / arrayPoints.length);
      let index = 0;
      let minIndex = arrayPoints.findIndex(item => Math.abs(x - item.clientX) <= step);
      let maxIndex = arrayPoints.findLastIndex(item => Math.abs(x - item.clientX) <= step);
      let arr = arrayPoints.slice(minIndex ? minIndex : 0, maxIndex ? maxIndex + 1 : arrayPoints.length - 1);
      if (arr.length) {
        index = getNumber(arr, x).index ? getNumber(arr, x).index : 0;
        setIndex(index)
      }
    }

    for (let chart of charts) {
      if (chart.series[0].name === 'powerCurve') continue;
      if (chart.customCrosshair) {
        chart.customCrosshair.element.remove();
      }
      chart.customCrosshair = chart.renderer.rect(+x + chart.plotLeft, chart.plotTop, 0.5, chart.plotSizeY).attr({
        fill: '#383838',
        zIndex: 1,
      }).add()
      // chart.tooltip.refresh([chart.series[0].points[index]]);
    }
  }
}

export function handleKeyboardDown(e, setZooming){
  let chart = Highcharts.charts[0] || null;
  let powerCurve = Highcharts.charts.at(-1) || null;

  switch (e.code) {
    case 'ArrowLeft':
      e.preventDefault();
      refreshPosition(true, chart);
      refreshPosition(true, powerCurve);
      break;
    case 'ArrowRight':
      e.preventDefault();
      refreshPosition(false, chart);
      refreshPosition(false, powerCurve);
      break;
    case 'NumpadAdd':
    case 'Equal':
    case 'ArrowUp':
      e.preventDefault();
      zoomIn(chart, setZooming);
      break;
    case 'NumpadSubtract':
    case 'Minus':
    case 'ArrowDown':
      e.preventDefault();
      zoomOut(chart, setZooming);
      break;
    case 'Enter':
    case 'NumpadEnter':
    case 'Space':
      e.preventDefault();
      resetZoom();
      setZooming(false)
      break;
  }
}

export function zooming () {
  Highcharts.charts.forEach(chart => {
    if (chart.series[0].name !== 'powerCurve')
      chart.xAxis[0].update({
        events: {
          afterSetExtremes: function (event) {
            Highcharts.charts.forEach(otherChart => {
              if ((otherChart.xAxis[0].min !== event.min || otherChart.xAxis[0].max !== event.max)
                && (otherChart.series[0].name !== 'powerCurve'))
                otherChart.xAxis[0].setExtremes(event.min, event.max)
            })
          }
        }
      })
  });
}

// dir ? left : right
export function refreshPosition (dir, chart) {
  if(!chart) return;
  let positionMinX = chart.xAxis[0].min;
  let positionMaxX = chart.xAxis[0].max;
  let offsetPlus = (positionMaxX - positionMinX) / 10;
  let offsetMinus = (positionMaxX - positionMinX) / 10;
  let dataMin = chart.xAxis[0].dataMin;
  let dataMax = chart.xAxis[0].dataMax;
  if (positionMinX - offsetMinus <= dataMin) {
    positionMinX = dataMin;
    offsetMinus = 0;
  }
  if (positionMaxX + offsetPlus >= dataMax) {
    positionMaxX = dataMax;
    offsetPlus = 0;
  }
  if (dir) chart.xAxis[0].setExtremes(positionMinX - offsetMinus, positionMaxX - offsetMinus);
  else chart.xAxis[0].setExtremes(positionMinX + offsetPlus, positionMaxX + offsetPlus);
}

export function zoomIn (chart, setZooming) {
  if(!chart) return;
  let positionMinX = chart.xAxis[0].min;
  let positionMaxX = chart.xAxis[0].max;
  let offsetPlus = (positionMaxX - positionMinX)/6;
  chart.xAxis[0].setExtremes(positionMinX + offsetPlus, positionMaxX - offsetPlus);
  setZooming(true);
  zooming();
}

export function zoomOut (chart, setZooming) {
  if(!chart) return;
  let positionMinX = chart.xAxis[0].min;
  let positionMaxX = chart.xAxis[0].max;
  let dataMin = chart.xAxis[0].dataMin;
  let dataMax = chart.xAxis[0].dataMax;
  let offsetPlus = (positionMaxX - positionMinX) / 10;
  let offsetMinus = (positionMaxX - positionMinX) / 10;
  if (positionMinX - offsetMinus <= dataMin) {
    setZooming(false);
    positionMinX = dataMin;
    offsetMinus = 0;
  }
  if (positionMaxX + offsetPlus >= dataMax) {
    setZooming(false);
    positionMaxX = dataMax;
    offsetPlus = 0;
  }
  chart.xAxis[0].setExtremes(positionMinX - offsetMinus, positionMaxX + offsetPlus);
}

export function resetZoom() {
  let chart = Highcharts.charts[0] || null;
  if(!chart) return;
  Highcharts.charts.forEach(chart =>
    chart.xAxis[0]
      .setExtremes(chart.xAxis[0].dataMin, chart.xAxis[0].dataMax)
  );
}