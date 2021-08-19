window.timeKeeperUtils = window.timeKeeperUtils || {};

window.timeKeeperUtils.CONSTANTS = {
  MINUTES_TO_SECONDS: 60,
  SECONDS_TO_MILLISECONDS: 1000,
  MINUTES_TO_MILLISECONDS: 60000,
};

window.timeKeeperUtils.parseUrlQueryParams = function() {
    const queryParamString = window.location.search;
    let duration;
    let startTime;
    let endTime;

    if (queryParamString && queryParamString.substring(1)) {
        const questionMarkRemoved = queryParamString.substring(1);
        const queryParamsSplit = questionMarkRemoved.split('&');
        queryParamsSplit.forEach((queryParamAndValue) => {
            const [key, value] = queryParamAndValue.split('=');

            if (key === 'duration') {
                duration = Number(value);
            } else if (key === 'startTime') {
                startTime = Number(value);
            } else if (key === 'endTime') {
                endTime = Number(value);
            }
        });
    }

    return {
        duration,
        startTime,
        endTime
    };
}