import React from 'react';
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const ProjectSelector = ({ setProjectId, loadData }) => {
    return (
        <div>
            <FormGroup row>
                <TextField
                    id="outlined-secondary"
                    label="Project Id"
                    variant="outlined"
                    color="secondary"
                    onChange={setProjectId}
                />
                <Button variant="contained" color="primary" onClick={loadData}>
                    Load
                </Button>
            </FormGroup>
        </div>
    );
};

export default ProjectSelector;
