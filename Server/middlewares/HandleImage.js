const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');

// Tạo thư mục lưu ảnh nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Lưu ảnh trong thư mục `uploads`
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname); // Lấy đuôi file (jpg, png)
        const fileName = `${timestamp}${ext}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

const imageMiddleware = {
    uploadImage: upload.single('image'),
    deleteImage: (fileName) => {
        const filePath = path.join(uploadDir, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Xóa ảnh nếu tồn tại
        }
    },
};

module.exports = imageMiddleware;
