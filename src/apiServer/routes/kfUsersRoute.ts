import express from 'express';

const router = express.Router();

router.post('/v1/KFUsers', (req, res) => {
    res.send({
        status: 'success'
    });
});

export default router;
