import supplierModel from "../models/supplier.js";
import { v2 as cloudinary } from "cloudinary";

const supplierController = {};

//GET
supplierController.getAll = async (req, res) => {
    try {
        const suppliers = await supplierModel.find();
        res.status(200).json(suppliers);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//POST
supplierController.create = async (req, res) => {
    try {
        const { name, email, phone, address, isVerified } = req.body;

        const newSupplier = new supplierModel({
            name,
            email,
            phone,
            img: req.file ? req.file.path : undefined,
            address,
            isVerified: isVerified === 'true' || isVerified === true,
            public_id: req.file ? req.file.filename : undefined,
        });
        await newSupplier.save();

        res.status(201).json({ message: 'Supplier created successfully', supplier: newSupplier });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

//DELETE
supplierController.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const supplierToDelete = await supplierModel.findById(id);

        if (!supplierToDelete) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
        
        // Eliminar la imagen de Cloudinary
        if (supplierToDelete.public_id) {
            await cloudinary.uploader.destroy(supplierToDelete.public_id);
        }
        
        // Eliminar el documento de la base de datos
        await supplierModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

//PUT
supplierController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, address, isVerified } = req.body;
        
        const supplierToUpdate = await supplierModel.findById(id);
        if (!supplierToUpdate) {
            return res.status(404).json({ message: 'Supplier not found' });
        }
       
        let updatedData = {
            name,
            email,
            phone,
            address,
            isVerified: isVerified === 'true' || isVerified === true
        };

        //si viene alguna imagen
        if (req.file) {
            //eliminar la imagen anterior
            if (supplierToUpdate.public_id) {
                await cloudinary.uploader.destroy(supplierToUpdate.public_id);
            }
            
            //guardar la nueva imagen
            updatedData.img = req.file.path;
            updatedData.public_id = req.file.filename;
        }

        //actualizo en la base de datos
        await supplierModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json({ message: "Supplier updated successfully" });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export default supplierController;