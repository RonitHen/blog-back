import express from 'express';
import postsRoutes from "./routes/postsRoutes";
import cors, {CorsOptions} from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const app = express();
const corsOptions: CorsOptions = {origin: 'http://localhost:3000',};
app.use(express.json());
app.use(cors(corsOptions));

const port = 4000;

app.use("/api/posts", postsRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})