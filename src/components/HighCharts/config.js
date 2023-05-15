import {dict, userLang} from "../../config/config";
import {getHourMinSec, getMinSec} from "../../API/functionsDate&Values";

//конфиги графиков

export const chartsConfig = {
  speed: {
    title: dict.fields.speed[userLang],
    plotLinesText: dict.fields.avgSpeed[userLang],
    plotLinesTextValue: dict.units.kmph[userLang],
    lineColor: '#11a9ed',
    reversed: false,

  },
  pace: {
    title: dict.fields.pace[userLang],
    plotLinesText: dict.fields.avgPace[userLang],
    plotLinesTextValue: dict.units.pace[userLang],
    lineColor: '#11a9ed',
    reversed: true,
  },
  power: {
    title: dict.fields.power[userLang],
    plotLinesText: dict.fields.avgPower[userLang],
    plotLinesTextValue: dict.units.w[userLang],
    lineColor: '#6bc531',
    reversed: false,
  },
  heartRate: {
    title: dict.fields.heartRate[userLang],
    plotLinesText: dict.fields.avgHeartRate[userLang],
    plotLinesTextValue: dict.units.bpm[userLang],
    lineColor: '#ff0035',
    reversed: false,
  },
  cadence: {
    title: dict.fields.cadence[userLang],
    plotLinesText: dict.fields.avgCadence[userLang],
    plotLinesTextValue: dict.units.cadenceCycling[userLang],
    plotLinesTextValueRunning: dict.units.cadenceRun[userLang],
    lineColor: '#c74cb1',
    reversed: false,
  },
  altitude: {
    title: dict.fields.altitude[userLang],
    plotLinesText: dict.fields.avgAltitude[userLang],
    plotLinesTextValue: dict.units.m[userLang],
    lineColor: '#750bc4',
    reversed: false,
  },
  powerCurve: {
    title: dict.title.powerCurve[userLang],
    plotLinesText: '',
    plotLinesTextValue: dict.units.w[userLang],
    lineColor: '#02afaf',
    reversed: false,
    formatter: function () {
      let x = this.x;
      if (x < 60) return `${x}${dict.units.s[userLang]}<br>${this.y} ${dict.units.w[userLang]}`
      else
      {
        x = getHourMinSec(this.x)
        return `${x}<br>${this.y}${dict.units.w[userLang]}`;
      }
    },
    options: {
      xAxis: {
        tickWidth: 1,
        tickLength: 0,
        minorTickPosition: 'outside',
        showFirstLabel: true,
        labels: {
          formatter: function () {
            if (this.value < 60) return this.value + dict.units.s[userLang];
            else return getHourMinSec(this.value)
          },
          enabled: true,
          y: 12,
        },
        min: 1,
      }
    }
  },
  powerCurveAllTime: {
    title: dict.title.powerCurve[userLang],
    plotLinesText: '',
    plotLinesTextValue: dict.units.w[userLang],
    lineColor: '#2fa65a',
    reversed: false,
  },
}
