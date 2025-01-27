# PhotoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

PhotoApp
PhotoApp is a web application built using Angular 17 and Firebase for authentication with Google. The system follows a modular-based architecture and integrates with the JSONPlaceholder API to fetch and manage data such as users, albums, and photos. The application is designed to be responsive, ensuring a seamless user experience across mobile, tablet, and desktop devices.
Features
Authentication Module:
• Signup: Users can register for an account using email and password, with email verification.
• Login: Users can log in using email/password authentication or via Google Sign-In.
• Forgot Password: Users can reset their password by receiving a reset email.
• Verify Email: A user’s email address will be verified before allowing full access to the app.
Core Modules:

1. User Details: Displays detailed information about the selected user, including their albums.
2. Photo Details: Displays photos within selected albums, with an option to edit the photo title.
3. Albums: Provides an interface to view albums and their respective photos, showing how many albums each user has.
   Layout:
   • Header: Contains navigation links and the user’s authentication status.
   • Sidebar: Provides access to different sections of the app.
   • Main Layout: Acts as the container for the app's content, dynamically switching based on the active route.
   API Integration:
   The system uses JSONPlaceholder API to retrieve and manage the following data:
   • Users: User information such as name, username, and email.
   • Albums: Album information including album ID, user ID, and album title.
   • Photos: Photos belonging to albums, including photo title and image URL.
   Modular Architecture:
   • Each module has its own service file for interacting with APIs and handling logic.
   • Components in each module fetch data from APIs and pass it to services, ensuring clean separation of concerns.

---

Getting Started
Prerequisites
• Node.js and npm must be installed on your machine.
• Firebase project set up for authentication.
Installation

1. Clone this repository to your local machine:
   git clone https://github.com/Adefranky/SIL-ASSESSMENT.git
2. Navigate into the project folder:
   cd photoApp
3. Install the dependencies:
   npm install
4. Configure Firebase in the environment.ts file to enable Google authentication.
5. Run the development server:
   ng serve
   Navigate to http://localhost:4200/ in your browser.

---

Features in Detail
Authentication:
• Google Authentication: Users can sign in using their Google account. After successful authentication, a token is stored locally.
• Email Authentication: Standard email/password authentication is also supported.
Home:
• Displays analytics briefly about the user’s account.
• User’s album count is displayed and shows more analytics about their albums on that date.

Home:
• Fetches and displays a list of users from the JSONPlaceholder API.
• Each user’s album count is shown.
• Clicking the "View", “Edit” or “Details” button allows users to see detailed information about their albums.
Album Details:
• Users can view a list of albums belonging to the selected user.
• Each album can be selected to view the photos it contains.
• Photos can be edited by changing their title, with updates reflected in the backend.
Responsive Design:
• The application is designed to be fully responsive using Angular Material, ensuring it works well on mobile, tablet, and desktop devices.

---

Running Unit Tests
The application includes unit tests to ensure the functionality of core features.
• To run the unit tests:
ng test
• Tests are written using Jasmine and Karma.

---

Deployment
The application is hosted on Vercel Hosting. To deploy, use the following steps:

1. Build the project:
   ng build
2. Deploy the build to Vercel:
   Vercel deploy

---

Code Structure
• app/
o authentication/: Contains components and services for user authentication (login, signup, etc.).
o user-details/: Displays detailed information about the selected user.
o photo-details/: Manages photo-related functionalities.
o albums/: Manages albums and related data.
o layout/: Contains layout components such as header, sidebar, and main layout.
• services/: Contains services for API calls to the backend.

---

Technologies Used
• Angular 17: Framework for building the frontend.
• Firebase: Used for user authentication via Google and email/password.
• JSONPlaceholder API: A mock backend API used for fetching users, albums, and photos.
• Angular Material: For UI components and responsive layout.

---

Future Enhancements
• Add more advanced error handling for API requests.
• Implement pagination for users and albums.
• Enhance photo editing functionality to allow users to update photos directly.

---

This project follows good development practices such as modular architecture, clean code, and reusable components. It uses Angular services to interact with the backend, ensuring scalability and maintainability.
I have also added commits in my codes for easier understanding of the functionality of the codes and methods.
