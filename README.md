# 📄 Resume Builder

> A modern, full-stack resume builder application built with MERN stack (MongoDB, Express, React, Node.js)

![Status](https://img.shields.io/badge/status-active-success?style=flat-square) ![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square) ![Node Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen?style=flat-square)

---

## 🎯 Features

✨ **Easy Resume Creation** - Create professional resumes in minutes  
🎨 **Multiple Templates** - Choose from modern, minimal, and classic templates  
🖼️ **Image Support** - Upload and manage images with ImageKit integration  
💾 **Auto-Save** - Your resume is automatically saved as you type  
🎯 **AI-Powered** - AI assistance for professional summaries and content  
📱 **Responsive Design** - Works seamlessly on desktop and mobile  
🔐 **Secure Authentication** - User authentication and resume management  
📊 **Dashboard** - Manage all your resumes in one place

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Lightning-fast build tool
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **ImageKit** - Image management
- **AI Integration** - For content suggestions

---

## 📁 Project Structure

```
resume-builder/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Templates and dummy data
│   │   ├── configs/       # API configuration
│   │   └── app/           # Redux store
│   └── package.json
│
└── server/                 # Express Backend
    ├── controllers/       # Business logic
    ├── models/           # Database schemas
    ├── routes/           # API routes
    ├── middlewares/      # Custom middlewares
    ├── configs/          # Configuration files
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/heykaran77/resumint.git
   cd resume-builder
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

4. **Start the Application**

   Terminal 1 - Backend:

   ```bash
   cd server
   npm start
   ```

   Terminal 2 - Frontend:

   ```bash
   cd client
   npm run dev
   ```

5. **Open your browser** Navigate to `http://localhost:5173`

---

## 📖 Usage

### Creating a Resume

1. Sign up or log in to your account
2. Click "Create New Resume"
3. Fill in your personal information
4. Add education, experience, skills, and projects
5. Choose your preferred template
6. Customize colors and layout
7. Download or share your resume

### Available Templates

- **Classic** - Traditional and professional
- **Modern** - Contemporary with modern styling
- **Minimal** - Clean and minimalist design
- **Minimal Image** - Minimal design with image support

---

## 🔌 API Endpoints

### User Routes (`/api/users`)

- `POST /register` - Register a new user
- `POST /login` - User login
- `GET /profile` - Get user profile

### Resume Routes (`/api/resumes`)

- `GET /` - Get all resumes
- `POST /` - Create new resume
- `PUT /:id` - Update resume
- `DELETE /:id` - Delete resume
- `GET /:id` - Get specific resume

### AI Routes (`/api/ai`)

- `POST /generate-summary` - Generate professional summary

---

## 🎨 Customization

### Adding New Templates

1. Create a new component in `client/src/assets/templates/`
2. Follow the structure of existing templates
3. Add it to the template selector

### Environment Variables

**Server (.env)**

```env
MONGODB_URI=
JWT_SECRET=
PORT=5000
NODE_ENV=development
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_URL_ENDPOINT=
```

**Client (.env)**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Contact

**Author:** Karan Singh  
**GitHub:** [@heykaran77](https://github.com/heykaran77)  
**Project:** [Resume Builder](https://github.com/heykaran77/resumint)

---

## 🎉 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Redux Toolkit](https://redux-toolkit.js.org/)
- Icons and assets from [ImageKit](https://imagekit.io/)

---

**Made with ❤️ by [heykaran77](https://github.com/heykaran77)**
