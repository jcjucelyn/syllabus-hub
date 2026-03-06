
# MIT Sloan — Simplify Your Syllabus

A mobile-friendly UI demo that helps MIT Sloan students centralize course information from their syllabi. Clean, professional, minimalist design with an MIT-inspired color palette (dark grays, white, subtle red accent).

## Pages & Features

### 1. Landing / Onboarding Screen
- App logo and tagline: "Upload your syllabus, and this tool does the rest!"
- "Get Started" button leading to the upload flow
- Clean, minimal hero design

### 2. Syllabus Upload Page
- Drag-and-drop area for PDF uploads (UI only — simulated parsing)
- Shows a loading/parsing animation, then populates mock course data
- Pre-loaded with sample MIT Sloan courses (e.g., 15.785 Intro to Product Management, 15.089 Analytics Capstone, 6.S899 Time Series Analysis)

### 3. Dashboard — List View (Default)
- Upcoming deadlines listed chronologically across all courses
- Each item shows: course name, assignment title, due date, type (exam/assignment/reading), and grade weight
- Filter chips to filter by course or assignment type
- Color-coded course badges

### 4. Dashboard — Calendar View
- Toggle between List and Calendar views
- Monthly calendar with deadline dots
- Tap a date to see that day's items
- Filterable by course

### 5. Course Summaries
- Expandable cards for each enrolled course
- Shows: course name, number, meeting time, professor, grading breakdown, key policies
- Quick-glance format pulled from syllabus data

### 6. AI Chatbot Panel
- Slide-up chat interface (mobile-friendly)
- Pre-populated sample Q&A (e.g., "When is my next AOK assignment?", "What's the grading policy for 15.785?")
- Simulated responses with cited sources
- Floating chat button on all screens

## Design Details
- **Typography**: Clean sans-serif (Inter or system font)
- **Colors**: White background, dark charcoal text, MIT red (#A31F34) as accent, light gray cards
- **Mobile-first**: Bottom navigation bar with icons for Dashboard, Calendar, Courses, Chat
- **Responsive**: Works on desktop too but optimized for phone screens

## Navigation
- Bottom tab bar: Home (list view) | Calendar | Courses | Chat
- Top bar with app name and user avatar

## Mock Data
- 3-4 sample MIT Sloan courses with realistic deadlines, grading breakdowns, and meeting times based on your PDF
