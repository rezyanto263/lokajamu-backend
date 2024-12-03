const express = require('express');
const multer = require('multer');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { getArticleById, searchAllArticles, addArticle, editArticle, deleteArticle } = require('../controllers/articleController');
const { addArticleValidation, editArticleValidation } = require('../validations/articleValidation');

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads/', limits: { fileSize: 1024 * 1024 * 10 } });

router.get('/:id', getArticleById);
router.get('/', searchAllArticles);
router.post('/', upload.single('image'), validateMiddleware(addArticleValidation), addArticle);
router.put('/:id', upload.single('image'), validateMiddleware(editArticleValidation), editArticle);
router.delete('/:id', deleteArticle);

module.exports = router;