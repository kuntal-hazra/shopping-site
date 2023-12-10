const ProductModel = require("../models/product");

exports.create_product = async (req, res) =>{
  try{
    const {title, description, price, imgUrl} = req.body;
    
    let newProduct = new ProductModel({
        title,
        description,
        price,
        imgUrl,
    });
    newProduct = await newProduct.save();

    res.json(newProduct);
  } catch (error){
    res.status(500).json({error: error.message });
  }
};
exports.products = async (req, res) => {
  try{
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch(error){
    res.status(500).json({error: error.message });
  }
};

exports.singleProduct = async (req, res) => {
  try{
    const productId = req.params.id;
    const singleProduct = await ProductModel.findById(productId);
    if(!singleProduct){
      return res.status(404).json({message: `No such product found`})
    }
    
    res.status(200).json(singleProduct);
    
  } catch(error){
    res.status(500).json({error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try{
    const productId = req.params.id;
    await ProductModel.findByIdAndRemove(productId);

    res.status(200).json({message: `Product with Id ${productId} deleted successfully`});


  } catch(error) {
    res.status(500).json({error: error.message });
  }

};

exports.updateProduct = async (req, res) => {
  try{
    const {title, description, price, imgUrl} = req.body;
    const productId = req.params.id;

    let updatedProduct = new ProductModel({
        title,
        description,
        price,
        imgUrl,
        _id: productId,
    });
    updatedProduct = await ProductModel.findByIdAndUpdate(productId, updatedProduct);

    res.status(200).json(updatedProduct);

  } catch(error) {
    res.status(500).json({error: error.message });
  }
}
