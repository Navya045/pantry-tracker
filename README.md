# Pantry Tracker

Pantry Tracker is a serverless Progressive Web App (PWA) built with Next.js, Firebase, and React Hooks. It allows users to keep track of their pantry items, including the ability to add, edit, delete, and search for items. The app is designed to work offline and provides a user-friendly interface for managing pantry inventory.

## Features

- **Add Pantry Items**: Easily add new items to your pantry with their name and quantity.
- **Edit Pantry Items**: Update existing items in your pantry.
- **Delete Pantry Items**: Remove items from your pantry.
- **Search Functionality**: Quickly find items in your pantry using the search bar.
- **User Authentication**: Secure authentication using Firebase Authentication.
- **Offline Support**: Works offline as a PWA.
- **Responsive Design**: Mobile-friendly interface.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **Firebase**: Backend services including Firestore for database, Authentication for user management, and Storage for file uploads.
- **React Hooks**: For state management and side effects.
- **Styled Components**: For styling the application.

## Installation

1. **Clone the repository**:
   
   git clone https://github.com/YOUR_GITHUB_USERNAME/pantry-tracker.git
   cd pantry-tracker
2. Install dependencies:

- npm install

3. Set up Firebase:

- Create a Firebase project at Firebase Console.
- Add a web app to your Firebase project.
- Copy the Firebase configuration and set it in a .env.local file:
plaintext

- NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
- NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
- NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

4. Run the application:

- npm run dev
5. Build the applicatio :

- npm run build
- npm start

# Deployment
- Deploy to Vercel:
- Connect your GitHub repository to Vercel.
- Set the environment variables in the Vercel dashboard.
- Deploy the application.
# Contributing
- Contributions are welcome! Please open an issue or submit a pull request.

# License
- This project is licensed under the MIT License. See the LICENSE file for details.

