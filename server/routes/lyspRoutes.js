import express from 'express'
import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'
import lyspModel from '../models/lyspModel.js'
import { logSchema } from '../models/lyspModel.js'
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()
const router = express.Router()

// @desc    Get lysp ID by Authcode
// @route   GET /api/lysp/auth/:auth
// @access  Public
router.get(
  '/auth/:auth',
  asyncHandler(async (req, res) => {
    const lyspAccount = await lyspModel.findOne({ auth: req.params.auth })

    if (lyspAccount) {
      res.json({ id: lyspAccount.id })
    } else {
      const newLyspAccount = await lyspModel.create({
        auth: req.params.auth,
        log: [],
      })
      if (newLyspAccount) {
        res.json({ id: newLyspAccount.id })
      } else {
        res.status(404)
        throw new Error('List not found')
      }
    }
  })
)

// @desc    Fetch single lysp
// @route   GET /api/lysp/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const lyspAccounts = await lyspModel.findById(req.params.id)

    if (lyspAccounts && Array.isArray(lyspAccounts.log)) {
      res.json(lyspAccounts.log.reverse())
    } else {
      res.status(404)
      throw new Error('List not found')
    }
  })
)

// @desc    DELETE single item from lysp log
// @route   DELETE /api/lysp/:id/:log
// @access  Public
router.delete(
  '/:id/:log',

  asyncHandler(async (req, res) => {
    const lyspData = await lyspModel.findById(req.params.id)
    lyspData.log = lyspData.log.filter((entry) => entry.id !== req.params.log)
    lyspData.save()

    if (lyspData && Array.isArray(lyspData.log)) {
      res.json(lyspData.log.reverse())
    } else {
      res.status(404)
      throw new Error('List not found')
    }
  })
)

// @desc    POST single item into lysp log
// @route   POST /api/lysp/:id
// @access  Public
router.post(
  '/:id',
  jsonParser,

  //REQUIRE npm install body-parser

  asyncHandler(async (req, res) => {
    const newEntry = { title: req.body.title }

    const lyspData = await lyspModel.findById(req.params.id)
    lyspData.log.push(newEntry)
    lyspData.save()

    if (lyspData && Array.isArray(lyspData.log)) {
      res.json(lyspData.log.reverse())
    } else {
      res.status(404)
      throw new Error('List not found')
    }
  })
)

export default router
