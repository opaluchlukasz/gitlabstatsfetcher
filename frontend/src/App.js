import React from 'react';
import './App.css';
import ProjectStats from "./component/ProjectStats";
import Container from "@material-ui/core/Container";

function App() {
    return (
        <Container maxWidth="xl">
            <div className="App">
                <ProjectStats />
            </div>
        </Container>
    );
}

export default App;
