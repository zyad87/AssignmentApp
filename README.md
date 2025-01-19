
## **Overview**
This is a **Single Page Application (SPA)** built using **Vue.js** for managing a list of people. The application was developed as part of a coding task and goes beyond the basic requirements by including additional features to improve user experience and functionality.

---

## **Features**
1. **Core Features:**
   - **Add Person**: A form to add new people with fields for name, email, date of birth, country, and avatar.
   - **Edit Person**: Ability to edit the details of any person from the list.
   - **View People List**: Display all people in a card format.

2. **Additional Features:**
   - **Search Functionality**: Quickly find people by their names using a search bar.
   - **Filter by Age**: Sort people by age, either youngest to oldest or oldest to youngest.
   - **Home Page**: A landing page with a clean design that introduces the app and its purpose.
   - **Person Count**: Displays the total number of people available in the list.
   - **404 Page**: A custom "Not Found" page for invalid routes, improving navigation and user experience.
   - **Virtual Scrolling**: Efficiently display large lists using virtual scrolling to enhance performance.
   - **Responsive Design**: Fully responsive and optimized for different screen sizes.

---

## **Technologies & Tools Used**
1. **Frontend Framework:**
   - **Vue.js 3**: The main framework for building the SPA.
   - **Vue Router**: For handling client-side routing.

2. **Styling:**
   - **Tailwind CSS**: For utility-first and responsive design.
   - **DaisyUI**: Extending Tailwind with pre-styled components.

3. **Form & UI Components:**
   - **Flatpickr**: A lightweight date picker for selecting dates.
   - **Vue Multiselect**: A user-friendly dropdown component for selecting countries.

4. **HTTP Requests:**
   - **Axios**: For making API requests to the backend.
   - **Mock API**: Data is fetched and modified using `https://mockapi.io`.

5. **Testing:**
   - **Vitest**: A blazing-fast testing framework for unit testing.
   - **Vue Test Utils**: For testing Vue components.
   - **JSDOM**: For simulating the DOM during testing.

6. **Build Tools:**
   - **Vite**: A modern build tool for development and production builds.

7. **Icons:**
   - **Font Awesome**: For adding intuitive and visually appealing icons.

---

## **Project Structure**
- **`components`**:
  - `Layout`: Includes reusable components like `Header`, `Navbar`, and `Footer`.
  - `UI`: Contains individual UI components such as `Cards`, `Loaders`, and utility components like `ErrorMessage`.
- **`pages`**:
  - Each page corresponds to a route in the application (`HomePage`, `PersonListPage`, `AddPerson`, etc.).
- **`router`**:
  - Centralized configuration for managing application routes.
- **`assets`**:
  - For storing static assets like images or icons.

---

## **How to Run the Project**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vue-spa-task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

---

## **Available Scripts**
- **Development Server**: `npm run dev` - Starts the development server.
- **Build**: `npm run build` - Builds the application for production.
- **Preview**: `npm run preview` - Serves the production build for testing.
- **Test**: `npm run test` - Runs unit tests using Vitest.
- **Test Coverage**: `npm run test:coverage` - Displays test coverage report.

---

## **Author**
This project was developed by **Zyad**. Feel free to reach out or explore more of my work on [GitHub](https://github.com/zyad87).

