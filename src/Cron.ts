import * as cron from "node-cron";

// https://help.nytimes.com/hc/en-us/articles/360052406391-The-New-York-Times-Crossword-puzzle#:~:text=Each%20daily%20crossword%20puzzle%20is,available%20at%2010%20p.m.%20E.S.T.
export enum CRON_INTERVALS {
  WEEKDAY = "0 0 22 * * Monday,Tuesday,Wednesday,Thursday,Friday",
  WEEKEND = "0 0 18 * * Saturday,Sunday",
}

class Cron {
  static startJob(
    interval: CRON_INTERVALS.WEEKDAY | CRON_INTERVALS.WEEKEND,
    callback: () => void
  ) {
    cron.schedule(interval, callback, {
      timezone: "America/New_York",
    });
  }
}

export default Cron;
