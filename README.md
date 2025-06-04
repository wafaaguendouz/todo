# AI Todo Application

A modern, todo application built with React, TypeScript, and Vite, improved with AI capabilities for a smarter task management experience.

## 🌐 Live Demo

The application is deployed and available at: [https://todo-pi-mocha.vercel.app/](https://todo-pi-mocha.vercel.app/)

## 🚀 Features

- ✨ Modern React with TypeScript for type safety
- 🎨 Clean and responsive UI with SCSS styling
- 🤖 AI-powered task suggestions and assistance
- 🔄 Real-time updates
- 🎯 Task categorization and organization

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** SCSS
- **Routing:** React Router DOM
- **AI Integration:** OpenAI SDK
- **Deployment:** Vercel
- **Development Tools:**
  - ESLint for code linting
  - TypeScript for type checking
  - SASS for advanced styling

## 🏁 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [your-repository-url]
   cd todo
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:

   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

   > **Important Note:** The OpenAI integration is currently only working in the deployed environment.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:5173`

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable React components
├── contexts/      # React context providers
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── styles/        # Global styles and SCSS files
└── common/        # Shared utilities and types
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
