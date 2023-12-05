import Song from '../song.model.js'

export default class SongController {
	list = async (req,res) => {
      
	}
}

const result = await Song.findAll()
res.json(result)	

details = async () => {
	const { id } = req.params // Henter id fra URL param

	const result = await Song.findOne({
		where: { id: id } // Where clause
	})
	res.json(result)
}

create = async () => {
	const { title, content, artist_id } = req.body // Henter form data

	if(title && content && artist_id) {

		const result = await Song.create(req.body)
		
		res.json({
			message: 'Record created',
			new_id: result.insertId()
		})
	}
}