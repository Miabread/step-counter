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

export const maxEntriesDisplayed = 20;

export const views = {
    shops: 'Shops',
    students: 'Students',
    faculty: 'Faculty',
    users: 'Users',
};

export const times = {
    all: 'All Time',
    current: 'This Week',
    previous: 'Last Week',
};

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const week = day * 7;
