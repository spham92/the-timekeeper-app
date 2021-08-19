const DEFAULT_DURATION_MINUTES = 5;

/**
 * Custom is determined when the value is not null or undefined
 *
 * @param {number || undefined || null} queryParamDuration
 */
function isCustomDuration(queryParamDuration) {
    if (queryParamDuration === undefined || queryParamDuration === null) {
        return false;
    }

    return true;
}

class TimeKeeperApp {
    /**
     * Initialize the instance with the given values
     *
     * @param {number || undefined} duration - Integer in minutes
     */
    constructor(duration) {
        this.updateTimekeeperState(duration || DEFAULT_DURATION_MINUTES, isCustomDuration(duration));
        this.updateUrl();
    }

    updateUrl() {
        const url = new URL(window.location);
        url.searchParams.set('duration', this.duration);
        url.searchParams.set('endTime', this.endTime);
        url.searchParams.set('startTime', this.startTime);
        window.history.pushState({}, 'Hellow World', url);
    }

    /**
     * Set the values for the instance's `duration` and `isCustom` properties. Recalculate endTime
     * and startTime timestamps.
     *
     * @param {number} duration - Integer in minutes
     * @param {boolean} isCustom - Indicates whether the duration is custom or not
     */
    updateTimekeeperState(duration, isCustom) {
        this.duration = duration;
        this.isCustom = isCustom;
        this.endTime = moment().unix();
        this.startTime = this.endTime - (this.duration * window.timeKeeperUtils.CONSTANTS.MINUTES_TO_MILLISECONDS);
        this.updateUrl();
    }
}

window.TimeKeeperApp = TimeKeeperApp;