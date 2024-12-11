const express = require('express');
const multer = require('multer');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { addSpice, editSpice, getSpiceDetails, searchAllSpices, deleteSpice, predictSpice } = require('../controllers/spiceController');
const { addSpiceValidation, editSpiceValidation, predictSpiceValidation } = require('../validations/spiceValidation');

const router = express.Router();
const upload = multer({ dest: '/tmp/uploads', limits: { fileSize: 1024 * 1024 * 10 } });

router.get('/', searchAllSpices);
router.post('/predict', upload.single('image'), validateMiddleware(predictSpiceValidation), predictSpice);
router.get('/:id', getSpiceDetails);
router.post('/', upload.single('image'), validateMiddleware(addSpiceValidation), addSpice);
router.put('/:id', upload.single('image'), validateMiddleware(editSpiceValidation), editSpice);
router.delete('/:id', deleteSpice);

module.exports = router;