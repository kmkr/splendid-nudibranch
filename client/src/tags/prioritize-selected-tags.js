import isMatch from './selected-tags-matcher';

export default (selectedTags) => {

    return (p1, p2) => {
        if (selectedTags.length) {
            const p1Match = isMatch(p1, selectedTags);
            const p2Match = isMatch(p2, selectedTags);
            if (p1Match === p2Match) {
                return 0;
            }

            return p1Match < p2Match;
        } else {
            return 0;
        }
    };
};
