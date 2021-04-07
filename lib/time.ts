import { hour, times, week } from './data';

const utcOffset = -(hour * 4);

const trueStartDate = +new Date(2021, 2, 12);
const adjustedStartDate = trueStartDate + utcOffset;

const getWeekRange = (weeksSinceStart: number) => {
    const start = adjustedStartDate + week * weeksSinceStart;
    const end = start + week;

    return { start, end } as const;
};

const getRangeFromTime = (time: keyof typeof times) => {
    switch (time) {
        case 'current':
            return getWeekRange(1);
        case 'previous':
            return getWeekRange(0);
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
