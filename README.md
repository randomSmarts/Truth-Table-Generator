# Truth Table Generator and Visualizer

This is a **Truth Table Generator and Visualizer** built with **React.js**. The application allows users to create truth tables based on the number of variables they specify, customize the column headers (except the output column), and input custom output values. The app also includes functionality to **export** the generated table to the clipboard for pasting into Google Docs.

## Features

- Dynamically generate truth tables based on the number of variables.
- Customize column headers (except the output column).
- Input and modify output column values.
- **Export** the truth table to the clipboard in CSV format.
- Clean and modern UI with responsiveness for large tables (scroll horizontally and vertically).
- Buttons to **create a new table** or **export** the current one.

## How to Run Locally

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)

### Steps to Run

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/your-repo/truth-table-generator.git
    ```

2. **Open the project** in your preferred code editor. You can use **Visual Studio Code** or **IntelliJ IDEA**:

    - In **VS Code**: 
        - Open the project by going to `File` > `Open Folder` and selecting the folder containing the cloned repository.
    - In **IntelliJ IDEA**: 
        - Select `Open` from the welcome screen and choose the project directory.

3. **Install dependencies** by running the following command inside the main folder (where `package.json` is located):

    ```bash
    npm install
    ```

4. **Run the application** using the command:

    ```bash
    npm start
    ```

    This will start the development server, and you can view the app by navigating to `http://localhost:3000` in your web browser.

### Exporting the Truth Table

Once you've generated the truth table, you can press the **Export** button. The table will be copied to your clipboard in a format suitable for pasting into **Google Docs** or any other text editor that supports CSV formatting.

## Folder Structure

```plaintext
truth-table-generator/
├── node_modules/
├── public/
├── src/
│   ├── App.css       # Styles for the app
│   ├── App.js        # Main React component with the logic for generating the truth table
│   ├── index.js      # Entry point for React
├── package.json      # Project configuration and dependencies
└── README.md         # Information about the app and how to run it
