import request from 'superagent';
import * as uuid from 'uuid';
import config from '../config/config';
import LoggerDto from '../dtos/loggerDto';
import * as authUtils from '../utils/authUtils';

const logApiUrl = config.logApiUrl;
const clientApiUrl = config.clientApiUrl;

export async function logError(error:Error) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const data = new LoggerDto(
        uuid.v4(),
        error.name,
        error.message,
        (error.stack || ''),
        config.environment,
        Date.now()
    );

    const logMessage = {
        message: `[${error.name}] ${error.message}`,
        data,
        logLevel: 'Error'
    };

    await request.put(`${logApiUrl}/v1/Logs`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(logMessage)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Logging Service failed to log the error:', err);
            throw err;
        });
}

export async function userAudit() {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await request.post(`${clientApiUrl}/v1/KFUsers`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Faild to run KF User audit:', err);
            throw err;
        });
}
