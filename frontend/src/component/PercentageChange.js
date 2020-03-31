import React from 'react';
import moment from 'moment';

const PercentageChange = ({ current, previous }) => {
    if (!current || !previous) {
        return null;
    }
    const sign = current > previous ? '+' : '';
    const percentage = ((current - previous) / previous * 100).toFixed(2);
    return (
        current && previous ? <>({sign}{percentage}%)</> : null
    );
};

export default PercentageChange;
