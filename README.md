# Twidemia
CSCI3100 project

## Getting started

1. First install nodejs at https://nodejs.org/en/download/
1. Clone this repository
1. Install required libraries in the cloned directory
    ```
    npm install
    ```

1. Create a file called `.env.local` in the root folder, with the following contents:
    ```
    MONGODB_URI=mongodb+srv://Twidemia_Beta:Pot7Igg91HosFmQ8@cluster0.0zq4ijz.mongodb.net/Twidemia_Beta?retryWrites=true&w=majority

    NEXTAUTH_SECRET=YxHMNOc9B+x9LlUD3wYU/ewzBgaI0bSmbnOZDoWEHZg=
    NEXTAUTH_URL=http://localhost:3000

    ```

1. Run nextjs server in development mode
    ```
    npm run dev
    ```

1. Access the project on:
    ```
    localhost:3000
    ```

1. For development, download github desktop at https://desktop.github.com/

## Developement
1. Code linting: run `npm run lint` in terminanl
1. Code formatting: run `npm run format` in terminal

