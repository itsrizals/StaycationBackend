const router = require('express').Router();
const adminController = require('../controllers/adminController');
const categoryController = require('../controllers/categoryController');
const bankController = require('../controllers/bankController');
const itemController = require('../controllers/itemController');
const featureController = require('../controllers/featureController');
const activityController = require('../controllers/activityController');
const bookingController = require('../controllers/bookingController');

const { upload, uploadMultiple } = require('../middlewares/multer');
const auth = require('../middlewares/auth');

// Main Dashboard
router.get('/signin', adminController.viewSignin);
router.post('/signin', adminController.actionSignin);
router.use(auth);
router.get('/logout', adminController.actionLogout);
router.get('/dashboard', adminController.viewDashboard);

// Category
router.get('/category', categoryController.viewCategory);
router.post('/category', categoryController.addCategory);
router.put('/category', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

// Bank
router.get('/bank', bankController.viewBank);
router.post('/bank', upload, bankController.addBank);
router.put('/bank', upload, bankController.updateBank);
router.delete('/bank/:id', bankController.deleteBank);

// Item
router.get('/item', itemController.viewItem);
router.post('/item', uploadMultiple, itemController.addItem);
router.get('/item/show-image/:id', itemController.showImageItem);
router.get('/item/:id', itemController.showEditItem);
router.put('/item/:id', uploadMultiple, itemController.updateItem);
router.delete('/item/:id/delete', itemController.deteleItem);
// Item Detail
router.get('/item/show-item-detail/:itemId', itemController.viewItemDetail);
// Item Detail Feature
router.post('/item/add/feature', upload, featureController.addFeature);
router.put('/item/update/feature', upload, featureController.updateFeature);
router.delete('/item/:itemId/feature/:id', featureController.deleteFeature);
// Item Detail Activity
router.post('/item/add/activity', upload, activityController.addActivity);
router.put('/item/update/activity', upload, activityController.editActivity);
router.delete('/item/:itemId/activity/:id', activityController.deleteActivity);

// Booking
router.get('/booking', bookingController.viewBooking);
router.get('/booking/:id', bookingController.showBookingDetail);
router.put('/booking/:id/confirm', bookingController.actionConfirm);
router.put('/booking/:id/reject', bookingController.actionReject);

module.exports = router;
