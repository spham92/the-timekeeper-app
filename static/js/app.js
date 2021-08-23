const DEFAULT_DURATION_MINUTES = 5;
const LOCAL_STORAGE_KEY = 'timeKeeperState';

class TimeKeeperApp {
    /**
     * Initialize the instance with the given values
     */
    constructor() {
        this.durationChangeCallbacks = [];
        this.initializeState();
        this.compareToUrlQueryParams();
        this.updateUrl();
        this.setupLocalStorageChangeListener();
    }

    initializeState() {
        const previousState = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        if (previousState) {
            this.syncFromStateObject(JSON.parse(previousState));
        } else {
            this.updateTimekeeperState(DEFAULT_DURATION_MINUTES, 'DEFAULT');
        }
    }

    compareToUrlQueryParams() {
        const { duration: durationUrlQueryParam } = window.timeKeeperUtils.parseUrlQueryParams();

        if (durationUrlQueryParam && durationUrlQueryParam !== this.duration) {
            this.updateTimekeeperState(durationUrlQueryParam, 'CUSTOM');
        } else {
            this.updateTimekeeperState(this.duration, this.durationType);
        }
    }

    /**
     * Sync the URL with the state of the class `duration`, `endTime`, and `startTime` values
     */
    updateUrl() {
        const url = new URL(window.location);
        url.searchParams.set('duration', `${this.duration}`);
        url.searchParams.set('endTime', this.endTime);
        url.searchParams.set('startTime', this.startTime);
        window.history.pushState({}, '', url);
    }

    executeCallbacksForDurationChange() {
        this.durationChangeCallbacks.forEach((callback) => {
            callback(this.duration, this.startTime, this.endTime, this.durationType);
        });
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
        this.persistToStorage();

        this.executeCallbacksForDurationChange();
    }


    /**
     * @param {{durationType: string, duration: number, startTime: number, endTime: number}} state
     */
    syncFromStateObject(state) {
        this.durationType = state.durationType;
        this.duration = state.duration;
        this.endTime = state.endTime;
        this.startTime = state.startTime;
    }

    setupLocalStorageChangeListener() {
        window.addEventListener('storage', (event) => {
            // Do nothing if the change is not for 'timeKeeperState' property
            if (event.key !== LOCAL_STORAGE_KEY || !event.newValue) {
                return;
            }

            this.syncFromStateObject(JSON.parse(event.newValue));
            this.executeCallbacksForDurationChange();
            this.updateUrl();
        });
    }

    /**
     * Store JSON string of the object of the current values for duration, durationType, endTime, and startTime
     */
    persistToStorage() {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
            duration: this.duration,
            durationType: this.durationType,
            endTime: this.endTime,
            startTime: this.startTime,
        }));
    }

    /**
     * Add the callback function to `durationChangeCallbacks`
     *
     * @param {function} callback - This function will be called with `duration`, `startTime`, `endTime`, `durationType`
     */
    callbackIfDurationChanged(callback) {
        this.durationChangeCallbacks.push(callback);
    }
}

window.TimeKeeperApp = TimeKeeperApp;