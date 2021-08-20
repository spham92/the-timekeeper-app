window.timeKeeperComponents = window.timeKeeperComponents || {};

const navLinks = [{
    path: 'screenA',
    title: 'Screen A'
}, {
    path: 'screenB',
    title: 'Screen B'
}, {
    path: 'screenC',
    title: 'Screen C'
}];


class Navigation {
    /**
     * Keep track of the container
     *
     * @param {object} container - Object returned from document.querySelector
     * @param {{path: string, title: string}[]} navLinks - Used to generate the links in the navigation bar
     */
    constructor(container, navLinks) {
        this.container = container;
        this.navLinks = navLinks;
    }

    /**
     * Generate the navigation markup and insert it into the container.
     *
     * @param {string} querySearchString - Append this to the href links. Expected to contain `?`
     */
    render(querySearchString) {
        const navItems = this.navLinks.map((navItem) => {
            const {path, title} = navItem;
            const activeClass = window.location.pathname.includes(path) ? ' active' : '';
            return `
                <li class="nav-item">
                    <a class="nav-link${activeClass}" href="/${path}${querySearchString}" id="${path}-link">${title}</a>
                </li>
            `;
        });

        const initialNavigationHtml = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">The Timekeeper</a>
                    <button class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            ${navItems.join('')}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
        this.container.innerHTML = initialNavigationHtml;
    }
}

window.timeKeeperComponents.Navigation = Navigation;