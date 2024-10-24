import User from "../models/UserModel.js";

export const searchContacts = async (req, res, next) => {
    try {
        const { searchTerm } = req.body;
        if (searchTerm === null || searchTerm === undefined) {
            return res.status(400).json({ message: 'Search Term is required' });
        }

        const sanitiseSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        )
        const regex = new RegExp(sanitiseSearchTerm, "i");
        const contacts = await User.find({
            $and: [{ _id: { $ne: req.userId } },
            {
                $or: [{ firstName: regex }, { lastName: regex }, { email: regex }]
            },
            ],
        });

        return res.status(200).json({ contacts });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
}