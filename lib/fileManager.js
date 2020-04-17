const util = require('util');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

// MB
const FILE_SIZE = 2;
const MAX_FILE_SIZE = 1024 * 1024 * FILE_SIZE;

exports.writeFile = writeFile;
exports.unlink = unlink;

exports.unlinkWithAnotherExt = (dir, filename, ext, otherExts) => {
  const others = otherExts.filter((other) => other !== ext);

  return Promise.all(
    others.map((other) => {
      const otherFile = path.join(dir, `${filename}${other}`);

      if (fs.existsSync(otherFile)) {
        return unlink(otherFile);
      }
    })
  );
};

exports.checkForFileErr = (err) => {
  if (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return {
        message: `"image" the file size should be less than ${FILE_SIZE} MB`
      };
    }

    if (err.code === 'MISMATCH_MIME_TYPE') {
      return { message: err.message };
    }
  }
};

exports.findFileAndRemoveWithExt = (filename, exts) => {
  exts.forEach((ext) => {
    const file = `${filename}${ext}`;

    if (fs.existsSync(file)) {
      return unlink(file);
    }
  });
};

exports.upload = multer({
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      const err = new Error('"image" make sure is a jpg or png file');
      err.code = 'MISMATCH_MIME_TYPE';
      cb(err);
    }
  }
}).single('img');
