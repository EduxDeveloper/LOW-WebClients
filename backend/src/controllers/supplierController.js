import plantsModel from "../models/supplier.js";

import { v2 as cloudinary } from "cloudinary";
import { config } from "../../config.js";

// ARRAY de funciones
const supplierController = {};

//GET
supplierController.getAll = async (req, res) => {
    try {
        const suppliers = await plantsModel.find();
        res.status(200).json(suppliers);
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
supplierController.create = async (req, res) => {
    try {
        const { name, care, size, price, stock, product_id } = req.body;

        const newSupplier = new plantsModel({
            name,
            email,
            phone,
            image: req.file.path,
            address,
            isVerified: true,
            public_id: req.file.filename,
        });
        await newSupplier.save();

        res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
supplierController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const suppliersToDelete = await plantsModel.findById(id);

        if (!suppliersToDelete) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(plantsDelete.public_id);
        // Eliminar el documento de la base de datos
        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Plants deleted successfully' });
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//PUT
supplierController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, care, size, price, stock, product_id} = req.body;
        const suppliersToUpdate = await plantsModel.findById(id);
        if (!suppliersToUpdate) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
       
        //si viene alguna imagen
        if(req.file){
            //eliminar la imagen anterior
            await cloudinary.uploader.destroy(postToUpdate.public_id)
            
            //guardar la nueva imagen
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await candleModel.findByIdAndUpdate(req.params.id,
            updatedData,
            {new: true});

        return res.status(200).json({message: "Plants updated"})
    } catch (error) {
        console.log("error"+ error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default supplierController;