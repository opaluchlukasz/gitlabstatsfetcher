import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default class StageChooser extends React.Component {

    handleSelection = event => {
        const {handleChange} = this.props;
        handleChange(event);
    };

    renderRow = jobName => {
        return (<FormControlLabel
            key={jobName}
            control={<Checkbox onChange={this.handleSelection} name={jobName} />}
            label={jobName}
        />)
    };

    render() {
        const {stage} = this.props;
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{stage.stage}</FormLabel>
                <FormGroup>
                    {stage.jobNames.map(jobName => this.renderRow(jobName))}
                </FormGroup>
            </FormControl>
        );
    }
}
