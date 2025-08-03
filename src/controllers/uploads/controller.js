const upload = require('../../model/upload');

exports.uploadFile = async (req, res) => {
    try{
        if(!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.file;

        const newUpload = new upload({
            user: req.user.id,
            originalName: file.originalname,
            storedName: file.filename,
            fileType: file.mimetype,
            fileSize: file.size,
        });

        await newUpload.save();

        res.status(201).json({
            message: 'File uploaded successfully',
            file: newUpload,
        });
    }  catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};