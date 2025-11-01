import React from 'react';

export const CoffeeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14.5 2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 2.5v1A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-1A1.5 1.5 0 0 0 14.5 1h-13z" />
    <path d="m13.5.5.645.645.645-.645a.5.5 0 0 1 .707 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .707-.707l-.646-.646-.646.646a.5.5 0 0 1-.708 0l-.646-.646-.646.646a.5.5 0 0 1-.708 0l-.646-.646-.646.646a.5.5 0 0 1-.707 0l-.646-.646-.646.646a.5.5 0 0 1-.707 0L13.5 0a.5.5 0 0 1 0 .5z" />
    <path fillRule="evenodd" d="M1.5 6a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h1zM2 5.5a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 2 18.5h10a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H2zm11 1.071c.28.134.522.31.714.522l2.21 2.21a.5.5 0 0 1 .018.686l-4.203 4.203a.5.5 0 0 1-.686-.018L9.314 12.73a.5.5 0 1 1 .686-.718l2.5 2.5 3.5-3.5-2.134-2.134a.5.5 0 0 1 .686-.718z" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const BackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    >
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

export const CoffeeCupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM2 21h18v-2H2v2z" />
  </svg>
);

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7v2a9 9 0 0 0 9-9 9 9 0 0 0-9-9z"/>
    <path d="M12 8v5l4.25 2.52.75-1.23-3.5-2.08V8H12z"/>
  </svg>
);

export const CycleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);

export const VarietiesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 5v3H6V5h10zm2.5-1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H18V5h.5zM4 19h16v2H4v-2z"/>
  </svg>
);

export const TourismIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export const EcosystemIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89-.66C7.01 16.31 9 12 17 10v2a1 1 0 0 0 1.71.71L22 9.41V4a1 1 0 0 0-1-1h-5.41l-3.3 3.29A1 1 0 0 0 8 7v1z"/>
  </svg>
);