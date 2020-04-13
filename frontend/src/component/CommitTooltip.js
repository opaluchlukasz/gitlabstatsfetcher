import React from 'react';
import Duration from "./Duration";
import PercentageChange from "./PercentageChange";

const CommitTooltip = ({job, previousRunDuration, averageDuration}) => {
    const { duration, commit } = job;
    return (
        <div className='arrow_box'>
            <div className='p-b-5'>{commit ? commit.message: ''}</div>
            <Duration duration={duration} />
            <div>
                &delta;	to previous: <PercentageChange previous={previousRunDuration} current={duration} />
            </div>
            <div>
                &delta;	to average: <PercentageChange previous={averageDuration} current={duration} />
            </div>
        </div>
    );
};

export default CommitTooltip;
