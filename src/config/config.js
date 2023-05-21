export let userLang = 'en';
export const changeLanguage = b => b ? userLang = b : null;
let fields = {
  timestamp: {
    type: 'object',
    input: 'datetime-local',
  },
  startTime: {
    type: 'object',
    input: 'datetime-local',
    required: true,
  },
  totalElapsedTime: {
    type: 'number',
    input: 'duration',
    required: true,
    units: 's',
  },
  totalTimerTime: {
    type: 'number',
    input: 'duration',
    units: 's',
  },
  totalDistance: {
    type: 'number',
    input: 'number',
    min: 0,
    units: 'm',
  },
  totalStrides: {
    type: 'number',
    input: 'number',
    min: 0,
  },
  totalCalories: {
    type: 'number',
    input: 'number',
    min: 0,
  },
  avgSpeed: {
    type: 'number',
    input: 'number',
    units: 'mps',
    min: 0,
  },
  maxSpeed: {
    type: 'number',
    input: 'number',
    units: 'mps',
    min: 0,
  },
  minAltitude: {
    type: 'number',
    input: 'number',
    units: 'm',
  },
  avgAltitude: {
    type: 'number',
    input: 'number',
    units: 'm',
  },
  maxAltitude: {
    type: 'number',
    input: 'number',
    units: 'm',
  },
  avgGrade: {
    type: 'number',
    input: 'number',
    units: '%',
  },
  maxPosGrade: {
    type: 'number',
    input: 'number',
    units: '%',
  },
  totalAscent: {
    type: 'number',
    input: 'number',
    units: 'm',
  },
  totalDescent: {
    type: 'number',
    input: 'number',
    units: 'm',
  },
  sport: {
    type: 'string',
    input: 'select',
    selectOptions: ['cycling','running'],
  },
  // avgHeartRate: "Средний пульс",
  // minHeartRate: "Мин. пульс",
  // maxHeartRate: "Макс. пульс",
  // avgCadence: "Средний каденс",
  // maxCadence: "Макс. каденс",
  // avgRunningCadence: "Средний каденс",
  // avgPower: "Средняя мощность",
  // name: "Название занятия",
  // dateAdded: "Занятие загружено",
  // note: "Описание",
  // id: "id",
  // dateEdit: "Занятие изменено",
  // manual: "Добавлено вручную?",
  // editDate:'',
};

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
    walking: {ru: 'Прогулка', en: 'Walking',}
  },
  ui: {
    default: {ru: 'По-умолчанию', en: 'Default',},
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
  },
  title: {
    settings: {ru: 'Настройки', en: 'Settings'},
    activities: {ru: 'Тренировки', en: 'Activities'},
    all: {ru: 'Все', en: 'All'},
    appLanguage: {ru: 'Язык приложения', en: 'App Language'},
    title: {ru: 'Название', en: 'Title'},
    viewTraining: {ru: 'Просмотр тренировки'},
    workouts: {ru: 'Тренировки', en: 'Workouts'},
    stats: {ru: 'Статистика', en: 'Stats'},
    analytics: {ru: 'Аналитика за период', en: 'Analytics for the period'},
    powerCurve: {ru: 'Кривая мощности', en: 'Power curve'},
    hideMap: {ru: 'Скрыть карту', en: 'Hide map'},
    showMap: {ru: 'Показать карту', en: 'Show map'},
    anchorMap: {ru: 'Закрепить карту', en: 'Anchor the map'},
    zoomIn: {ru: 'Приблизить', en: 'Zoom in'},
    zoomOut: {ru: 'Отдалить', en: 'Zoom out'},
    left: {ru: 'Левее', en: 'Left'},
    right: {ru: 'Правее', en: 'Right'},
    resetZoom: {ru: 'Сбросить масштаб', en: 'Reset zoom'},
    phraseValueBetter: {ru: 'больше среднего значения на ', en: 'better of the average value on'},
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

export let fieldsTimeArray = [
  'totalTimerTime',
  'totalElapsedTime',
  'timestamp',
  'startTime',
];

export let fieldsCadenceCyclArray = [
  'maxCadence',
  'avgCadence',
];

export let fieldsCadenceRunArray = [
  'maxRunningCadence',
  'avgRunningCadence',
];

export let fieldsSpeedArray = [
  'maxSpeed',
  'avgSpeed',
];

export let fieldsPaceArray = [
  'enhancedMaxSpeed',
  'enhancedAvgSpeed',
];

export let fieldsHRArray = [
  'maxHeartRate',
  'avgHeartRate',
  'minHeartRate',
];

export let fieldsTemperatureArray = [
  'maxTemperature',
  'avgTemperature',
];

export let fieldsAltitudeArray = [
  'totalAscent',
  'totalDescent',
  'maxAltitude',
  'minAltitude',
];

export let fieldsPowerArray = [
  'maxPower',
  'normalizedPower',
  'avgPower',
];

export let fieldsOtherArray = [
  'totalStrides',
  'trainingStressScore',
  'totalCalories',
  // 'leftRightBalance',
];

let fieldsArray = [
  'startTime',
  'timestamp',
  'totalElapsedTime',
  'totalTimerTime',

  'totalStrides',
  'totalDistance',

  'totalCalories',
  'trainingStressScore',

  'avgSpeed',
  'maxSpeed',

  'avgPower',
  'maxPower',
  'normalizedPower',

  'leftRightBalance',

  'totalAscent',
  'totalDescent',
  'maxAltitude',
  'minAltitude',

  'avgRunningCadence',
  'maxRunningCadence',
  'avgCadence',
  'maxCadence',

  'avgTemperature',
  'maxTemperature',

  'minHeartRate',
  'avgHeartRate',
  'maxHeartRate',

  // 'sport',
  // 'firstLapIndex',
  // 'numLaps',
  // 'trigger',
  // 'subSport',
  // 'avgLeftTorqueEffectiveness',
  // 'avgRightTorqueEffectiveness',
  // 'avgLeftPedalSmoothness',
  // 'avgRightPedalSmoothness',
  // 'enhancedAvgSpeed',
  // 'enhancedMaxSpeed',
  // 'enhancedMaxAltitude',
  // 'enhancedMinAltitude',
  // 'startPositionLat',
  // 'startPositionLong',
  // 'totalWork',
  // 'timeInHrZone',
  // 'timeInPowerZone',
]
