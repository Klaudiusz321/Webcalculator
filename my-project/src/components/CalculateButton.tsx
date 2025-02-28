import React, { useState, useEffect } from "react";
import { MetricData } from "./MetricInputForm";

interface CalculateButtonProps {
  input: string;
  onCalculate: (result: MetricData) => void;
}

interface TaskStatus {
  state: 'PENDING' | 'SUCCESS' | 'FAILURE';
  result?: MetricData;
  error?: string;
  progress?: number;
}

const CalculateButton: React.FC<CalculateButtonProps> = ({ input, onCalculate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentInterval, setCurrentInterval] = useState<NodeJS.Timeout | null>(null);
  const [taskProgress, setTaskProgress] = useState<number>(0);

  const displayResult = (result: MetricData) => {
    console.log("Otrzymano wyniki:", result);
    onCalculate(result);
    setTaskProgress(100);
  };

  const displayError = (errorMessage: string) => {
    setError(errorMessage);
    setTaskProgress(0);
  };

  const pollTaskStatus = async (taskId: string) => {
    try {
      const response = await fetch(`https://calculator1-fc4166db17b2.herokuapp.com/api/task_status/${taskId}/`);
      const data: TaskStatus = await response.json();
      console.log("Status zadania:", data);

      // Aktualizuj progress jeśli jest dostępny
      if (data.progress) {
        setTaskProgress(data.progress);
      }

      switch (data.state) {
        case 'SUCCESS':
          if (data.result) {
            displayResult(data.result);
            return true;
          }
          break;
        case 'FAILURE':
          displayError(data.error || "Error");
          return true;
        case 'PENDING':
          // Kontynuuj polling
          return false;
      }
      return false;
    } catch (err) {
      console.error("Error during task status check:", err);
      displayError("Error during task status check");
      return true;
    }
  };

  useEffect(() => {
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [currentInterval]);

  const handleClick = async () => {
    if (!input.trim()) {
      setError("Enter metric data");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setTaskProgress(0);

      const calculateResponse = await fetch('https://calculator1-fc4166db17b2.herokuapp.com/api/calculate', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ metric_text: input }),
      });

      if (!calculateResponse.ok) {
        throw new Error("Error calculating");
      }

      const calculateData = await calculateResponse.json();
      const taskId = calculateData.task_id;
      console.log("Otrzymane task_id:", taskId);

      // Natychmiast sprawdź status po otrzymaniu task_id
      await pollTaskStatus(taskId);

      // Ustaw interwał do regularnego sprawdzania
      const intervalId = setInterval(async () => {
        const finished = await pollTaskStatus(taskId);
        if (finished) {
          clearInterval(intervalId);
          setCurrentInterval(null);
          setIsLoading(false);
        }
      }, 5000);

      setCurrentInterval(intervalId);

    } catch (error: any) {
      console.error(error);
      displayError("Server error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        style={{
          ...buttonStyle,
          opacity: isLoading ? 0.7 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? "Calculating..." : "Calculate"}
      </button>
      {error && <div style={errorStyle}>{error}</div>}
      {isLoading && (
        <div style={loadingContainerStyle}>
          <div style={loadingStyle}>
            Calculating... {taskProgress > 0 && `(${taskProgress}%)`}
          </div>
          {taskProgress > 0 && (
            <div style={progressBarContainerStyle}>
              <div 
                style={{
                  ...progressBarStyle,
                  width: `${taskProgress}%`
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#2a2a2a",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "4px",
  fontSize: "1rem",
  width: "100%",
  transition: "all 0.2s ease",
};

const errorStyle: React.CSSProperties = {
  color: "#ff6b6b",
  fontSize: "0.9rem",
  textAlign: "center",
  marginTop: "0.5rem",
};

const loadingContainerStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'center',
};

const loadingStyle: React.CSSProperties = {
  color: "#4CAF50",
  fontSize: "0.9rem",
  textAlign: "center",
  marginTop: "0.5rem",
};

const progressBarContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '4px',
  backgroundColor: '#2a2a2a',
  borderRadius: '2px',
  overflow: 'hidden',
};

const progressBarStyle: React.CSSProperties = {
  height: '100%',
  backgroundColor: '#4CAF50',
  transition: 'width 0.3s ease',
};

export default CalculateButton;
