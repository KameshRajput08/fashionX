import React from "react";
import styled from "styled-components";

export default function LoadingSpinner() {
  return (
    <Container className="spinner-container">
      <div className="loading-spinner"></div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #383636; /* Black */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
    z-index: 999;

    @media (max-width: 768px) {
    }
  }
`;
