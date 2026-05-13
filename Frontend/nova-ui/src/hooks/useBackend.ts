
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { api, BASE_URL } from '@/lib/api';

export interface Telemetry {
  fps: number;
  cpu_load: number;
  gpu_usage: number;
  ram_usage: number;
  status: string;
}

export interface Detection {
  label: string;
  confidence: number;
  x: number;
  y: number;
  z: number;
  timestamp?: string;
}

export interface DetectionState {
  confidence: number;
  detections: Detection[];
  model: string;
  status: string;
}

export interface BackendEvent {
  message: string;
  timestamp: string;
  type: string;
}

export function useBackend() {
  const [telemetry, setTelemetry] = useState<Telemetry | null>(null);
  const [detection, setDetection] = useState<DetectionState | null>(null);
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const poll = () => api.getTelemetry().then(setTelemetry).catch(console.error);
    poll();
    const id = setInterval(poll, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const poll = () => api.getDetection().then(setDetection).catch(console.error);
    poll();
    const id = setInterval(poll, 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    socketRef.current = io(BASE_URL);
    socketRef.current.on('connect', () => setConnected(true));
    socketRef.current.on('disconnect', () => setConnected(false));
    socketRef.current.on('event', (e: BackendEvent) => {
      setEvents(prev => [e, ...prev].slice(0, 50));
    });
    return () => { socketRef.current?.disconnect(); };
  }, []);

  return { telemetry, detection, events, connected };
}