import React from 'react';
import Duration from "./Duration";

const CommitTooltip = props => {
    const { duration, commit} = props.job;
    return (
        <div className='arrow_box'>
            <div className='p-b-5'>{commit ? commit.message: ''}</div>
            <Duration duration={duration} />
        </div>
    );
};

export default CommitTooltip;
