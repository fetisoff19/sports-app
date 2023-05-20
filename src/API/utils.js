import { Decoder, Stream, Profile, Utils } from '@garmin-fit/sdk';
import {copyKeyInObj} from "./makeWorkout";
import {addWorkout, db} from "./db.js";
import {logPlugin} from "@babel/preset-env/lib/debug";
import { openDB } from 'idb/with-async-ittr';

export async function parseFit(fitFile) {
  //console.time('response in');
  let fitBlob = await fitFile.arrayBuffer();
  const stream = Stream.fromByteArray(fitBlob);
  //console.log("isFIT (static method): " + Decoder.isFIT(stream));
  const decoder = new Decoder(stream);
  //console.log("isFIT (instance method): " + decoder.isFIT());
  //console.log("checkIntegrity: " + decoder.checkIntegrity());
  const { messages, errors } = decoder.read();
  if (errors.length>0) console.log(errors);
  //console.log(messages);
  //console.timeEnd('response in');
  return messages;
}


export async function sha256File(file) {
  const blob = await file.arrayBuffer();
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', blob);
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return digest;
}

export function htmlToNodeList(html) {
  let template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}

export async function htmlFileUrlToNodeList(url) {
  let result = await fetch(url);
  let html = await result.text();
  let nodeList = htmlToNodeList(html);
  return nodeList;
}

export function loadCss(cssUrl) {
  // 'cssURL' is the stylesheet's URL, i.e. /css/styles.modules.scss
  return new Promise( function(resolve, reject) {
    let link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
    link.onload = function() { 
      resolve();
    };
  });
}

export async function addFitFile(e) {
  let result = {};
  result.repeat = [];
  result.added = [];
  for (let file of e.target.files) {
    let repeat = false;
    const filename = file.name.replace('.fit','');
    const newWorkoutData = await parseFit(file);
    const sha256 = await sha256File(file)
    //проверка на уникальность
    let index = await db.transaction('workoutsData').store.index('sha256');
    for await (const cursor of index.iterate()) {
      if (cursor.key === sha256) {
        console.log('Такая тренировка уже существует ' + cursor.key);
        repeat = true;
        result.repeat.push(cursor.value.id_workouts);
      }
    }
    if (repeat) continue
    newWorkoutData.sha256 = sha256;
    //добавляем параметры из newWorkoutData
    const newWorkout = {name: filename};
    copyKeyInObj(newWorkoutData, newWorkout);

    //создаем объект тренировки
    const newRecId = await addWorkout(newWorkout, newWorkoutData);
    await db.get('workouts', newRecId);
    result.added.push(newWorkout);
  }
  return result
}


export function garminLatLongToNormal(latLongArr) {
  const divisor = 11930465;
  const normalLatLong = [latLongArr[0]/divisor, latLongArr[1]/divisor];
  return normalLatLong;
}