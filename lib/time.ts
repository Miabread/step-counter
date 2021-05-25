import { msInHour, times, msInWeek } from './data';

const utcOffset = -(msInHour * 5);

const trueStartDate = +new Date(2021, 2, 12);
const adjustedStartDate = trueStartDate + utcOffset;

const getWeekRange = (weeksSinceStart: number) => {
    const start = adjustedStartDate + msInWeek * weeksSinceStart;
    const end = start + msInWeek;

    return { start, end } as const;
};

const getRangeFromTime = (time: keyof typeof times) => {
    const weeksSinceStart = Math.floor(
        (Date.now() - adjustedStartDate) / msInWeek,
    );

    switch (time) {
        case 'current':
            return getWeekRange(weeksSinceStart);
        case 'previous':
            return getWeekRange(weeksSinceStart - 1);
        case 'all':
        default:
            return null;
    }
};

export const filterByTime = (time: keyof typeof times) => {
    const timeRange = getRangeFromTime(time);

    // If 'all' then don't add a filter
    if (timeRange == null) return {};

    const gte = new Date(timeRange.start);
    const lte = new Date(timeRange.end);

    return {
        sumbitDate: {
            gte,
            lte,
        },
        date: {
            gte,
            lte,
        },
    };
};
