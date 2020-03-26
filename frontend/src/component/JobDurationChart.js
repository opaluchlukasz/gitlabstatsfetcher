import React from "react";
import Chart from 'react-apexcharts'
import _ from 'lodash';
import CommitTooltip from "./CommitTooltip";
import ReactDOMServer from 'react-dom/server';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

        let narrowed = _(jobs)
            .filter(job => job.status === 'success')
            .filter(job => !this.state.masterOnly || job.ref === 'master')
            .filter(job => job.duration)
            .filter(job => job.name === jobName)
            .value();

        const series = [{
            name: 'duration',
            data: _.map(narrowed, d => ({
                ...d,
                x: new Date(d.startedAt).getTime(),
                y: d.duration,
            }))
        }];

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
            title: {
                text: `Duration of ${jobName} job`,
                align: 'left'
            },
            stroke: {
                curve: 'straight'
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                custom: function ({seriesIndex, dataPointIndex, w}) {
                    return ReactDOMServer.renderToString(<CommitTooltip job={w.globals.initialSeries[seriesIndex].data[dataPointIndex]} />);
                }
            },
            xaxis: {
                type: 'datetime'
            }

        };

        return (
            <div>
                <FormControlLabel
                    control={<Checkbox checked={this.state.masterOnly} onChange={this.toggleMasterOnly} />}
                    label="Master only jobs"
                />
                <Chart options={options} series={series} type="area" width={900} height={400}/>
            </div>
        )
    }
}

export default JobDurationChart;
