const express = require('express');
const multer = require('multer');
const UploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(UploadConfig);

routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('img'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/booking', BookingController.store);

routes.post('/booking/:booking_id/approvals', ApprovalController.store);
routes.post('/booking/:booking_id/rejections', RejectionController.store);


module.exports = routes;