# Story Book Readme file

## Description

A fullstack MERN application meant to act as a capstone project for my journey though the Perscholas SE bookcamp.
The application primarily uses Canvas to draw and create the images. Dnd-Kit to order and interact with the pages to create a story, and finally BootStrap to display the images.
Blob files were used to save the images directly to the database instead of using a file server.


## Usage/Purpose

The goal of **Story Book** is to provide a seamless platform where creativity and simplicity intersect. By offering robust tools and an intuitive interface, Story Book allows users to focus on crafting their stories without getting bogged down by technical complexities. Whether you're creating bedtime tales, educational content, or personal narratives, Story Book caters to storytellers of all levels, enabling them to bring their visions to life with ease.

### Installing

[GitHub Repository](https://github.com/akoonth1/CapStone_Draw_FE "GitHub Capstone Front End") : Frontend

[GitHub Repository](https://github.com/akoonth1/CapStone_Draw_BE "GitHub Capstone Back End") : Backend

### How to Get Started
```
1. Clone the repository:


    git clone https://github.com/akoonth1/CapStone_Draw_BE

    git clone https://github.com/akoonth1/CapStone_Draw_BE


2. Navigate to the project directories: run npm install; add npm run build for production environment. Please review package.json to if  any packages or libraries may conflict within your local environment. 


3. Run npm run dev for the to start the Frontend and npm start for the Backend
Note: For deployment on Render use npm install -g serve  &&  serve -s dist

4. Create .env for enviromental vriables
a backend root link was added to the frontend .env for ease of use.
For the backend you will need a link to your database as well as a 
JWT Secret that you can produce her: https://jwtsecret.com/generate
 
```
In order to use this makefile you will need to make sure that the following
dependencies are installed on your system:
  - GNU make
  - Pandoc
  - LuaLaTeX
  - DejaVu Sans fonts



  ## Technologies Used
- VS Code
- JavaScript
- HTML
- CSS
- React
- DnD kit library
- React Bootstrap
- Multer
- Canvas

### Dependencies

- **Frontend:**
  - [React](https://reactjs.org/) ^18.3.1
  - [React Bootstrap](https://react-bootstrap.github.io/) ^2.10.5
  - [@dnd-kit/core](https://www.npmjs.com/package/@dnd-kit/core) ^6.1.0
  - [@dnd-kit/modifiers](https://www.npmjs.com/package/@dnd-kit/modifiers) ^7.0.0
  - [@dnd-kit/sortable](https://www.npmjs.com/package/@dnd-kit/sortable) ^8.0.0
  - [@dnd-kit/utilities](https://www.npmjs.com/package/@dnd-kit/utilities) ^3.2.2
  - [bootstrap](https://www.npmjs.com/package/bootstrap) ^5.3.3
  - [color-namer](https://www.npmjs.com/package/color-namer) ^1.4.0
  - [jwt-decode](https://www.npmjs.com/package/jwt-decode) ^4.0.0
  - [prop-types](https://www.npmjs.com/package/prop-types) ^15.8.1
  - [react-cookie](https://www.npmjs.com/package/react-cookie) ^7.2.2
  - [react-dom](https://www.npmjs.com/package/react-dom) ^18.3.1
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom) ^6.28.0
  - [uuid](https://www.npmjs.com/package/uuid) ^11.0.3

- **Backend:**
    - [Express](https://www.npmjs.com/package/express) ^4.21.1
    - [bcryptjs](https://www.npmjs.com/package/bcryptjs) ^2.4.3
    - [cors](https://www.npmjs.com/package/cors) ^2.8.5
    - [dotenv](https://www.npmjs.com/package/dotenv) ^16.4.5
    - [express-validator](https://www.npmjs.com/package/express-validator) ^7.2.0
    - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) ^9.0.2
    - [mongodb](https://www.npmjs.com/package/mongodb) ^6.10.0
    - [mongoose](https://www.npmjs.com/package/mongoose) ^8.8.2
    - [morgan](https://www.npmjs.com/package/morgan) ^1.10.0
    - [multer](https://www.npmjs.com/package/multer) ^1.4.5-lts.1
    - [node-fetch](https://www.npmjs.com/package/node-fetch) ^3.3.2
    - [nodemon](https://www.npmjs.com/package/nodemon) ^3.1.7


### Future Considerations

- **Clean up UI**
  - Refine the user interface for a more intuitive and visually appealing experience.

- **Make book creation a more interactive process**
  - Implement drag-and-drop functionality and real-time previews during book creation.

- **Add additional drawing tools**
  - **Background fill**
    - Allow users to fill the canvas with a selected color.
  - **Eyedropper**
    - Enable users to pick colors directly from the canvas.

- **Create categories to filter pages on**
  - Organize pages into categories to facilitate easier navigation and management.

- **Create categories to filter books on**
  - Categorize books to help users find and manage their collections efficiently.

- **Add a setting to make pages either public or private**
  - Provide privacy settings for pages, allowing users to control their visibility.

- **Add a seamless way to add pages to existing books**
  - Enable users to effortlessly append new pages to their current books without disrupting the workflow.

### Acknowledgments

    RTT433  -great class
    dnd kit -great library with many examples
    Bootstrap
    Canvas
    colormind.io api



[GitHub Repository](https://github.com/akoonth1/CapStone_Draw_FE "GitHub Capstone Front End") : Frontend

[GitHub Repository](https://github.com/akoonth1/CapStone_Draw_BE "GitHub Capstone Back End") : Backend