import express from 'express';
import * as uuid from 'uuid';

const router = express.Router();

router.post('/v1/ClientPairing', (req, res) => {
    res.send({ newPairingToken: uuid.v4() });
});

export default router;
