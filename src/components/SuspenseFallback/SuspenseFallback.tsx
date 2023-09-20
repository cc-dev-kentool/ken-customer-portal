// Importing React, Spinner component from react-bootstrap and the SuspenseContainer styled-component to be used in this component
import React from 'react';
import { Spinner } from "react-bootstrap";
import { SuspenseContainer } from './SuspenseFallback.style'

// Define a function component called `SuspenseFallback` which takes a props object as input and returns a JSX element.
export function SuspenseFallback(props) {
    // The component returns a div with the SuspenseContainer styles applied as a style attribute containing a Spinner component.
    return (
        <SuspenseContainer>
            <Spinner animation="border" />
        </SuspenseContainer>
    );
}
