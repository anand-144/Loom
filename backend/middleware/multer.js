import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// File type filter for all image types
const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image/")) {
    callback(null, true); // Accept the file if it's an image
  } else {
    callback(new Error("Invalid file type. Only image files are allowed."), false); // Reject non-image files
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
