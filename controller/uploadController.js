const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const model = require('../model')
const logger = require('../logging');

module.exports = {
    upload: async function(req, res) {
        const url = storePhoto(req.file);
        await model.Photo.create({
            filename: req.file.originalname,
            url: url,
            comment: req.body.comment
        })
        res.redirect('/');
    }
}

const storePhoto = function(file) {
    try {
        const content = fs.readFileSync(file.path);

        const url = path.join(process.env.STORE_LOCATION, file.filename) + path.extname(file.originalname);
        const storePath = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, url);
        
        fs.writeFileSync(storePath, content, {
            flag: 'w+'
        });

        fs.unlinkSync(file.path);

        return url;
    } catch (err) {
        logger.error(err)
    }
}