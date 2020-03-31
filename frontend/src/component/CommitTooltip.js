import React from 'react';
import Duration from "./Duration";
import PercentageChange from "./PercentageChange";

const CommitTooltip = ({job, previousRunDuration}) => {
    const { duration, commit } = job;
    return (
        <div className='arrow_box'>
            <div className='p-b-5'>{commit ? commit.message: ''}</div>
            <Duration duration={duration} />
            <PercentageChange previous={previousRunDuration} current={duration} />
        </div>
    );
};

export default CommitTooltip;
