const { Product } = require("../models/product");


const getAllProducts = async (req, res) => {
    const allProducts = await Product.find({})
    return res.send(allProducts)
}
const addproducts = async (req, res) => {
    const { title, description, price, category } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }
        const imagePath = req.file.filename;

        await Product.create({
            title,
            category,
            image: imagePath,
            description,
            price,
        });

        return res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        return res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const isProductDelete = await Product.findByIdAndDelete(id)
        if (!isProductDelete) {
            return res.status(404).json({ success: false, message: "Invalid Product" })
        }
        return res.status(200).json({ success: true, message: 'Successfully Product Deleted' })

    } catch (error) {
        return res.status(500).json({ success: false, message: `Something went wrong: ${error.message}` })
    }

}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
    }
    const imagePath = req.file.filename;
    productData.image = imagePath

    try {
        const isProductUpdated = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!isProductUpdated) {
            return res.status(404).json({ success: false, message: "Invalid Product" });
        }
        return res.status(200).json({ success: true, message: 'Successfully Product Updated' });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Something went wrong: ${error.message}` });
    }
};

module.exports = { getAllProducts, addproducts, deleteProduct, updateProduct }





