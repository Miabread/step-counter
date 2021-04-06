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

export const times = ['All Time', 'This Week', 'Last Week'] as const;

const hour = 1000 * 60 * 60;
const week = hour * 24 * 7;
const utcOffset = -(hour * 4);

const trueStartDate = +new Date(2021, 2, 12);
const adjustedStartDate = trueStartDate + utcOffset;

export const getWeekRange = (weeksSinceStart: number) => {
    const start = adjustedStartDate + week * weeksSinceStart;
    const end = start + week;

    return { start, end } as const;
};
