const queryHelper = (queryParameter: Record<string, unknown>) => {
    const { page = 1, limit = 10, sortBy, sortOrder, minPrice, maxPrice, tags, startDate, endDate, language, provider, durationInWeeks, level,
    } = queryParameter;

    const currentPage = parseInt(page as string, 10);
    const currentLimit = parseInt(limit as string, 10);

    const query: Record<string, unknown> = {};

    if (minPrice && maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (tags) {
        query["tags.name"] = tags;
    }

    if (startDate && endDate) {
        query.startDate = { $gte: startDate }
        query.endDate = { $lte: endDate }
    }

    if (language) {
        query.language = language;
    }

    if (provider) {
        query.provider = provider;
    }

    if (durationInWeeks) {
        query.durationInWeeks = durationInWeeks;
    }

    if (level) {
        query['details.level'] = level;
    }

    let sortOptions: string = 'createdAt'

    if (sortBy) {
        sortOptions = (sortBy as string).split(',').join(' ')
    }

    if (sortOrder) {
        const s = sortOrder == "desc" ? "-" : ""
        sortOptions = Object.keys(query).map(key => s + key).join(' ')
    }

    return { query, sortOptions, currentPage, currentLimit }
};

export default queryHelper;