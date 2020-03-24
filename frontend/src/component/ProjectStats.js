import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import StageChooser from "./StageChooser";
import JobDurationChart from "./JobDurationChart";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";

export default class ProjectStats extends React.Component {
    state = {
        stages: [],
        selectedSteps: [],
        jobs: []
    };

    loadData = () => {
        const {projectId} = this.state;
        if (projectId) {
            fetch(`/v1/projects/${this.state.projectId}/jobs`)
                .then(res => res.json())
                .then((jobs) => {
                    this.setState({
                        jobs,
                        stages: _(jobs)
                            .groupBy('stage')
                            .reduce(function (array, children, key) {
                                array.push({
                                    stage: key,
                                    jobNames: _(children).map(job => job.name).uniq().value()
                                });
                                return array;
                            }, [])
                    });
                });
        }
    };

    setProjectId = event => {
        this.setState({projectId: event.target.value})
    };

    jobNameSelectionChanged = event => {
        const name = event.target.name;
        this.setState(prevState => {
            return {
                ...prevState,
                selectedSteps: _.xor(prevState.selectedSteps, [name])
            }
        });
    };

    renderStageChooser(stage) {
        return (<StageChooser key={stage.stage} stage={stage} handleChange={this.jobNameSelectionChanged}/>);
    }

    render() {
        const {stages, selectedSteps} = this.state;

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                        <div>
                            <FormGroup row>
                                <TextField
                                    id="outlined-secondary"
                                    label="Project Id"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.setProjectId}
                                />
                                <Button variant="contained" color="primary" onClick={this.loadData}>
                                    Load
                                </Button>
                            </FormGroup>
                        </div>
                        {stages.map(stage => this.renderStageChooser(stage))}
                        {selectedSteps.map(jobName => this.renderDurationChart(jobName))}
                </Grid>
            </Grid>
        );
    }

    renderDurationChart(jobName) {
        return (<JobDurationChart key={jobName} jobName={jobName} jobs={this.state.jobs}/>);
    }
}
