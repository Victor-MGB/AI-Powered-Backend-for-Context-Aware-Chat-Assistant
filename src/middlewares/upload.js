const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, filename);
  }
});

// Define file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.txt', '.docx', '.XLSX'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .txt, .docx files are allowed'));
  }
};

// Export configured multer instance
const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
