import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  createProperty,
  approveProperty,
  rejectProperty,
  updateProperty,
  deleteProperty,
  getApprovedProperties,
  getOwnerProperties,
  getAllProperties
} from "../controllers/propertyController.js";

const router = express.Router();

// Owner creates property
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["owner"]),
  createProperty
);

// Admin approves / rejects
router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(["admin"]),
  approveProperty
);

router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(["admin"]),
  rejectProperty
);

// Owner updates / deletes own property
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner"]),
  updateProperty
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["owner"]),
  deleteProperty
);


// Owner views own properties
router.get(
  "/my-properties",
  authMiddleware,
  roleMiddleware(["owner"]),
  getOwnerProperties
);

// Tenant views approved properties
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["tenant"]),
  getApprovedProperties
);

// Admin views all properties
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllProperties
);

export default router;
