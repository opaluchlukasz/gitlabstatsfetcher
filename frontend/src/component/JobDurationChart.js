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

        const average = arrAvg(_.map(narrowed, 'duration'));

        const series = [{
            name: 'duration',
            data: _.map(narrowed, d => ({
                ...d,
                x: new Date(d.startedAt).getTime(),
                y: d.duration,
            }))
        }];

        const renderTooltip = ({seriesIndex, dataPointIndex, w}) => {
            const currentRun = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
            const previousRunDuration = dataPointIndex > 0 ? w.globals.initialSeries[seriesIndex].data[dataPointIndex - 1].duration : null;
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
            <Grid xs={12}
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-center">
                <Paper>
                <Grid
                    xs={6}
                    container
                    justify="flex-center"
                    alignItems="flex-center"
                >
                    <Grid xs={4}>
                        <strong>{`Duration of ${jobName} job`}</strong>
                    </Grid>
                </Grid>
                <Grid
                    xs={6}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-center"
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
