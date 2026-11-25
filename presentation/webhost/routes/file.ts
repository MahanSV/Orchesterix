import express from 'express';
import multer from "multer";
import authenticate from '#middlewares/authenticityMiddlewares/authentication.ts';
import validate from '#middlewares/validation.ts';
import FileController from '#webhost/controllers/file.ts'

const router = express.Router();
const upload = multer();


router.post('/', upload.single('file'), authenticate, /*validate(),*/ FileController.uploadFile);

router.get('/download-link', authenticate,  FileController.downloadFile);

export default router;