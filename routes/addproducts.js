const { Router } = require("express");
const path = require('path')
const multer = require("multer");
const { getAllProducts, addproducts, updateProduct, deleteProduct } = require("../controller/product.controller");
const router = Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`../frontend/public/product`))
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })





router.get('/allproduct', getAllProducts)
router.delete('/delete-product/:id', deleteProduct)
router.put('/update-product/:id', upload.single('image'), updateProduct)
router.post('/add-products', upload.single('image'), addproducts);

module.exports = router