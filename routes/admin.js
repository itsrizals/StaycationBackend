const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload, uploadMultiple } = require("../middlewares/multer");
const auth = require("../middlewares/auth");

// Main Dashboard
router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

// Category
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.updateCategory);
router.delete("/category/:id", adminController.deleteCategory);

// Bank
router.get("/bank", adminController.viewBank);
router.post("/bank", upload, adminController.addBank);
router.put("/bank", upload, adminController.updateBank);
router.delete("/bank/:id", adminController.deleteBank);

// Item
router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.get("/item/show-image/:id", adminController.showImageItem);
router.get("/item/:id", adminController.showEditItem);
router.put("/item/:id", uploadMultiple, adminController.updateItem);
router.delete("/item/:id/delete", adminController.deteleItem);
// Item Detail
router.get("/item/show-item-detail/:itemId", adminController.viewItemDetail);
// Item Detail Feature
router.post("/item/add/feature", upload, adminController.addFeature);
router.put("/item/update/feature", upload, adminController.updateFeature);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);
// Item Detail Activity
router.post("/item/add/activity", upload, adminController.addActivity);
router.put("/item/update/activity", upload, adminController.editActivity);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);

// Booking
router.get("/booking", adminController.viewBooking);
router.get("/booking/:id", adminController.showBookingDetail);
router.put("/booking/:id/confirm", adminController.actionConfirm);
router.put("/booking/:id/reject", adminController.actionReject);

module.exports = router;
