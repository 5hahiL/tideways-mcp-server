export function formatDateForAPI(date) {
    return date.toISOString();
}
export function addDefaultDateRange(params) {
    if (!params.min_date && !params.max_date) {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return {
            ...params,
            min_date: formatDateForAPI(yesterday),
            max_date: formatDateForAPI(now),
        };
    }
    return params;
}
//# sourceMappingURL=date-utils.js.map