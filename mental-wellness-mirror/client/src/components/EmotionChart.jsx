import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const EmotionChart = ({ entries }) => {
  const chartRef = useRef(null);

  // Map moods to numerical values for visualization
  const moodValues = {
    happy: 5,
    energized: 5,
    hopeful: 4,
    content: 4,
    calm: 3,
    peaceful: 3,
    reflective: 2,
    worried: 1,
    sad: 1,
    frustrated: 0,
    stressed: 0,
    anxious: 0,
  };

  // Prepare data
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const labels = sortedEntries.map((entry) =>
    new Date(entry.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const data = sortedEntries.map(
    (entry) => moodValues[entry.mood.toLowerCase()] ?? 2
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Emotional Trend",
        data,
        borderColor: "rgb(184, 212, 197)", // Sage green
        backgroundColor: "rgba(184, 212, 197, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "rgb(200, 227, 245)", // Sky blue
        pointBorderColor: "#fff",
        pointBorderWidth: 3,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "rgb(184, 212, 197)",
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Your Emotional Journey",
        font: {
          size: 20,
          weight: "300",
          family: "'Inter', sans-serif",
        },
        color: "#6b7280",
        padding: 20,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const entry = sortedEntries[context.dataIndex];
            return `Mood: ${entry.mood}`;
          },
        },
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        titleColor: "#374151",
        bodyColor: "#6b7280",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        padding: 16,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: "500",
        },
        bodyFont: {
          size: 13,
          weight: "400",
        },
        cornerRadius: 12,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const labels = ["Low", "", "", "", "", "High"];
            return labels[value] || "";
          },
          color: "#9ca3af",
          font: {
            size: 12,
            weight: "300",
          },
        },
        grid: {
          color: "rgba(184, 212, 197, 0.1)",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#9ca3af",
          font: {
            size: 12,
            weight: "300",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  if (entries.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="peaceful-card p-12 text-center"
      >
        <div className="text-5xl mb-4">📊</div>
        <p className="text-gray-500 font-light text-lg">
          No entries yet. Start journaling to see your emotional trends!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="peaceful-card p-8"
    >
      <div className="h-80">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-6 border-t border-gray-200/50 text-center"
      >
        <p className="text-sm text-gray-400 font-light">
          Tracking {entries.length} moment{entries.length !== 1 ? 's' : ''} of reflection
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EmotionChart;
