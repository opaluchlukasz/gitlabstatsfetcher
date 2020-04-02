import React from "react";
import _ from 'lodash';
import JobDurationChart from "./JobDurationChart";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProjectSelector from "./ProjectSelector";
import StageSelector from "./StageSelector";

export default class ProjectStats extends React.Component {
    state = {
        stages: [],
        selectedSteps: [],
        jobs: [],
        showSpinner: false
    };

    loadData = () => {
        const { projectId } = this.state;

        const groupByStages = jobs => {
            return _(jobs)
                .groupBy('stage')
                .reduce((array, children, key) => {
                    array.push({
                        stage: key,
                        jobNames: _(children).map(job => job.name).uniq().value()
                    });
                    return array;
                }, []);
        };

        if (projectId) {
            this.setState({
                showSpinner: true
            });
            fetch(`/v1/projects/${this.state.projectId}/jobs`)
                .then(res => res.json())
                .then((jobs) => {
                    this.setState({
                        jobs,
                        showSpinner: false,
                        stages: groupByStages(jobs)
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

    renderStageChooser() {
        return (<StageSelector stages={this.state.stages} handleChange={this.jobNameSelectionChanged}/>);
    }

    render() {
        const { selectedSteps, showSpinner } = this.state;

        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProjectSelector setProjectId={this.setProjectId} loadData={this.loadData} />
                    { showSpinner ?
                        <CircularProgress /> :
                        <>
                            {this.renderStageChooser()}
                            {selectedSteps.map(jobName => this.renderDurationChart(jobName))}
                        </>
                    }
                </Grid>
            </Grid>
        );
    }

    renderDurationChart(jobName) {
        return (<JobDurationChart key={jobName} jobName={jobName} jobs={this.state.jobs}/>);
    }
}
