import express from 'express'
import sequelize from '../config/sequelize.config.js'
import Song from '../models/song.model.js'

const router = express.Router()

router.get('/install', async (req, res) => {
        try {
                await sequelize.sync()
                res.sendStatus(200)
        }
        catch(err) {
            res.send(err)
        }
})

export {router as InstallRouter}
