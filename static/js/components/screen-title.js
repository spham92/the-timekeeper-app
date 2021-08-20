window.timeKeeperComponents = window.timeKeeperComponents || {};

/**
 * Determine which title to use depending on the path matched with the
 * URL in the navigation bar
 *
 * @param {{path: string, title: string}[]} navLinks - Match a link with the page we're currently on
 * @returns {string|string|*}
 */
function determineTitle(navLinks) {
    const match = navLinks.find((navItem) => {
        return window.location.pathname.includes(navItem.path);
    });

    if (match) {
        return match.title;
    }
}

class ScreenTitle {
    constructor(container, navLinks) {
        this.container = container;
        this.title = determineTitle(navLinks);
    }

    render() {
        const markup = `
            <div class="row">
                <div class="col">
                    <h1 class="display-1">${this.title}</h1>
                </div>
            </div>
        `;
        this.container.innerHTML = markup;
    }
}

window.timeKeeperComponents.ScreenTitle = ScreenTitle;