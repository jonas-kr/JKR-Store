const Product = require("../models/ProductSchema")


const GetProducts = async (req, res) => {
    const { page = 1, limit = 10, title = "", rlvnt = true, lth = false, htl = false } = req.query;

    try {
        const query = {};
        if (title) {
            const regex = new RegExp(title, 'i');
            query.name = { $regex: regex };
        }

        if (req.query.category) query.category = req.query.category;
        if (req.query.subCategory) query.subCategory = req.query.subCategory;
        if (req.query.bestSeller) query.bestSeller = JSON.parse(req.query.bestSeller)


        // Determine sorting criteria`
        let sortCriteria = {};

        if (JSON.parse(rlvnt)) {
            sortCriteria = { createdAt: -1 }; // Sort by createdAt when relevant
        } else if (JSON.parse(lth)) {
            sortCriteria = {
                price: 1, // Sort by computed price ascending
                createdAt: -1 // Then by createdAt descending
            };
        } else if (JSON.parse(htl)) {
            sortCriteria = {
                price: -1, // Sort by computed price descending
                createdAt: -1 // Then by createdAt descending
            };
        } else {
            // Default sort if no specific criteria provided
            sortCriteria = { createdAt: -1 }; // Fallback sorting
        }

        // Aggregate to compute price and sort
        const products = await Product.aggregate([
            { $match: query },
            {
                $project: {
                    id: 1,
                    name: 1,
                    description: 1,
                    basePrice: 1,
                    salePrice: 1,
                    images: 1,
                    sizes: 1,
                    colors: 1,
                    category: 1,
                    subCategory: 1,
                    bestSeller: 1,
                    createdAt: 1,
                    price: {
                        $cond: {
                            if: { $gt: ["$salePrice", null] },
                            then: "$salePrice",
                            else: "$basePrice"
                        }
                    }
                }
            },
            { $sort: sortCriteria }, // Use the constructed sortCriteria
            { $skip: (page - 1) * limit },
            { $limit: limit * 1 }
        ]);

        const count = await Product.countDocuments(query);

        if (products.length === 0) {
            return res.status(200).json({ message: "There are no products" });
        }

        return res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            count
        });
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` });
    }
};


const NewProduct = async (req, res) => {
    if (!req.user?.admin) return res.status(400).json({ error: "User is not authorized" })
    const {
        name, description, basePrice,
        salePrice, images, sizes, colors, category, subCategory, bestSeller
    } = req.body

    if (!name || !description || !basePrice || !images || !sizes ||
        !category || !subCategory) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    try {
        const product = await Product.create({
            name, description, basePrice,
            salePrice, images, sizes, colors, category, subCategory, bestSeller
        })
        res.status(201).json({ message: "Product succesfully created", product })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

const GetProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ id })
        if (!product) {
            return res.status(200).json({ message: "No product with this Id" })
        }
        return res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

const DelProduct = async (req, res) => {
    if (!req.user?.admin) return res.status(400).json({ error: "User is not authorized" })
    const { id } = req.params
    try {
        await Product.findOneAndDelete({ _id: id })
        res.status(200).json({ message: "Product successfully deleted" })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const UpdateProduct = async (req, res) => {
    if (!req.user?.admin) return res.status(400).json({ error: "User is not authorized" })

    const {
        name, description, basePrice,
        salePrice, images, sizes, colors, category, subCategory, bestSeller
    } = req.body

    if (!name || !description || !basePrice || !images || !sizes ||
        !category || !subCategory) {
        return res.status(400).json({ error: "All fields must be filled" })
    }

    const product = await Product.findOne({ _id: req.params.id })
    if (!product) {
        return res.status(400).json({ error: "Product not available" })
    }
    try {
        await Product.findByIdAndUpdate(req.params.id,
            {
                name, description, basePrice,
                salePrice, images, sizes, colors, category, subCategory, bestSeller
            })
        res.status(200).json({ message: "Product Updated" })
    } catch (error) {
        res.status(400).json({ message: `Error is ${error.message}` })
    }
}


module.exports = { GetProducts, NewProduct, GetProduct, DelProduct, UpdateProduct }
