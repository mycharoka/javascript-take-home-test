const multer = require('multer')
const sharp = require('sharp')

const multerstorage = multer.memoryStorage()

const multerfilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb("Please upload image only", false)
  }
}

const upload = multer({
  storage: multerstorage,
  fileFilter: multerfilter
})

const uploadFiles = upload.array('images', 2)

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError && err.code == "LIMIT_UNEXPECTED_FILE") {
      return res.send("File upload exceeded limit!")
    } else if (err) {
      return res.send(err)
    }

    next()
  })
}

const resizeImages = async (req, res, next) => {
  if (!req.files) return next()

  await Promise.all(
    req.files.map(async file => {
      const firstImg = req?.files[0]
      const secondImg = req?.files[1]

      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `mobilku-${filename}-${Date.now()}.jpeg`;

      for (let i = 0; i < req?.files.length; i++) {

      }
    })
  )

  req.body.images = []
}