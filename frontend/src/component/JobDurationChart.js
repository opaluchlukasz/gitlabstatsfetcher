import React from "react";
import Chart from 'react-apexcharts'
import _ from 'lodash';
import CommitTooltip from "./CommitTooltip";
import ReactDOMServer from 'react-dom/server';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Duration from "./Duration";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import regression from 'regression';

class JobDurationChart extends React.Component {
    state = {
        masterOnly: true
    };

    toggleMasterOnly = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                masterOnly: !prevState.masterOnly
            }
        });
    };

    render() {
        const { jobs, jobName } = this.props;

        const narrowed = _(jobs)
            .filter(job => job.status === 'success')
            .filter(job => !this.state.masterOnly || job.ref === 'master')
            .filter(job => job.duration)
            .filter(job => job.name === jobName)
            .value();

        const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

        const durations = _.map(narrowed, 'duration');
        const average = arrAvg(durations);
        const indexWithDuration = _.map(durations, (duration, i) => ([i, duration]));
        const dates = _.map(narrowed, run => new Date(run.startedAt).getTime());
        const regressionResult = regression.linear(indexWithDuration);

        const series = [{
            name: 'duration',
            data: _.map(narrowed, d => ({
                ...d,
                x: new Date(d.startedAt).getTime(),
                y: d.duration,
            }))
        },
        {
            name: 'trend',
            data: _.map(dates, (date, index) => ({ x: date, y: regressionResult.predict(index) }))
        }];

        const renderTooltip = ({dataPointIndex, w}) => {
            const currentRun = w.globals.initialSeries[0].data[dataPointIndex];
            const previousRunDuration = dataPointIndex > 0 ? w.globals.initialSeries[0].data[dataPointIndex - 1].duration : null;
            return ReactDOMServer.renderToString(
                <CommitTooltip
                    job={currentRun}
                    previousRunDuration={previousRunDuration}
                    averageDuration={average}
                />);
        };

        const options = {
            chart: {
                id: 'apexchart',
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            stroke: {
                curve: 'straight'
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                shared: true,
                custom: renderTooltip
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                labels: {
                    formatter: value => ReactDOMServer.renderToStaticMarkup(<Duration duration={value} />),
                }
            }

        };

        return (
            <Grid
                  container
                  direction="column"
                  justify="flex-start">
                <Paper>
                <Grid
                    container
                    justify="space-around"
                    alignItems="center"
                >
                    <Grid>
                        <strong>{`Duration of ${jobName} job`}</strong>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid item xs={4} className="center">
                        <div>Average: <Duration duration={average}/></div>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel
                            control={<Checkbox checked={this.state.masterOnly} onChange={this.toggleMasterOnly}/>}
                            label="Master only jobs"
                        />
                    </Grid>
                </Grid>
                <Chart options={options} series={series} type="area" height={600}/>
                </Paper>
            </Grid>

        )
    }
}

export default JobDurationChart;
