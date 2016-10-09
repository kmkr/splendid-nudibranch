import actionTypes from './filter-action-types';
import filtersFromUrlParser from './filters-from-url-parser';

export function setSelectedFilters() {
    return {
        type: actionTypes.SET_FILTERS,
        data: filtersFromUrlParser()
    };
}
