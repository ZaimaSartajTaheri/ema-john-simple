import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51HZfxwJe4Bq9FIp3MS2sMuLSD5TiNj1qI8ZpFpPUqi8rtJcaQASdZg805A3OsuHzKqXt5wTAjY7XR71FqjB5MzfM00IrRA4aEV');

const PaymentProcess = ({handlePayment}) => {
    return (

        <Elements stripe={stripePromise}>
           <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
        </Elements>

    );
};

export default PaymentProcess;
