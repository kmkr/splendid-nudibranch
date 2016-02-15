export const PAGES = {
    COLLAGE: {
        url: '/',
        title: 'Splendid Nudibranch'
    },
    PHOTOS: {
        url: '/photos',
        title: 'Splendid Nudibranch - photos'
    }
};

export function currentPage() {
    const keys = Object.keys(PAGES).filter(pageName => (
        window.location.pathname.match(new RegExp(`^${PAGES[pageName].url}$`)))
    );

    return PAGES[keys[0]];
}
