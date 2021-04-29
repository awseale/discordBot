import * as cron from 'node-cron';

export enum CRON_INTERVALS {
    WEEKDAY = '0 0 2 * * Tuesday,Wednesday,Thursday,Friday,Saturday',
    WEEKEND = '0 0 22 * * Saturday,Sunday'
}

class Cron {
    static startJob(interval: CRON_INTERVALS.WEEKDAY | CRON_INTERVALS.WEEKEND, callback: () => void) {
        cron.schedule(interval, callback);
    }
}

export default Cron