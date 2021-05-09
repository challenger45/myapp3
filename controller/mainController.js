const model = require('../model')

module.exports = {
    index: async function(req, res){
        let photos = await model.Photo.findAll({
            order: [
                ['regDate', 'DESC']
            ]
        });

        res.render('main/index', {
            photos: photos
        });
    }
}