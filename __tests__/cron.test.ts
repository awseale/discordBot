import sinon from "sinon"
import Cron, { CRON_INTERVALS } from "../src/Cron"

/* 
 * Cron test: We are grabbing all of the epoch timestamps for
 * two minutes prior to when the cron should run. For each test
 * We are testing that it does not run initially, nor does it run after
 * one minute has ticked by. After the second tick we check that the
 * fake callback has run
 *
 */


describe('Cron', () => {
    let clock: sinon.SinonFakeTimers;
    let callback: jest.Mock;

    // epoch converter: https://www.epochconverter.com/
    const DAYS = {
        MONDAY: 1612234680000, // Monday, Febrauary 1st, 6:58:00 PM PST
        TUESDAY: 1612321080000, // Tuesday, Febrauary 2nd, 6:58:00 PM PST
        WEDNESDAY: 1612407480000, // Wednesday, Febrauary 3rd, 6:58:00 PM PST
        THURSDAY: 1612493880000, // Thursday, Febrauary 4th, 6:58:00 PM PST
        FRIDAY: 1612580280000, // Friday, Febrauary 5th, 6:58:00 PM PST
        SATURDAY: 1612652280000, // Saturday, Febrauary 6th, 2:58:00 PM PST
        SUNDAY: 1612738680000, // Sunday, Febrauary 7th, 2:58:00 PM PST
    }

    const ONE_MINUTE_MS = 60000

    beforeEach(() => {
        callback = jest.fn()
        clock = sinon.useFakeTimers()
    })

    describe('startJob()', () => {

        test('Monday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.MONDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKDAY, callback)
            expect(callback).not.toBeCalled()
            
            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })
        
        test('Tuesday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.TUESDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKDAY, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })

        test('Wednesday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.WEDNESDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKDAY, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })

        test('Thursday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.THURSDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKDAY, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })

        test('Friday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.FRIDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKDAY, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })

        test('Saturday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.SATURDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKEND, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })

        test('Sunday', () => {
            clock = sinon.useFakeTimers({
                now: DAYS.SUNDAY
            })
            Cron.startJob(CRON_INTERVALS.WEEKEND, callback)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).not.toBeCalled()

            clock.tick(ONE_MINUTE_MS)
            expect(callback).toBeCalledTimes(1)
        })
    })
})