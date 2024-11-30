const express = require('express');
const multer = require('multer');
const { addSpice, editSpice, getSpiceDetails, searchAllSpices, deleteSpice } = require('../controllers/spiceController');
const { addSpiceValidation, editSpiceValidation } = require('../validations/spiceValidation');

const router = express.Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024 * 1024 * 10 } });

router.get('/', searchAllSpices);
router.get('/:id', getSpiceDetails);
router.post('/', upload.single('image'), addSpiceValidation, addSpice);
router.put('/:id', upload.single('image'), editSpiceValidation, editSpice);
router.delete('/:id', deleteSpice);

module.exports = router;