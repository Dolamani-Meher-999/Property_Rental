import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  try {
    // Only owners can create properties
    if (req.user.role !== "owner") {
      return res.status(403).json({
        message: "Only property owners can create listings"
      });
    }

    const { title, description, price, location, images } = req.body;

    const property = await Property.create({
      title,
      description,
      price,
      location,
      images,
      owner: req.user.id
    });

    res.status(201).json({
      message: "Property submitted for approval",
      propertyId: property._id
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const approveProperty = async (req, res) => {
  try {
    // Only admin can approve
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.status = "approved";
    await property.save();

    res.json({ message: "Property approved successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const rejectProperty = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.status = "rejected";
    await property.save();

    res.json({ message: "Property rejected successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Ownership check
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to update this property"
      });
    }

    // Prevent editing after rejection
    if (property.status === "rejected") {
      return res.status(400).json({
        message: "Rejected properties cannot be edited"
      });
    }

    const { title, description, price, location, images } = req.body;

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.images = images || property.images;

    // Any update resets approval
    property.status = "pending";

    await property.save();

    res.json({ message: "Property updated and sent for re-approval" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Ownership check
    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to delete this property"
      });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getApprovedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "approved" })
      .populate("owner", "name email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user.id
    });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



