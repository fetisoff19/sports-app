const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')
const File = require('../models/File')
const Dir = require('../models/PowerCurve')
const fs = require("fs");
const stats = require("../config/stats")

router.post('/registration',
  [
    check('email', "Uncorrect email").isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 4, max: 12})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Uncorrect request", errors})
      }
      const {email, password} = req.body
      const candidate = await User.findOne({email})
      if(candidate) {
        return res.status(400).json({message: `User with email ${email} already exist`})
      }
      const hashPassword = await bcrypt.hash(password, 8)

      const user = new User({email, password: hashPassword});
      user.stats = stats;
      user.markModified('stats');
      await user.save();
      await fileService.createDir(user._id.toString());

      // const workouts = new File({name: 'workouts', path: 'workouts.txt', type: 'txt', user: user.id});
      // const stats = new File({name: 'stats', path: 'stats.txt', type: 'txt', user: user.id});
      // const workoutsData = new Dir({name: 'workoutsData', user: user.id});
      // const polylinePoints = new Dir({name: 'polylinePoints', user: user.id});
      //
      // await fileService.createFile(workouts);
      // await fileService.createFile(stats);
      // await fileService.createDir(workoutsData);
      // await fileService.createDir(polylinePoints);
      //
      // await workouts.save();
      // await stats.save();
      // await workoutsData.save();
      // await polylinePoints.save();

      res.json({message: "User was created"})
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })


router.post('/login',
  async (req, res) => {
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})
      if (!user) {
        return res.status(404).json({message: "User not found"})
      }
      const isPassValid = bcrypt.compareSync(password, user.password)
      if (!isPassValid) {
        return res.status(400).json({message: "Invalid password"})
      }
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "48h"})
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          sports: user.sports,
          language: user.language,
          avatar: user.avatar,
          workouts: user.workouts,
          stats: user.stats
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })

router.get('/auth', authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({_id: req.user.id})
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "48h"})
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          sports: user.sports,
          language: user.language,
          avatar: user.avatar,
          workouts: user.workouts,
          stats: user.stats
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })


module.exports = router