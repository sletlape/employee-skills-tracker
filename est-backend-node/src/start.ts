import app from './server';

const url = "http://localhost:";
const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at ${url}${port}/`);
});
