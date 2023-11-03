import adminMiddleware from "@/middleware/admin";
import authMiddleware from "@/middleware/auth";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";
import slugify from "slugify";

const handler = async (req, res) => {
    await db.connectDB();
    const { method } = req;
    const { name, parent } = req.body;
    const { category } = req.query;

    try {
        await adminMiddleware(req, res, async () => {
            await authMiddleware(req, res, async () => {
                // get sub category
                if (method === "GET") {
                    if (!category) {
                        return res.json([]);
                    }
                    const results = await SubCategory.find({ parent: category })
                        .sort({ createdAt: -1 })
                        .select("name")
                        .exec();
                    return res.json(results);
                }
                // create sub category
                if (method === "POST") {
                    const SubCategoryExists = await SubCategory.findOne({ name });

                    if (SubCategoryExists) {
                        return res
                            .status(400)
                            .json({ error: "Sub Category already exists", ok: false });
                    }

                    await new SubCategory({ name, parent, slug: slugify(name) }).save();

                    return res.status(201).json({
                        message: `Sub Category "${name}" has been successfully created...`,
                        ok: true,
                        subCategories: await SubCategory.find({})
                            .sort({ createdAt: -1 })
                            .populate("parent")
                            .exec(),
                    });
                }

                // update sub category
                if (method === "PATCH") {
                    const { id, name, parent } = req.body.data;
                    let subCategory = await SubCategory.findById(id);
                    let updateRequired = false;

                    if (!subCategory) {
                        return res.status(404).json({ error: "Sub category not found", ok: false });
                    }

                    if (name !== "" && subCategory.name !== name) {
                        const existingSubCategory = await SubCategory.findOne({ name });
                        if (existingSubCategory) {
                            return res
                                .status(400)
                                .json({ error: "Sub category already exists", ok: false });
                        }
                        subCategory.name = name;
                        subCategory.slug = slugify(name);
                        updateRequired = true;
                    }
                    // compare parent id
                    if (parent !== "" && subCategory.parent !== parent) {
                        subCategory.parent = parent;
                        updateRequired = true;
                    }

                    if (updateRequired) {
                        try {
                            await subCategory.save();
                        } catch (error) {
                            console.error("Error saving subcategory:", error);
                            return res
                                .status(500)
                                .json({ error: "Internal server error", ok: false });
                        }
                    }

                    return res.status(200).json({
                        message: `Sub category "${subCategory.name}", has been successfully updated...`,
                        ok: true,
                        subCategories: await SubCategory.find({}, "name")
                            .sort({ createdAt: -1 })
                            .populate("parent")
                            .exec(),
                    });
                }

                // delete sub category
                if (method === "PUT") {
                    const { id } = req.body.data;
                    const subCategory = await SubCategory.findByIdAndDelete(id);
                    if (!subCategory) {
                        return res.status(400).json({ error: "Category not found", ok: false });
                    }
                    const subCategories = await SubCategory.find({})
                        .sort({ createdAt: -1 })
                        .populate("parent")
                        .exec();
                    return res.status(200).json({
                        message: "Category has been successfully deleted...",
                        ok: true,
                        subCategories,
                    });
                }
            });
        });
    } catch (error) {
        return res.status(500).json({ error: error.message, ok: false });
    } finally {
        await db.disconnectDB();
    }
};

export default handler;
