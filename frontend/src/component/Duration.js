import React from 'react';
import moment from 'moment';

const Duration = ({ duration }) => {
    return (
        <>{ moment.duration(duration, 'seconds').format({ template: 'mm[m] ss[s]' }) }</>
    );
};

export default Duration;
