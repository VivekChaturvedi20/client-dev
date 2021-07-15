import express from 'express';

const router = express.Router();

router.put('/v1/Logs', (req, res) => {
    console.log('Log the error', req.body);
    res.send({
        status: 'success'
    });
});

export default router;
