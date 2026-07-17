import cartModel from "../models/cart.js";
import productModel from "../models/product.js";
import productCustomModel from "../models/productCustom.js";

//array de funciones
const cartController = {};

//SELECT
cartController.getAllCarts = async (req, res) => {
    try {
     
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name price")
        .populate("products.productsCustomId", "name price");

        return res.status(200).json(carts);

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//GET CART BY CLIENT ID
cartController.getCartByClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const cart = await cartModel.findOne({ customerId: clientId, status: { $ne: 'completed' } })
            .populate("products.productId", "name price images")
            .populate("products.productCustomId", "name price");
            
        if (!cart) {
            return res.status(200).json(null); // Return null instead of 404 to avoid console errors if they don't have one
        }

        return res.status(200).json(cart);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// SYNC CART
cartController.syncCart = async (req, res) => {
    try {
        const { clientId, products, status } = req.body;
        let total = 0;
        let newProducts = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productModel.findById(products[i].productId);
            if (productFound) {
                const subtotal = productFound.price * products[i].quantity;
                total += subtotal;
                newProducts.push({
                    productId: products[i].productId,
                    quantity: products[i].quantity,
                    size: products[i].size,
                    subtotal: subtotal
                });
            }
        }

        const updatedCart = await cartModel.findOneAndUpdate(
            { customerId: clientId, status: { $ne: 'completed' } },
            {
                customerId: clientId,
                products: newProducts,
                total,
                status: status || 'pending'
            },
            { new: true, upsert: true }
        );

        return res.status(200).json({ message: "Cart synced successfully", cart: updatedCart });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//INSERT
cartController.insertCart = async (req, res) => {

    try {
        
        //solicitar los datos|
        const {clientId, products, status} = req.body;

        //variable para el total
        let total = 0;

        //arreglo de productos
        let newProducts = [];

        //de todos los productos que me llegan, tengo que calcular el subtotal y el total
        for (let i = 0; i < products.length; i++) {
            //buscar producto en la base de datos
            const productFound = await productModel.findById(products[i].productId);

            //calcular subtotal
            const subtotal = productFound.price * products[i].quantity;

            //calcular total
            total += subtotal;

            //guardamos el prodructo junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                size: products[i].size,
                subtotal: subtotal
            });
        }

        //llenamos el modelo con los datos
        const newCart = new cartModel({
            customerId: clientId,
            products: newProducts,
            total,
            status
        });

        await newCart.save();

        return res.status(200).json({message: "Cart created successfully", cart: newCart});

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


//UPDATE
cartController.updateCart = async (req, res) => {
    try {
        
        //solicitar los datos|
        const {clientId, products, status} = req.body;

        //variable para el total
        let total = 0;

        //arreglo de productos
        let newProducts = [];

        //Recorrer todos los productos
        for (let i = 0; i < products.length; i++) {
            //buscar producto en la base de datos
            const productFound = await productModel.findById(products[i].productId)

            //calcular subtotal
            const subtotal = productFound.price * products[i].quantity;

            //calcular total
            total += subtotal;

            //guardamos el prodructo junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                size: products[i].size,
                subtotal: subtotal
            })
        }

        //actualizar el carrito en la base de datos
        await cartModel.findByIdAndUpdate(req.params.id, {
            customerId: clientId,
            products: newProducts,
            total,
            status
        }, {new: true});

        return res.status(200).json({message: "Cart updated successfully"});

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

//DELETE
cartController.deleteCart = async (req, res) => {
    try {
        
        await cartModel.findByIdAndDelete(req.params.id);

        return res.status(200).json({message: "Cart deleted successfully"});

    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default cartController;