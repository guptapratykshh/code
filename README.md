# Trello Clone - Task Manager

A modern, responsive task management application built with React that mimics Trello's functionality. This application supports multiple boards, lists within boards, and drag-and-drop functionality for task cards.

## Features

### ✅ Core Features
- **Dashboard**: View and manage all boards
- **Board Management**: Create, rename, and delete boards
- **List Management**: Add, edit, and delete lists within boards
- **Task Management**: Create, edit, and delete task cards
- **Drag & Drop**: Move tasks between lists and reorder within lists
- **Data Persistence**: All data saved to localStorage
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🎯 Default Lists
Each new board comes with three default lists:
- **To Do**: Tasks that need to be started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

### 🚀 Bonus Features
- **Dark Mode Toggle**: Switch between light and dark themes
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean, intuitive design inspired by Trello
- **Keyboard Shortcuts**: ESC key to close modals
- **Confirmation Dialogs**: Prevent accidental deletions

## Technology Stack

- **React 18**: Modern React with hooks
- **@dnd-kit**: Drag and drop functionality
- **CSS3**: Custom styling with CSS Grid and Flexbox
- **localStorage**: Client-side data persistence
- **React Modal**: Modal components for editing

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trello-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Usage Guide

### Creating Your First Board
1. Click "Create Board" on the dashboard
2. Enter a board name
3. Click "Create Board"

### Managing Lists
- **Add List**: Click "+ Add another list" at the end of the board
- **Edit List**: Click on the list title to edit inline
- **Delete List**: Click the "×" button in the list header

### Managing Tasks
- **Add Task**: Click "+ Add a card" in any list
- **Edit Task**: Click on any card to open the edit modal
- **Delete Task**: Click the "×" button on a card or use the delete button in the modal
- **Move Task**: Drag and drop cards between lists or within the same list

### Dark Mode
Click the dark mode toggle button in the header to switch between light and dark themes.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard component
│   ├── Dashboard.css
│   ├── Board.js              # Individual board view
│   ├── Board.css
│   ├── List.js               # List component
│   ├── List.css
│   ├── Card.js               # Task card component
│   ├── Card.css
│   ├── CardModal.js          # Card editing modal
│   └── CardModal.css
├── App.js                    # Main app component
├── App.css                   # App-specific styles
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## Data Structure

### Board Object
```javascript
{
  id: string,
  name: string,
  lists: Array<List>,
  createdAt: string
}
```

### List Object
```javascript
{
  id: string,
  title: string,
  cards: Array<Card>
}
```

### Card Object
```javascript
{
  id: string,
  title: string,
  description: string,
  createdAt: string
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

1. **Data Storage**: All data is stored in localStorage, which has size limitations
2. **No Backend**: No server-side persistence or collaboration features
3. **No User Accounts**: Single-user application only
4. **No File Attachments**: Cards only support text content
5. **No Due Dates**: No deadline or reminder functionality

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Backend API integration
- [ ] Real-time collaboration
- [ ] File attachments
- [ ] Due dates and reminders
- [ ] Labels and tags
- [ ] Search functionality
- [ ] Export/import features
- [ ] Board templates
- [ ] Activity logs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Pratyksh**
- GitHub: [@pratyksh](https://github.com/pratyksh)

## Acknowledgments

- Inspired by Trello's user interface and functionality
- Built with modern React patterns and best practices
- Uses @dnd-kit for accessible drag and drop functionality
