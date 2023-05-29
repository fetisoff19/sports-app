import {convertDistance, convertPace, convertSpeed, doubleValue, getHourMinSec} from "../API/functionsDate&Values";
import React from "react";
import NonValidateFile from "../components/AddWorkouts/components/NonValidateFile";

export let userLang = 'ru';
export const changeLanguage = b => b ? userLang = b : null;

export const dict = {
  fields: {
    date: {ru: 'Дата', en: 'Date'},
    timestamp: {ru: 'Окончание занятия', en: 'Workout end'},
    startTime: {ru: 'Начало занятия', en: 'Date'},
    totalElapsedTime: {ru: 'Продолжительность', en: 'Duration'},
    totalTimerTime: {ru: 'Время в движении', en: 'Moving time'},
    totalDistance: {ru: 'Расстояние', en: 'Distance'},
    totalStrides: {ru: 'Кол-во шагов', en: 'Strides'},
    totalCalories: {ru: 'Калории', en: 'Calories'},
    speed: {ru: 'Скорость', en: 'Speed'},
    avgSpeed: {ru: 'Средняя скорость', en: 'Average speed'},
    maxSpeed: {ru: 'Макс. скорость', en: 'Maximum speed'},
    minAltitude: {ru: 'Мин. высота', en: 'Minimum altitude'},
    altitude: {ru: 'Высота', en: 'Altitude'},
    avgAltitude: {ru: 'Средняя высота', en: 'Average altitude'},
    maxAltitude: {ru: 'Макс. высота', en: 'Maximum altitude'},
    avgGrade: {ru: 'Средний градиент', en: 'Average grade'},
    maxPosGrade: {ru: 'Макс. градиент', en: 'Maximum grade'},
    totalAscent: {ru: 'Набор высоты', en: 'Ascend'},
    totalDescent: {ru: 'Спуск', en: 'Descend'},
    sport: {ru: 'Вид занятия', en: 'Sport'},
    power: {ru: 'Мощность', en: 'Power'},
    avgPower: {ru: 'Средняя мощность', en: 'Average power'},
    maxPower: {ru: 'Макс. мощность', en: 'Maximum power'},
    normalizedPower:  {ru: 'Нормализованная мощность', en: 'Normalized power',},
    // hr: {ru: 'Пульс', en: 'Heart rate'},
    heartRate: {ru: 'Пульс', en: 'Heart rate'},
    minHeartRate: {ru: 'Мин. пульс', en: 'Minimum HR'},
    avgHeartRate: {ru: 'Средний пульс', en: 'Average HR'},
    maxHeartRate: {ru: 'Макс. пульс', en: 'Maximum HR'},
    cadence: {ru: 'Каденс', en: 'Cadence'},
    // cadenceCycling: {ru: 'Каденс', en: 'Cadence'},
    cadenceRun: {ru: 'Каденс', en: 'Cadence'},
    avgCadence: {ru: 'Средний каденс', en: 'Average cadence'},
    maxCadence: {ru: 'Макс. каденс', en: 'Average cadence'},
    avgRunningCadence: {ru: 'Средний каденс', en: 'Average cadence'},
    maxRunningCadence: {ru: 'Макс. каденс', en: 'Maximum cadence'},
    pace: {ru: 'Темп', en: 'Pace',},
    avgPace: {ru: 'Средний темп', en: 'Average pace',},
    enhancedMaxSpeed: {ru: 'Макс. темп', en: 'Maximum pace',},
    enhancedAvgSpeed: {ru: 'Средний темп', en: 'Average pace',},
    time: {ru: 'Время', en: 'Time',},
    trainingStressScore: {ru: 'TSS®', en: 'TSS®',},
    leftRightBalance: {ru: 'Баланс', en: 'Balance',},
    maxTemperature: {ru: 'Макс. температура', en: 'Maximum temperature',},
    avgTemperature: {ru: 'Средняя температура', en: 'Average temperature',},
    temperature: {ru: 'Температура', en: 'Temperature',},
    other: {ru: 'Другое', en: 'Other',},
  },
  units: {
    seconds: {ru: 'Секунды', en: 'Seconds'},
    s: {ru: 'с', en: 's'},
    m: {ru: 'м', en: 'm'},
    km: {ru: 'км', en: 'km'},
    mps: {ru: 'Метры в секунду', en: 'Meters per second'},
    kmph: {ru: 'км/ч', en: 'km/h'},
    bpm: {ru: 'уд/мин', en: 'bpm'},
    w: {ru: 'Вт', en: 'W'},
    cadenceCycling: {ru: 'об/мин', en: 'rpm'},
    cadenceRun: {ru: 'шагов/мин', en: 'spm'},
    pace: {ru: '/км', en: '/km'},
    degreeCelsius: {ru: '°C', en: '°C'},
    days: {ru: 'дней', en: 'day(s)'},
  },
  sports: {
    cycling: {ru: 'Велоспорт', en: 'Cycling'},
    running: {ru: 'Бег', en: 'Running'},
    walking: {ru: 'Прогулка', en: 'Walking',},
    swimming: {ru: 'Плавание', en: 'Swimming',}
  },
  ui: {
    default: {ru: 'По умолчанию', en: 'Default',},
    smoothing: {ru: 'Сглаживание', en: 'Smoothing'},
    createTraining: {ru: 'Создание тренировки', en: 'Create workout'},
    editTraining: {ru: 'Изменение тренировки', en: 'Edit workout'},
    placeholderText: {ru: 'Необходимо заполнить'},
    placeholderTime: {ru: 'чч:мм', en: 'hh:mm'},
    placeholderDistance: {ru: 'км', en: 'km'},
    placeholderNote: {ru: 'О тренировке', en: 'About workout',},
    close: {ru: 'Закрыть', en: 'Close',},
    save: {ru: 'Сохранить', en: 'Save',},
    edit: {ru: 'Изменить', en: 'Edit',},
    add: {ru: 'Добавить', en: 'Add'},
    view: {ru: 'Показать', en: 'View',},
    delete: {ru: 'Удалить', en: 'delete'},
    loading: {ru: 'Загрузка...', en: 'Loading...'},
    error: {ru: 'Произошла ошибка', en: 'Error'},
  },

  title: {
    settings: {ru: 'Настройки', en: 'Settings'},
    activities: {ru: 'Тренировки', en: 'Activities'},
    all: {ru: 'Все', en: 'All'},
    about: {ru: 'О проекте', en: 'About'},
    add: {ru: 'Добавить', en: 'Add'},
    dashBoard: {ru: 'Панель управления', en: 'Dashboard'},
    appLanguage: {ru: 'Язык приложения', en: 'App language'},
    title: {ru: 'Название', en: 'Title'},
    viewTraining: {ru: 'Просмотр тренировки'},
    workouts: {ru: 'Тренировки', en: 'Workouts'},
    stats: {ru: 'Статистика', en: 'Stats'},
    notes: {ru: 'Заметки', en: 'Notes'},
    analytics: {ru: 'Аналитика за период', en: 'Analytics for the period'},
    powerCurve: {ru: 'Кривая мощности', en: 'Power curve'},
    hideMap: {ru: 'Скрыть карту', en: 'Hide map'},
    showMap: {ru: 'Показать карту', en: 'Show map'},
    anchorMap: {ru: 'Закрепить карту', en: 'Anchor the map'},
    zoomIn: {ru: 'Приблизить', en: 'Zoom in'},
    zoomOut: {ru: 'Отдалить', en: 'Zoom out'},
    left: {ru: 'Левее', en: 'Left'},
    right: {ru: 'Правее', en: 'Right'},
    resetZoom: {ru: 'Сбросить', en: 'Reset'},
    goToDashboard: {ru: 'Перейти на главную страницу', en: 'Go to main page'},
    pageNotFound: {ru: 'Упс, страница не найдена', en: 'Oops, page not found!'},
    phraseValueBetter: {ru: 'больше среднего значения на ', en: 'better of the average value on'},
    out: {ru: 'Выйти', en: 'Out'},
    indoorWorkout:{ru: 'Занятие в помещении', en: 'Indoor workout',},
    info1: {ru: 'Используй стрелки на клавиатуре ' +
        'для управления графиками, ' +
        'а также пробел или Enter для сброса зума. Данные на графиках сжаты в '
      , en: 'перевести на иностранный'},
    info2: {ru: ' раз. Изменить значение можно в настройках',
      en: 'перевести на иностранный'},
    aboutApp1:{
      ru: 'Приложение создано в образовательных целях.\n' +
        'Просматривай активности, загрузив свои треки в расширении .fit' +
        ' или скачай мои файлы по ',
      en: 'перевести на иностранный'
    },
    aboutApp2:{
      ru:
        '\nСтабильная поддержка следующих видов спорта: велоспорт, бег. \n' +
        'Проверено на треках с устройств: garmin, wahoo, bryton, lezyne. \n' +
        'Репозиторий: ',
      en: 'перевести на иностранный'
    },
    footer1: {ru: 'Размер базы: ',
      en: 'перевести на иностранный'
    },
    footer2: {ru: ' Мб. Занимает ',
      en: 'перевести на иностранный'
    },
    footer3: {ru: 'менее',
      en: 'перевести на иностранный'
    },
    footer4: {ru: ' % от выделенной браузером памяти.',
      en: 'перевести на иностранный'
    },
    settingInfo: {
      ru: 'Значение величины сглаживания: ' +
        '\n1 - точки на графиках соответствуют точкам трека с твоего устройства,' +
        '\n16 - отображается усредненное значение за 16 секунд записи трека.' +
        '\nЕсли производительность устройства недостаточна, увеличь значение',
      en: 'перевести на иностранный'
    },
    nonValidateFile: {ru: 'Тип импортируемого файла не поддерживается',
     en: 'Imported file type is not supported'},
    duplicateFile: {ru: 'Этот файл уже загружен',
      en: 'This file has already been uploaded'},
    more: {ru: 'Подробнее', en: 'More'},
  },
  month:{
    0: {ru: 'Января', en: 'January'},
    1: {ru: 'Февраля', en: 'February'},
    2: {ru: 'Марта', en: 'March'},
    3: {ru: 'Апреля', en: 'April'},
    4: {ru: 'Мая', en: 'June'},
    5: {ru: 'Июня', en: 'Settings'},
    6: {ru: 'Июля', en: 'July'},
    7: {ru: 'Августа', en: 'August'},
    8: {ru: 'Сентября', en: 'September'},
    9: {ru: 'Октября', en: 'October'},
    10: {ru: 'Ноября', en: 'November'},
    11: {ru: 'Декабря', en: 'December'},

  },
};

export const configMainStats = {
  totalDistance: {
    formatter: value => convertDistance(value).toString().replace('.', ','),
    unit: 'km',
    label: 'totalDistance',
  },
  totalTimerTime: {
    formatter: getHourMinSec,
    label: 'totalElapsedTime',
  },
  enhancedAvgSpeed: {
    formatter: convertSpeed,
    uniqueFormatter: convertPace,
    unit: 'kmph',
    uniqueUnit: 'pace',
    uniqueSport: 'running',
    label: 'avgSpeed',
    uniqueLabel: 'avgPace',
  },
  totalAscent: {
    formatter: Math.round,
    unit: 'm',
    label: 'totalAscent',
  },
  avgHeartRate: {
    formatter: Math.round,
    unit: 'bpm',
    label: 'avgHeartRate',
  },
  avgPower: {
    formatter: Math.round,
    unit: 'w',
    label: 'avgPower',
  },
}

export let statsFields = {
  heartRate: {
    fields: [
      'maxHeartRate',
      'avgHeartRate',
    ],
    formatter: Math.round,
    unit: 'bpm',
  },
  speed: {
    fields: [
      'maxSpeed',
      'avgSpeed',
    ],
    formatter: convertSpeed,
    unit: 'kmph',
  },
  pace: {
    fields: [
      'enhancedMaxSpeed',
      'enhancedAvgSpeed',
    ],
    formatter: convertPace,
    unit: 'pace',
  },
  power: {
    fields: [
      'maxPower',
      'normalizedPower',
      'avgPower',
    ],
    formatter: Math.round,
    unit: 'w',
  },
  time: {
    fields: [
      'totalTimerTime',
      'totalElapsedTime',
      'timestamp',
      'startTime',
    ],
    formatter: getHourMinSec,
    unit: null,
  },
  cadenceRun: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    formatter: doubleValue,
    unit: 'cadenceRun',
  },
  cadence: {
    fields: [
      'maxCadence',
      'avgCadence',
    ],
    formatter: Math.round,
    unit: 'cadenceCycling',
  },
  altitude: {
    fields: [
      'totalAscent',
      'totalDescent',
      'maxAltitude',
      'minAltitude',
    ],
    formatter: Math.round,
    unit: 'm',
  },
  temperature: {
    fields: [
      'maxTemperature',
      'avgTemperature',
    ],
    formatter: Math.round,
    unit: 'degreeCelsius',
  },
  other: {
    fields: [
      'totalStrides',
      'trainingStressScore',
      'totalCalories',
    ],
    formatter: null,
    unit: null,
  }
}
