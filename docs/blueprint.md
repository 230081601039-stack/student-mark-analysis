# **App Name**: EduMetric Tracker

## Core Features:

- Secure Role-Based Authentication: User login/signup and session management for Admin, Faculty, and Students via Firebase Authentication.
- Student & Faculty Management (Admin): Admin interface to create, view, update, and delete student and faculty profiles stored in Firestore.
- Marks Entry & Update (Faculty): Faculty interface to securely input and modify student subject marks, updating Firestore in real-time.
- Student Performance Dashboard: Personalized student view displaying individual marks, total, grades, and pass/fail status, updated in real-time from Firestore.
- Grade & Status Calculation Logic: Backend logic (or Firebase Cloud Function for a full Next.js solution) to compute total marks, average, assign grades (A, B, C, Fail), and determine pass/fail status.
- Performance Visualizations with Charts: Interactive charts (e.g., Chart.js) for students and admins to visualize academic performance trends and breakdowns.
- Automated Performance Insight Tool: A generative AI tool that analyzes student marks to provide concise performance summaries and suggest personalized areas for improvement.

## Style Guidelines:

- Primary color: A deep, analytical blue (#3D7ACC) signifying clarity and professionalism. Chosen to evoke a sense of trust and academic rigor.
- Background color: A very light, desaturated blue (#EEF3FB), providing a clean and non-distracting canvas for data display. It maintains consistency with the primary hue while ensuring high readability.
- Accent color: A vibrant, clear aqua (#45C9C9) for interactive elements and highlights, offering good contrast with the primary and background colors to draw attention to key actions.
- Body and headline font: 'Inter' (sans-serif) for its modern, objective, and highly readable design, suitable for presenting data, tables, and analytical reports across the application.
- Utilize a set of clean, line-based icons for navigation, data visualization elements, and user actions to maintain a consistent and professional aesthetic.
- Implement a responsive design featuring a persistent sidebar navigation for easy access to different sections, along with card-based layouts for dashboards and clear tabular displays for academic records.
- Incorporate subtle transitions for page changes and interactive animations for chart elements, enhancing the user experience without being distracting.