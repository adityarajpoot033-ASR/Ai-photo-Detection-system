# VisionGuard AI - Image Authenticity & Detection System

> **Mini Project Submission**  
> **Course:** Bachelor of Technology (B.Tech) in Computer Science & Engineering  
> **Institution:** Medi-Caps University, Indore  
> **Evaluation:** Mini Project External Practical Viva (May 2026)

---

## 📌 Project Overview
**VisionGuard AI** is a premium, full-stack image authenticity and forensically deep detection system developed for evaluating synthetic media. With the exponential rise of AI-generated images (e.g., Midjourney, Stable Diffusion, DALL-E) and deepfakes, establishing digital identity, credibility, and content provenance has become critical. 

This application provides an interactive deep-scanning forensic analysis suite utilizing advanced structural diagnostics, frequency analysis modeling, and pixel noise pattern matching to successfully verify if a media file is an **authentic capture** or an **AI-generated output**.

---

## 🛠️ Technology Stack & Tools Used

### 💻 Frontend Architecture
*   **React 19 (SPA)**: Robust component state management and optimized rendering.
*   **Motion (Framer Motion)**: Implementing smooth, hardware-accelerated animations (such as the diagnostic scan lines and circular progress gauges).
*   **Tailwind CSS v4**: High-level utility classes used to construct a custom glassmorphic slate theme.
*   **Lucide React**: Clean, lightweight pixel-perfect SVG iconography.
*   **Vite**: Next-generation lightning-fast build tool and bundler.

### ⚙️ Backend & API layer
*   **Node.js & Express**: High-concurrency server hosting secure API endpoints.
*   **Multer Middleware**: Efficient stream-handling of multipart/form-data for high-resolution file uploads.
*   **TypeScript (Strict Mode)**: Comprehensive static type safety across client and server environments.

---

## 🌟 Key Features & Functionality
1.  **State-of-the-Art Drag & Drop Upload**: Accessible touch-safe uploader interface supporting drag, drop, and manual file selections.
2.  **Immersive Diagnostic Animation**: Simulated neural scanning bars, frequency grid ripples, and dynamic telemetry progress indicators showing real-time processing status.
3.  **High-Contrast Confidence Meter**: Interactive radial indicator displaying detection outcome percentages.
4.  **Forensic Diagnostics Summary**: Detailed textual breakdowns highlighting structural anomalies and sensory capture signatures.
5.  **Multi-Mode Engine**: Toggleable backend with high-fidelity Demo Mode to guarantee flawless, fast local presentations without API dependencies.
6.  **Fully Auditable Telemetry Model**: Robust, elegant desktop layouts that fit completely in standard evaluation frames.

---

## 📸 Screenshots & Output

### 1. VisionGuard AI Detection Dashboard
Below is an analysis result demonstrating the system classing a synthetic photo with high-precision metrics:

![VisionGuard AI Detection Result](./src/assets/images/visionguard_ui_result_1779881899054.png)

### 2. Neural Analytics and Forensic Telemetry Grid
The forensic diagnostic visualization used to analyze anomalies:

![Forensic Analytics Grid](./src/assets/images/visionguard_forensic_metrics_1779881918081.png)

## Live Demo

🔗 Vercel Deployment: https://your-vercel-link.vercel.app

Experience the AI Generated or Morphed Image Detection System live in your browser. Upload an image and instantly detect whether it is Real or AI Generated using our VGG16-based deep learning model.

---

## 🚀 Installation & Execution Steps

Follow these instructions to run the project locally on your system:

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (Version 18+ recommended) and `npm` installed.

### 🔧 Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone <your-repository-link>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   This installs all packages outlined in `package.json`:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   Launches the Express server in TypeScript execution mode and hot-reloads:
   ```bash
   npm run dev
   ```

4. **Access the Web Interface**:
   Open your browser and navigate to `http://localhost:3000` (Port 3000 is used for external reverse proxy setups).

---

## 👥 Team Details & Evaluation Metadata
*   **Institution**: Medi-Caps University, Indore
*   **Department**: Department of Computer Science & Engineering
*   **Submission Date**: May 27, 2026
*   **Scheduled Viva Date**: May 28, 2026
*   **Group Members**:
    *   **Student 1**: ADITYA RAJPUT(EN23CS301072)
    *   **Student 2**: ADITYA NAIK(EN23CS301069)

---

