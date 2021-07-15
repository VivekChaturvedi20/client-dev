import express from 'express';
import * as uuid from 'uuid';

const router = express.Router();

router.get('/v1/Clients', (req, res) => {
    const clients = [];

    const today = new Date();
    for (let i = 1; i <= 10; i++) {
        const id = uuid.v4();
        const endDate:Date = new Date();
        endDate.setDate(today.getDate() + 5);
        const client = {
            id,
            name: `KF Sell ${i}`,
            contractStartDate: new Date().toISOString(),
            contractEndDate: endDate,
            active: (Math.random() < 0.5)
        };
        clients.push(client);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(clients);
});

router.get('/v1/Clients/:id', (req, res) => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 5);
    const client = {
        id: uuid.v4(),
        name: 'KF Sell Client to Update',
        contractStart: today.toISOString(),
        contractEnd: endDate.toISOString(),
        active: true
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(client);
});

router.put('/v1/Clients', (req, res) => {
    console.log('Created client', req.body);
    res.send({
        status: 'success'
    });
});

router.post('/v1/Clients', (req, res) => {
    console.log('Updated client', req.body);
    res.send({
        status: 'success'
    });
});

export default router;
