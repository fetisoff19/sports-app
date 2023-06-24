const fileService = require('../services/fileService')
const workoutService = require('../services/workoutService')
const config = require('config')
const fs = require('fs')
const User = require('../models/User')
const File = require('../models/File')
const ChartsData = require("../models/ChartsData");
const Polyline = require("../models/Polyline");
const PowerCurve = require("../models/PowerCurve");
const Uuid = require('uuid')
const stats = require("../config/stats")

class FileController {
  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body
      const file = new File({name, type, parent, user: req.user.id})
      const parentFile = await File.findOne({_id: parent})
      if(!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  }

  async getFiles(req, res) {
    try {
      const {sort} = req.query;
      const {sport} = req.query;
      const {direction} = req.query;
      const {page} = req.query;
      const {limit} = req.query;
      const {search} = req.query;
      const {id} = req.query;

      let files;
      let searchOptions = (sport === 'all' || !sport) ? {user: req.user.id} : {user: req.user.id, sport};

      switch (sort) {
        case 'timestamp':
          files = await File.find(searchOptions).sort({timestamp: direction || - 1})
          break
        case 'totalDistance':
          files = await File.find(searchOptions).sort({totalDistance: direction || - 1})
          break
        case 'totalTimerTime':
          files = await File.find(searchOptions).sort({totalTimerTime: direction || - 1})
          break
        case 'enhancedAvgSpeed':
          files = await File.find(searchOptions).sort({enhancedAvgSpeed: direction || - 1})
          break
        case 'totalAscent':
          files = await File.find(searchOptions).sort({totalAscent: direction || - 1})
          break
        case 'avgHeartRate':
          files = await File.find(searchOptions).sort({avgHeartRate: direction || - 1})
          break
        case 'avgPower':
          files = await File.find(searchOptions).sort({avgPower: direction || - 1})
          break
        case 'sport':
          files = await File.find(searchOptions).sort({avgHeartRate: direction || - 1})
          break
        default:
          files = await File.find(searchOptions).sort({timestamp: - 1})
          break;
      }
      let firstIndex = page && limit ? +limit * (+page - 1) : 0;
      let lastIndex = page && limit ? +limit * +page : files.length;
      // lastIndex > (files.length - 1) ? (files.length - 1) : lastIndex

      if(search) {
        files = files
          .filter(file => file.workoutName.toLowerCase().includes(search.toLowerCase()))
      }

      if(id){
        const index = files.findIndex(file => file._id == id)
        if(index < 0) return res.status(500).json({message: `Can not get file ${id}`})
        firstIndex = firstIndex - index > 0 ? firstIndex - index : 0;
        lastIndex = lastIndex + index <= files.length ? lastIndex + index : files.length;
      }

      res.set('file-length', files.length);
      res.set('Access-Control-Expose-Headers', 'file-length')
      files = files.slice(firstIndex, lastIndex)
      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Can not get files"})
    }
  }


  async getPolyline(req, res) {
    try {
      let polyline = await Polyline.findOne({user: req.user.id, _id: req.query.id})
      if(polyline?.points) {
        return res.json(polyline)
      } else {
        return res.json({_id: req.query.id})
      }
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Can not get files"})
    }
  }

  async getChartsData(req, res) {
    try {
      let chartsData = await ChartsData.findOne({user: req.user.id, _id: req.query.id})
      return res.json(chartsData)
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Can not get ChartsData"})
    }
  }

  async getPowerCurve(req, res) {
    try {
      let powerCurve = await PowerCurve.findOne({user: req.user.id, _id: req.query.id})
      return res.json(powerCurve)
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Can not get PowerCurve"})
    }
  }

  async uploadFile(req, res) {
    try {
      let a = Math.random()
      console.time('uploadFile ' + a)

      const file = req.files.file
      const id = req.user.id
      let path = `${config.get('filePath')}\\${id}\\${file.name}`

      let duplicate = await File.findOne({size: file.size, user: req.user.id})

      if (fs.existsSync(path)) {
        return res.status(400).json({message: [duplicate._id, file.name]})
      }
      await file.mv(path)

      let filePath = file.name

      const type = file.name.split('.').pop();
      const workoutName = file.name.replaceAll('.fit', '');

      const workout = new File({
        name: file.name,
        workoutName: workoutName,
        type,
        size: file.size,
        path: filePath,
        user: id,
      });

      // addData
      if(type === 'fit'){
        await workoutService.getWorkoutFields(path, workout, id)
      }

      const user = await User.findOne({_id: id});

      // addStats



      user.workouts.push([workout._id, workout.sport, workout.timestamp, workout?.chartsData || null, workout?.polyline || null, workout?.powerCurve || null]);

      user.stats.sports.hasOwnProperty(workout?.sport)
        ? user.stats.sports[workout.sport] += 1
        : user.stats.sports[workout.sport] = 1;
      user.stats.allTime.totalWorkouts += 1;
      user.stats.allTime.totalTimerTime += +workout?.totalTimerTime || 0;
      user.stats.allTime.totalDistance += +workout?.totalDistance || 0;
      user.stats.allTime.totalAscent += +workout?.totalAscent || 0;
      user.stats.allTime.totalDescent += +workout?.totalDescent || 0;


      user.markModified('stats');
      await user.save();
      await workout.save()
        .then(r => res.json(r));
      console.timeEnd('uploadFile ' + a)

    } catch (e) {
      console.log(e)
      fileService.deleteFile(req.files.file.name, req.user.id)
      return res.status(500).json({message: "Upload workout error"})
    }
  }

  async editFile(req, res) {
    try {
      const workout = await File.findOne({_id: req.body.id, user: req.user.id})
      if(req.body?.field && req.body?.text){
        workout[req.body.field] = req.body.text;
        await workout.save()
        return res.status(200).json({workout})
      } else return res.json({message: "Text is not correct"})
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Edit workout error"})
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      const path = fileService.getPath(file)
      if (fs.existsSync(path)) {
        return res.download(path, file.name)
      }
      return res.status(400).json({message: "Download error"})
    } catch (e) {
      console.log(e)
      res.status(500).json({message: "Download error"})
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      const polyline = await Polyline.findOne({workout: req.query.id, user: req.user.id})
      const powerCurve = await PowerCurve.findOne({workout: req.query.id, user: req.user.id})
      const chartsData = await ChartsData.findOne({workout: req.query.id, user: req.user.id})
      if (!file) {
        return res.status(400).json({message: 'file not found'})
      }
      const user = await User.findOne({_id: req.user.id})
      user.workouts = user.workouts.filter(workout => workout[0] != req.query.id)
      // console.log(polyline, powerCurve)

      user.stats.sports.hasOwnProperty(file?.sport)
        ? user.stats.sports[file.sport] -= 1
        : user.stats.sports[file.sport] = 0;
      user.stats.allTime.totalWorkouts -= 1;
      user.stats.allTime.totalTimerTime -= +file?.totalTimerTime || 0;
      user.stats.allTime.totalDistance -= +file?.totalDistance || 0;
      user.stats.allTime.totalAscent -= +file?.totalAscent || 0;
      user.stats.allTime.totalDescent -= +file?.totalDescent || 0;
      user.markModified('stats');
      fileService.deleteFile(file)
      await file.deleteOne();
      await polyline?.deleteOne();
      await chartsData?.deleteOne();
      await powerCurve?.deleteOne();
      await user.save()

      return res.status(200).json({message: 'File was deleted'})
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Dir is not empty'})
    }
  }

  async deleteFileAll(req, res) {
    try {
      const userId = req.user.id
      await File.deleteMany({user: userId})
      await ChartsData.deleteMany({ user: userId})
      await Polyline.deleteMany({user: userId})
      await PowerCurve.deleteMany({user: userId})
      const user = await User.findOne({_id: req.user.id})


      await fileService.deleteAllFiles(userId, '.fit')
      user.usedSpace = 0;
      user.workouts = []
      user.stats = stats;
      await user.save()

      return res.status(200).json({message: 'All files was deleted'})
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Deleted files error'})
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.user.id
      fileService.deleteUserDir(userId)
      await File.deleteMany({user: userId})
      await ChartsData.deleteMany({ user: userId})
      await Polyline.deleteMany({user: userId})
      await PowerCurve.deleteMany({user: userId})
      await User.deleteOne({_id: userId});

      return res.status(200).json({message: 'User was deleted'})
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Deleted user error'})
    }
  }


  async searchFile(req, res) {
    try {
      const searchName = req.query.search.toLowerCase()
      console.time('search')
      console.log('search: ', searchName)
      let files = await File.find({user: req.user.id}).sort({timestamp: - 1})
      files = files
        .filter(file => file.workoutName.toLowerCase().includes(searchName))
      console.timeEnd('search')
      return res.json(files)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Search error'})
    }
  }

  async uploadAvatar(req, res) {
    try {
      const file = req.files.file
      const user = await User.findById(req.user.id)
      const avatarName = Uuid.v4() + ".jpg"
      file.mv(config.get('staticPath') + "\\" + avatarName)
      user.avatar = avatarName
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Upload avatar error'})
    }
  }
  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id)
      fs.unlinkSync(config.get('staticPath') + "\\" + user.avatar)
      user.avatar = null
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e)
      return res.status(400).json({message: 'Delete avatar error'})
    }
  }
}


module.exports = new FileController()