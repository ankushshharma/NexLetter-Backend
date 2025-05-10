# Next Letter - AI-Powered Document Generator

A modern web application that helps users generate professional documents like LinkedIn messages, referral emails, and cover letters using AI technology.

## 🌟 Features

- **AI-Powered Document Generation**
  - LinkedIn referral messages
  - Professional referral emails
  - Customized cover letters
- **Modern UI/UX**
  - Responsive design
  - Smooth animations
  - Dark mode support
- **User-Friendly Interface**
  - Real-time document preview
  - Copy to clipboard functionality
  - Document saving capability
- **Smart Placeholder Detection**
  - Automatic detection of placeholders
  - User-friendly warnings for customization

## 🚀 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- MongoDB
- OpenAI API

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- OpenAI API key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/next-letter.git
cd next-letter
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables:
   - Copy `.env-example` to `.env` in the backend directory
   - Fill in your environment variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     OPENAI_API_KEY=your_openai_api_key
     ```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
next-letter/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
│
└── README.md
```

## 🔧 Configuration

### Frontend Configuration
- Environment variables are managed through Next.js configuration
- UI components are built using Shadcn UI
- Styling is done with Tailwind CSS

### Backend Configuration
- Environment variables are stored in `.env` file
- Database connection is configured in `config/database.js`
- API routes are organized in the `routes` directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- Shadcn UI for the beautiful components
- Framer Motion for the smooth animations 