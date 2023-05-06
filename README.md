<h1 align="center">Twidemia</h1>
<h3 align="center">CSCI3100 Project</h3>
<p align="center">
Twidemia create an interactive platform where CUHK student can connect, share knowledge, and promote cross-cultural understanding.
It aims to facilitate an open exchange of academic resources, insights, and ideas across borders.
Through Twidemia GPTutor , we seek to build a supportive virtual community that enhances learning and nurtures intercultural relationships. Twidemia promises to expand minds and open minds by bringing students together in a shared passion for learning environment.
    <br> 
</p>
<h1></h1>
<h3>🛠&nbsp;Getting started with Twidemia</h3>

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
    OPENAIKEY=YOUR_REQUESTED_KEY
    
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=noreply.twidemia@gmail.com
    SMTP_PASSWORD=lnkfoqavvcgouazw
    SMTP_FROM_EMAIL=noreply.twidemia@gmail.com

    DOMAIN=http://localhost:3000

    ```
    
    Alternatively, use another email account:
    ```
    SMTP_USER=bot.twidemia@gmail.com
    SMTP_PASSWORD=rsturtnocotliakb
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

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Next.js](https://nextjs.org/) - Server Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://reactjs.org/) - Web Framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Socket.io](https://socket.io/) - Real-time Chat System
- [Openai](https://openai.com/blog/openai-api) - GPT3 API

## 🎓 Authors <a name = "authors"></a>
- Li Chi-Hsuan 
- Wang Han-Yi 
- Ng Hoi Leong 
- Tung Chun Ting 
- Tam Chi Hang 

