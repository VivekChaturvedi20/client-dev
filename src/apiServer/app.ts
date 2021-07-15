import express from 'express';
import cors from 'cors';
import clientRoute from './routes/clientRoute';
import loggerRoute from './routes/loggerRoute';
import kfUsersRoute from './routes/kfUsersRoute';
import clientPairingRoute from './routes/clientPairingRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(clientRoute);
app.use(loggerRoute);
app.use(kfUsersRoute);
app.use(clientPairingRoute);

app.listen(5000, () => {
    console.log('The application is listening on port 5000!');
});
