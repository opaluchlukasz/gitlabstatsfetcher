import React from 'react';
import moment from 'moment';

const Duration = props => {
    const { duration } = props;
    return (
        <>{ moment.duration(duration, 'seconds').format({ template: 'mm[m] ss[s]' }) }</>
    );
};

export default Duration;
