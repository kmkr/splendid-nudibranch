export default (photo, selectedTags) => {
    return selectedTags.some(selectedTag => photo.tags.indexOf(selectedTag) >= 0);
};
