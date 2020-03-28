import React from 'react';
import './App.css';
import ProjectStats from "./component/ProjectStats";
import Container from "@material-ui/core/Container";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

function App() {
    momentDurationFormatSetup(moment);

    return (
        <Container maxWidth="xl">
            <div className="App">
                <ProjectStats />
            </div>
        </Container>
    );
}

export default App;
