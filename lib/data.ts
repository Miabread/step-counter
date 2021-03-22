const shops = [
    'Academic/Support',
    'Advanced Manufacturing',
    'Auto Collision',
    'Auto Tech',
    'Biotech',
    'Business Tech',
    'CPWD',
    'Carpentry',
    'Cosmo',
    'Culinary',
    'Design and Visual',
    'Drafting',
    'Electrical',
    'HVAC',
    'Health Tech',
    'Metal Fabrication',
    'Painting and Design',
    'Plumbing',
];

export const shopToIndex = (shop: string) =>
    shops.findIndex((it) => it === shop);

export const shopEntries = shops
    // Don't include faculty in shop entries
    .slice(1)
    // Also provide the original index so the consumer can retrieve the correct data
    .map((it, i) => [it, i + 1] as const);

// Return a array of zeros the size of the `shops` array
export const createCount = () => shops.map(() => 0);

export const years = ['2021', '2022', '2023', '2024'];
