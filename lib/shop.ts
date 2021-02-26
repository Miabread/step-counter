const shops: Record<string, number | undefined> = {
    'N/A': 0,
    'CPWD': 1,
    'Health Tech': 2,
    'Culinary': 3,
    'Design and Visual Communication': 4,
    'Business Tech': 5,
    'Cosmo': 6,
    'Electrical': 7,
    'Carpentry': 8,
    'HVAC': 9,
    'Plumbing': 10,
    'Painting and Design Technology': 11,
    'Drafting': 12,
    'Advanced Manufacturing': 13,
    'Auto Collision': 14,
    'Auto Tech': 15,
    'Metal Fabrication': 16,
    'Biotech': 17,
};

export const getShop = (shop = ''): number => shops[shop] ?? -1;
