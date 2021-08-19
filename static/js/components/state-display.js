window.timeKeeperComponents = window.timeKeeperComponents || {};

class StateDisplay {
    /**
     * Keep track of the container
     *
     * @param {object} container - Object returned from document.querySelector
     */
    constructor(container) {
        this.container = container;
    }

    /**
     * Generate the new markup with the given values and insert into the container
     *
     * @param {number} duration - Integer in minutes
     * @param {number} startTime - Timestamp since epoch in milliseconds
     * @param {number} endTime - Timestamp since epoch in milliseconds
     * @param {string} durationType - Expected to be either DEFAULT or CUSTOM
     */
    render(duration, startTime, endTime, durationType) {
        const markup = `
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            End Time
                        </div>
                        <div class="card-body">
                            ${endTime} ms
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">
                            Start Time
                        </div>
                        <div class="card-body">
                            ${startTime} ms
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="row  justify-content-center mt-3">
                <div class="col-6">
                    <div class="card">
                        <div class="card-body">
                            <form>
                                <label for="duration-input" class="form-label">Duration <small>(minutes)</small></label>
                                <input type="number" id="duration-input" class="form-control" value="${duration}">
                                <div id="duration-input-helpblock" class="form-text">
                                    Current duration is <span class="badge bg-secondary">${durationType}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.container.innerHTML = markup;
    }
}

window.timeKeeperComponents.StateDisplay = StateDisplay;