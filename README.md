# Thread

## Core Features Implemented

### 1. Add to Closet (Scan & Upload Clothing Items)

- Users can upload images of clothing items using the in-app camera.
- The image is sent to the backend where Gemini AI generates a title and description.
- Users can edit the AI-generated details before confirming.
- Clothing items are saved to the user’s closet in MongoDB.
- Error handling alerts users when an image input is invalid.

### 2. Style an Outfit

- Users are guided through a 3-question quiz: Occasion, Weather, and Style.
- Answers are sent to the backend, where AI generates a personalized outfit using items from the user’s closet.
- Users can edit their quiz answers via “Edit” buttons on the summary screen.
- Generates a style result using previously uploaded clothing items.

> **Note:** Tutorial, onboarding quiz, and outfit regeneration buttons are not functional in the HFP.

---

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/thread-cmpt363/p4.git
```

### 2. Set Up Environment Variables

Create a `.env` file in the `/server` directory and add:

```env
GEMINI_API_KEY=AIzaSyBS0xW9mmz7QgrR00b2PBYI6uu4z0SwMx4
MONGODB_URI=mongodb+srv://asmitasrivastava007:aObJuXjL9kZBL7Gy@threadapp.k3ocykf.mongodb.net/?retryWrites=true&w=majority&appName=ThreadApp
```

### 3. Set Up MongoDB

- Create a MongoDB account at [mongodb.com](https://www.mongodb.com)
- Request access to the database to ensure in-app database connection

### 4. Start the Server

```bash
cd thread/server
node index.js
```

### 5. Set Up Ngrok

```bash
ngrok http 3001
```

- Copy the forwarding address (e.g., `https://0c5d-207-23-187-141.ngrok-free.app`)
- Replace all instances of the backend URI in the frontend:

**Files:** `bottomnavigation.tsx`, `summary.tsx`, `closet-item-preview.tsx`, `style-me-result.tsx`

> Use `Ctrl+F` to search for `ngrok-free.app` and replace with your copied address.

### 6. Start the Frontend

```bash
npx expo start -c
```

- Scan the QR code using Expo Go on your mobile device.

> If required, we’re happy to showcase the app in person during office hours.

---

## Exact Walkthrough Instructions

### Step 1: Launch the App

- Start the app from your mobile device using the Expo QR code (see Setup below).

### Step 2: Add Clothing Items to Closet

- From the dashboard, tap on the **"Add to Closet"** button.
- Use the in-app camera to take a photo of a clothing item.
- You’ll see a camera tip on-screen. Capture a clear, full-view image.
- If the photo is invalid, an error message will guide you to retry.
- Once accepted, the AI will generate a title and description.
- Edit the title and description manually if needed.
- Tap **"Add to Closet"** to save the item to your user closet.

### Step 3: Style an Outfit

- Return to the dashboard and tap **"Style an Outfit"**.
- Tap **"Get Started"** to begin the quiz.
- Answer the three questions:
  - Q1: Occasion
  - Q2: Weather
  - Q3: Style
- Error messages will appear if answers are invalid on the summary screen when you tap the arrow button.
- On the summary screen, tap the **"Edit"** button to change any answer.
- Tap **"Generate Outfit"**.
- View the AI-generated outfit using your closet items.

> Optional: Regeneration buttons are visible but not yet functional.
