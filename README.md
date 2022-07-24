# Sick Fits
A fullstack online store with 4 main components: Users, Items, Orders, CartItems, and OrderItems featuring a classic CRUD app: Create, Read, Update, and Delete. The app also used Json Web Token to transfer data including authentication, email, images, and credit cards.  
## Techstacks:  
### Frontend: 
- React.js bootstrapped with server-rendering Next.js
- Managing queries and mutations, caching and local state with Apollo GraphQL
### Backend:
- GraphQL Yoga (Nodejs + Express + Apollo Server) for queries and mutations resolvers.
- Database is managed by Prisma
### How to run
- Go to backend and frontend folder to install required packages with `npm i`
- `cd backend` and run `npm run dev` to run server
- `cd frontend` and run `npm run dev` to run client