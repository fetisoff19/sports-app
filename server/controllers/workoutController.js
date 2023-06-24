const fileService = require('../services/fileService')
const workoutService = require('../services/workoutService')
const config = require('config')
const fs = require('fs')
const User = require('../models/User')
const Uuid = require('uuid')

class WorkoutController {
  // async createDir(req, res) {
  //   try {
  //     const {name, type, parent} = req.body
  //     const file = new File({name, type, parent, user: req.user.id})
  //     const parentFile = await File.findOne({_id: parent})
  //     if(!parentFile) {
  //       file.path = name
  //       await fileService.createDir(file)
  //     } else {
  //       file.path = `${parentFile.path}\\${file.name}`
  //       await fileService.createDir(file)
  //       parentFile.childs.push(file._id)
  //       await parentFile.save()
  //     }
  //     await file.save()
  //     return res.json(file)
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(400).json(e)
  //   }
  // }

  // async getWorkouts(req, res) {
  //   try {
  //     const {sort} = req.query
  //     let files;
  //     switch (sort) {
  //       case 'sport':
  //         files = await Workout.find({user: req.user.id}).sort({sport:1})
  //         break
  //       case 'dateAdded':
  //         files = await Workout.find({user: req.user.id}).sort({dateAdded:1})
  //         break
  //       case 'totalDistance':
  //         files = await Workout.find({user: req.user.id}).sort({totalDistance:1})
  //         break
  //       case 'startTime':
  //         files = await Workout.find({user: req.user.id}).sort({startTime:1})
  //         break
  //       case 'enhancedAvgSpeed':
  //         files = await Workout.find({user: req.user.id}).sort({enhancedAvgSpeed:1})
  //         break
  //       case 'totalAscent':
  //         files = await Workout.find({user: req.user.id}).sort({totalAscent:1})
  //         break
  //       case 'avgHeartRate':
  //         files = await Workout.find({user: req.user.id}).sort({avgHeartRate:1})
  //         break
  //       case 'maxHeartRate':
  //         files = await Workout.find({user: req.user.id}).sort({maxHeartRate:1})
  //         break
  //       case 'avgPower':
  //         files = await Workout.find({user: req.user.id}).sort({avgPower:1})
  //         break
  //       case 'totalCalories':
  //         files = await Workout.find({user: req.user.id}).sort({totalCalories:1})
  //         break
  //       default:
  //         files = await Workout.find({user: req.user.id})
  //         break;
  //     }
  //     return res.json(files)
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(500).json({message: "Can not get files"})
  //   }
  // }

  async uploadWorkout(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
      const user = await User.findOne({_id: req.user.id})
      console.log(1, user, file.name)
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no space on the disk'})
      }

      user.usedSpace = user.usedSpace + file.size
      let path;
      if (parent) {
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`
      }


      if (fs.existsSync(path)) {
        return res.status(400).json({message: 'Workout already exist'})
      }
      file.mv(path)

      const type = file.name.split('.').pop()
      let filePath = file.name
      if (parent) {
        filePath = parent.path + "\\" + file.name
      }

      // const workoutFields = await workoutService.getWorkoutFields(file)

      const workout = new Workout({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id,
      });


      await workout.save()
      await user.save()
      // await addWorkoutService.addWorkoutToWorkouts(file, user._id, path)

      res.json(workout)
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Upload workout error"})
    }
  }

  // async downloadFile(req, res) {
  //   try {
  //     const file = await File.findOne({_id: req.query.id, user: req.user.id})
  //     const path = fileService.getPath(file)
  //     if (fs.existsSync(path)) {
  //       return res.download(path, file.name)
  //     }
  //     return res.status(400).json({message: "Download error"})
  //   } catch (e) {
  //     console.log(e)
  //     res.status(500).json({message: "Download error"})
  //   }
  // }

  // async deleteWorkouts(req, res) {
  //   try {
  //     const file = await Workout.findOne({_id: req.query.id, user: req.user.id})
  //     if (!file) {
  //       return res.status(400).json({message: 'file not found'})
  //     }
  //     workoutService.deleteWorkout(file)
  //     await file.deleteOne()
  //     return res.json({message: 'File was deleted'})
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(400).json({message: 'Dir is not empty'})
  //   }
  // }

  // async searchFile(req, res) {
  //   try {
  //     const searchName = req.query.search.toLowerCase()
  //     let files = await File.find({user: req.user.id})
  //     files = files.filter(file => file.name.toLowerCase().includes(searchName))
  //     return res.json(files)
  //   } catch (e) {
  //     console.log(e)
  //     return res.status(400).json({message: 'Search error'})
  //   }
  // }

}

module.exports = new WorkoutController()