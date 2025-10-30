import express from 'express';
import { generateReport } from '../controllers/reportController.js';

const router = express.Router();

// GET /api/report/generate - Generate therapy report
router.get('/generate', generateReport);

export default router;