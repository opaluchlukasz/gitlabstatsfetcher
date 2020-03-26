import React from "react";

const CommitTooltip = props => {
    const { duration, commit} = props.job;
    return (
        <div className="arrow_box">
            <div className='p-b-5'>{commit ? commit.message: ''}</div>
            <div>{duration}</div>
        </div>
    );
};

export default CommitTooltip;
