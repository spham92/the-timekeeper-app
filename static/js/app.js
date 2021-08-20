const DEFAULT_DURATION_MINUTES = 5;

/**
 * Custom is determined when the value is not null or undefined
 *
 * @param {number || undefined || null} queryParamDuration
 */
function initializeDurationType(queryParamDuration) {
    const storedDurationType = window.sessionStorage.getItem('durationType');

    // If CUSTOM has been set in previous interactions, continue to use CUSTOM
    if (storedDurationType && storedDurationType !== 'DEFAULT') {
        return 'CUSTOM';
    }

    if (queryParamDuration === undefined || queryParamDuration === null) {
        return 'DEFAULT';
    }

    if (queryParamDuration !== DEFAULT_DURATION_MINUTES) {
        return 'CUSTOM';
    } else {
        return 'DEFAULT';
    }
}

class TimeKeeperApp {
    /**
     * Initialize the instance with the given values
     *
     * @param {number || undefined} duration - Integer in minutes
     */
    constructor(duration) {
        this.durationChangeCallbacks = [];
        this.updateTimekeeperState(duration || DEFAULT_DURATION_MINUTES, initializeDurationType(duration));
        this.updateUrl();
    }

    /**
     * Sync the URL with the state of the class `duration`, `endTime`, and `startTime` values
     */
    updateUrl() {
        const url = new URL(window.location);
        url.searchParams.set('duration', this.duration);
        url.searchParams.set('endTime', this.endTime);
        url.searchParams.set('startTime', this.startTime);
        window.history.pushState({}, '', url);
    }

    /**
     * Set the values for the instance's `duration` and `isCustom` properties. Recalculate endTime
     * and startTime timestamps. After updating the url, call any callback function in `durationChangeCallbacks`.
     *
     * @param {number} duration - Integer in minutes
     * @param {string} durationType - Either DEFAULT or CUSTOM
     */
    updateTimekeeperState(duration, durationType) {
        this.duration = duration;
        this.durationType = durationType;
        this.endTime = moment().unix();
        this.startTime = this.endTime - (this.duration * window.timeKeeperUtils.CONSTANTS.MINUTES_TO_MILLISECONDS);
        this.updateUrl();
        this.persistToStorage();

        this.durationChangeCallbacks.forEach((callback) => {
            callback(this.duration, this.startTime, this.endTime);
        });
    }

    persistToStorage() {
        window.sessionStorage.setItem('durationType', this.durationType);
    }

    /**
     * Add the callback function to `durationChangeCallbacks`
     *
     * @param {function} callback
     */
    callbackIfDurationChanged(callback) {
        this.durationChangeCallbacks.push(callback);
    }
}

window.TimeKeeperApp = TimeKeeperApp;