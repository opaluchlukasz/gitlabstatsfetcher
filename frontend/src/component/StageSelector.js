import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const StageSelector = ({ stages, handleChange }) => {

    const renderJob = jobName => {
        return (<FormControlLabel
            key={jobName}
            control={<Checkbox onChange={handleChange} name={jobName} />}
            label={jobName}
        />)
    };

    const renderStage = stage => {
        return (<FormControl component="fieldset" key={stage.stage}>
            <FormLabel component="legend">{stage.stage}</FormLabel>
            <FormGroup>
                { stage.jobNames.map(renderJob) }
            </FormGroup>
        </FormControl>);
    };

    return (
        <>
            { stages.map(renderStage) }
        </>
    );
};

export default StageSelector;

