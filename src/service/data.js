import { Axios } from './helper';

export const predictUpiFraud = (upiData) => {
    return Axios.post('/predict-upi-fraud', upiData) 
        .then(response => {
            return response.data.prediction;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};