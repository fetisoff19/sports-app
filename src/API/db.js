import {openDB} from 'idb';
// const db = await initDb();

// async function initDb() {
//   return new Promise(async (resolve, reject) => {
//     if ('indexedDB' in window) {
//       resolve(await openDB('sportsApp', 1, {
//         upgrade(db) {
//           if (!db.objectStoreNames.contains('workouts')) {
//             const workoutsOS = db.createObjectStore('workouts', {keyPath: 'id', autoIncrement: true});
//           }
//           if (!db.objectStoreNames.contains('workoutsData')) {
//             const workoutsDataOS = db.createObjectStore('workoutsData', {keyPath: 'id_workouts'});
//             workoutsDataOS.createIndex('sha256', 'sha256', {unique: true});
//           }
//         }
//       }));
//     } else {
//       reject('This browser doesn\'t support IndexedDB.');
//     }
//   });
// }



export async function addWorkout(newWorkout, newWorkoutData) {
  //создаем транзакцию с перечислением OSов, с которыми будем в ней работать
  const tx = db.transaction(['workouts', 'workoutsData'], 'readwrite');
  //получаем OSы для дальнейшей работы
  const workoutsOS = tx.objectStore('workouts');
  const workoutsDataOS = tx.objectStore('workoutsData');
  //добавляем тренировку, сохраняем id добавленной записи
  try {
    const newWorkoutId = await workoutsOS.add(newWorkout);
    //записываем id в данные тренировки
    newWorkoutData.id_workouts = newWorkoutId;
    //добавляем данные тренировки
    await workoutsDataOS.add(newWorkoutData);
    return newWorkoutId;
  }
  catch(err) {
    console.error(err)
  }
}

export async function deleteWorkout(id) {
  const tx = db.transaction(['workouts', 'workoutsData'], 'readwrite');
  const workoutsOS = tx.objectStore('workouts');
  const workoutsDataOS = tx.objectStore('workoutsData');
  try {
    await workoutsOS.delete(id);
    //удаляем связанные с тренировкой данные
    await workoutsDataOS.delete(id);
    await tx.done;
    console.log('успешно удалено');
  }
  catch(err) {
    console.error('ошибка', err.message);
  }
}

//ф-я отображения размера локального хранилища
// export async function setIndexedDbUsageInfo() {
//  return await navigator.storage.estimate()
//    .then(result => [Math.round(result.usageDetails.indexedDB / (10 ** 6)),
//      Math.round((result.usageDetails.indexedDB / (10 ** 6))/ ((result.quota) / (10 ** 6)) * 100)])
// }
