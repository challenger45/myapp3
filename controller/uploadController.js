const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const model = require('../model')

module.exports = {
    upload: async function(req, res) {
        let url = storeUploadFile(req.file);
        await model.Photo.create({
            filename: req.file.originalname,
            url: url,
            comment: req.body.comment
        })
        res.redirect('/');
    }
}

const storeUploadFile = function(file) {
    try {
        let content = fs.readFileSync(file.path);

        let url = path.join(process.env.STORE_LOCATION, file.filename) + path.extname(file.originalname);
        let storePath = path.join(path.dirname(require.main.filename), process.env.STATIC_RESOURCES_DIRECTORY, url);
        
        fs.writeFileSync(storePath, content, {
            flag: 'w+'
        });

        fs.unlinkSync(file.path);

        return url;
    } catch (err) {
        console.error(err)
    }
}