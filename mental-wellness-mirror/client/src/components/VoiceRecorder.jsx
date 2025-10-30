import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [duration, setDuration] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        onRecordingComplete(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Recording Button */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {!isRecording ? (
            <motion.button
              key="start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#b8d4c5] to-[#c8e3f5] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
            >
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }}></div>
              <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform">🎙️</span>
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={stopRecording}
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-red-300 to-red-400 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-red-400/30"
              ></motion.div>
              <div className="w-8 h-8 bg-white rounded-lg relative z-10"></div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Recording Status */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 bg-red-400 rounded-full"
              ></motion.div>
              <span className="text-gray-600 font-medium">Recording...</span>
            </div>
            <div className="text-3xl font-light text-gray-700 tabular-nums">
              {formatTime(duration)}
            </div>
            <p className="text-sm text-gray-500 font-light">
              Speak freely, your voice matters
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Playback */}
      {audioURL && !isRecording && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="peaceful-card p-6 space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">🎵</span>
            <span className="text-gray-600 font-medium">Recording Complete</span>
          </div>
          
          <audio
            src={audioURL}
            controls
            className="w-full rounded-lg"
            style={{
              filter: 'hue-rotate(20deg) saturate(0.8)',
            }}
          />
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>Duration:</span>
            <span className="font-medium text-[#b8d4c5]">{formatTime(duration)}</span>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      {!isRecording && !audioURL && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-3 pt-4"
        >
          <p className="text-gray-600 font-light">
            Tap the microphone to begin
          </p>
          <p className="text-sm text-gray-400 font-light max-w-md mx-auto">
            Your voice recording stays private and secure. Take your time, there's no rush.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default VoiceRecorder;
