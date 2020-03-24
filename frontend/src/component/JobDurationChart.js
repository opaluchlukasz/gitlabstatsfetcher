import React from "react";
import Chart from 'react-apexcharts'
import _ from 'lodash';

class JobDurationChart extends React.Component {
    state = {
        jobs: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.jobs !== prevState.jobs) {
            return {
                jobs: nextProps.jobs,
            };
        } else {
            return null;
        }
    }

    render() {
        let narrowed = _(this.state.jobs)
            .filter(d => d.status === 'success')
            .filter(d => d.ref === 'master')
            .filter(d => d.duration)
            .filter(d => d.name === this.props.jobName)
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
            dataLabels: {
                enabled: false
            },
            tooltip: {
                custom: function ({seriesIndex, dataPointIndex, w}) {
                    return '<div class="arrow_box">' +
                        '<span>' + w.globals.initialSeries[seriesIndex].data[dataPointIndex].commit.message + '</span></div>'
                }
            },
            xaxis: {
                type: 'datetime'
            }

        };

        return (
            <Chart options={options} series={series} type="area" width={900} height={400}/>
        )
    }
}

export default JobDurationChart;
