import Sequelize from '../config/sequelize.config.js'
import SongModel from '../models/song.model.js';

const model = new SongModel();

class SongController {
    constructor() {
        console.log('Class Songcontroller instantiated')
    }


    
    /**
	 * List Method - List all songs
	 * @param {object} req 
	 * @param {object} res 
	 */
	list = async (req,res) => {
		const result = await model.list(req,res)
		res.json(result)
	}
    
    details = (req,res) => {
		// Destructuring assignment - henter id fra URL param
		const { id } = req.params
		// SQL Query med value markers (?) og json return
		// Value marker (?) markerer dynamiske værdier som 
		// sendes med query som et array - Eksempel: [id]
		const sql = `SELECT s.id, s.title, s.content, 
								s.artist_id, a.name, s.created 
						FROM song s 
						JOIN artist a 
						ON s.artist_id = a.id 
						WHERE s.id = ?`
		db.query(sql, [id],(error,result) => {
			console.error(error);
			return res.json(result)
		})
	}

    search = (req,res) => {
        const { keyword } = req.query

        const sql = `SELECT s.id, s.title, s.content,
                        s.artist_id, a.name
                FROM song s
                JOIN artist a
                ON s.artist_id = a.id
                                        WHERE s.title LIKE ?
                                        OR s.content LIKE ?
                                        OR a.name LIKE ?`
        
        const fixed_keyword = '%'+keyword+'%'

        db.query(sql, [fixed_keyword,fixed_keyword,fixed_keyword], (error,result) => {
            if(error) throw error
    return res.json(result)
        })


    }
    
    create = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
		const { title, content, artist_id } = req.body
		// SQL Statement med value markers (?)
        const sql = `INSERT INTO song (title, content, artist_id) 
                        VALUES (?,?,?)`
        db.query(sql, [title,content,artist_id], (error,result) => {
			if(error) throw error
			// Returnerer json med nyeste id
			return res.json({
				message: 'New song created',
				newId: result.insertId
			})
        })
	}

	update = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
		const { id, title, content, artist_id } = req.body
		// SQL Statement med value markers (?)
        const sql = `UPDATE song 
						SET title = ?, content =?, artist_id = ? 
                        WHERE id = ?`
        db.query(sql, [title,content,artist_id,id], (error,result) => {
			if(error) {
				console.log(error)
			} else {
				// Returnerer json med nyeste id
				return res.json({
					message: 'Song Updated'
				})
			}
        })
	}

	delete = (req, res) => {
		// Destructure assignment - henter værdier fra Form Body
        const { id } = req.body
        
		const sql = `DELETE FROM song WHERE id = ?`
		db.query(sql, [id], (error,result) => {
			if(error) {
                console.log(error)
            } else {
                // Returnerer json med nyeste id
                return res.json({
                    message: 'Song Deleted'
                })
            }
		})
	}
}

export default SongController