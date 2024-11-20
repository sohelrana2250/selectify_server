import express from 'express';
import cors from 'cors';
import notFound from './middleware/notFound';
import globalErrorHandelar from './middleware/globalErrorHandelar';
import router from './router';

const app = express();

app.use(express.json());
//middlewere
//credentials:true
//https://shoes-client.vercel.app
app.use(cors());

//username: fastoffice
//password: F4AS8PdTspC11hW0

app.get('/', (req, res) => {
  res.send({ status: true, message: 'Well Come To selectify Server' });
});
// username : contract_management
// password: eIvMMRHLOP5wjaH7

// Error Handeller

// router handeller
app.use('/api/v1',router);

app.use(notFound);
app.use(globalErrorHandelar);

export default app;
