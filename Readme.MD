# TestFlow UI

A modern, beautiful test management dashboard built with React, TypeScript, and Ant Design. TestFlow provides an intuitive interface for managing test cases, creating test plans, and monitoring test executions.

![TestFlow Dashboard](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Vite](https://img.shields.io/badge/Vite-6.0-purple) ![Ant Design](https://img.shields.io/badge/Ant%20Design-5.22-red)

## ✨ Features

### 📚 Test Library
- Create and manage test cases with Gherkin syntax
- Monaco Editor integration for syntax highlighting
- Tag-based organization and filtering
- Search functionality

### 📋 Test Plans
- Build test plans using an intuitive Transfer component
- Select multiple tests from your library
- Environment-specific configurations (Dev, Staging, Production)
- Edit existing plans with pre-filled data
- **Split Layout**: Plan details on the left, test selection on the right
- **Dynamic Counter**: Real-time count of selected tests
- **Search & Filter**: Find tests quickly with built-in search

### 🎯 Dashboard
- Overview statistics (Total Tests, Active Plans, Total Runs, Pass Rate)
- Recent activity monitoring
- Visual metrics and charts

### 🚀 Test Execution
- Run test plans with a single click
- Live progress monitoring
- Real-time log streaming
- Status tracking (Running, Passed, Failed)

## 🎨 UI/UX Highlights

- **Nord Dark Theme**: Professional, eye-friendly color palette
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modern Components**: Circular action buttons, tooltips, and icons
- **Color-Coded Environments**: Visual distinction for Production (red), Staging (orange), Dev (blue)
- **Clean Layout**: Maximized content area with intuitive navigation

## 🛠️ Tech Stack

- **Framework**: React 18.3
- **Language**: TypeScript 5.6
- **Build Tool**: Vite 6.0
- **UI Library**: Ant Design 5.22
- **State Management**: Zustand (with persistence)
- **Routing**: React Router v6
- **Code Editor**: Monaco Editor (VS Code engine)
- **Styling**: CSS with Nord color palette

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/semihsrdr/TestFlowUI.git

# Navigate to the project directory
cd TestFlowUI

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Usage

### Creating a Test
1. Navigate to **Test Library**
2. Click **Create Test**
3. Enter test name and tags
4. Write your test in Gherkin syntax using the Monaco Editor
5. Save

### Building a Test Plan
1. Navigate to **Test Plans**
2. Click **Create New Plan**
3. Enter plan name and select environment
4. Use the Transfer component to select tests
5. Watch the counter update as you select tests
6. Click **Create Plan**

### Running Tests
1. Go to **Test Plans**
2. Click the **Run** button (play icon) on any plan
3. Monitor progress and view live logs
4. Check results when execution completes

## 📁 Project Structure

```
src/
├── components/
│   └── MainLayout.tsx          # Main layout with sidebar and header
├── pages/
│   ├── Dashboard.tsx           # Overview and statistics
│   ├── TestLibrary.tsx         # Test list and management
│   ├── CreateTest.tsx          # Test creation/editing form
│   ├── TestPlans.tsx           # Test plans list
│   ├── CreatePlan.tsx          # Plan creation/editing form
│   ├── Runs.tsx                # Execution history
│   └── ExecuteRun.tsx          # Live execution monitoring
├── store/
│   ├── testStore.ts            # Test state management
│   ├── planStore.ts            # Plan state management
│   └── runStore.ts             # Run state management
├── App.tsx                     # Route configuration
└── main.tsx                    # Application entry point
```

## 🔧 Configuration

The application uses Zustand with localStorage persistence. All data is stored locally in the browser:
- `test-storage`: Test cases
- `plan-storage`: Test plans
- `run-storage`: Execution history

## 🎯 Key Features Implementation

### Bug Fixes
- **Test Count Fix**: Implemented unique ID validation to prevent duplicate test IDs in plans
- **Tag Safety**: Added safeguards for undefined tags to prevent crashes

### UI Improvements
- Split-screen layout for better workflow
- Enhanced Transfer component with search and tag display
- Circular action buttons with tooltips
- Dynamic test counter
- Color-coded environment badges

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Semih Sarıdere**
- GitHub: [@semihsrdr](https://github.com/semihsrdr)

## 🙏 Acknowledgments

- Built with [Ant Design](https://ant.design/)
- Monaco Editor by [Microsoft](https://microsoft.github.io/monaco-editor/)
- Inspired by modern test management tools

---

**Note**: This is a frontend-only application. For full functionality, integrate with a backend API for test execution and data persistence.