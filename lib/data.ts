export const shops = [
    'Academic/Support',
    'Advanced Manufacturing',
    'Auto Collision',
    'Auto Tech',
    'Biotech',
    'Business Tech',
    'CPWD',
    'Carpentry',
    'Cosmetology',
    'Culinary',
    'Design and Visual',
    'Drafting',
    'Electrical',
    'HVAC',
    'Health Tech',
    'Metal Fabrication',
    'Painting and Design',
    'Plumbing',
] as const;

export const shopToIndex = (shop: string) =>
    shops.findIndex((it) => it === shop);

export const years = [2021, 2022, 2023, 2024] as const;

export const stringYears = years.map(String);

export const times = {
    all: 'All Time',
    current: 'This Week',
    previous: 'Last Week',
};

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 25;
export const week = day * 7;
const utcOffset = -(hour * 4);

const trueStartDate = +new Date(2021, 2, 12);
const adjustedStartDate = trueStartDate + utcOffset;

const getWeekRange = (weeksSinceStart: number) => {
    const start = adjustedStartDate + week * weeksSinceStart;
    const end = start + week;

    return { start, end } as const;
};

export const getRangeFromTime = (time: keyof typeof times) => {
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
