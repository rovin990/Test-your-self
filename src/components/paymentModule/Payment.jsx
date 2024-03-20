import React from 'react'
import {  Button, Card,  CardContent, } from '@mui/material';

import PaymentService from '../../services/PaymentService';
import PaymentConstant from './PaymentConstant';

const _paymentService = new PaymentService();

function Payment() {


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function handleUserPayment(){
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        console.log(res)

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // creating a new order
        _paymentService.createOrder().then(result=>{
            if(result.status===200){
                const { amount, id: order_id, currency } = result.data;

                const options={
                    key: PaymentConstant.API_KEY,
                    amount: amount.toString(),
                    currency: currency,
                    name :"Quiz Master",
                    image:"https://quizmaster.kickthepast.com/images/kick1.jpg",
                    order_id:order_id,
                    handler:async function (response){
                        console.log(response)
                        const data ={
                            orderCreationId: order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                        };
            
                         _paymentService.saveOrder(data).then(dataSaveRes=>{
                            alert(dataSaveRes.data.msg);
                         }).catch(dataSaveErr=>{
                            console.log(dataSaveErr)
                         })
            
                        
                    },
                    prefill:{
                        name: "",
                        email: "",
                        contact: "",
                    },
                    notes: {
                        address: "Quiz master ",
                    },
                    theme: {
                        color: "#61dafb",
                    },
                   }

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            }
        }).catch(error=>{
            console.log(error)
        })     
    }

  return (
    <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <Card>
                        <CardContent>
                            <Button onClick={handleUserPayment} >Pay 99</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </>
  )
}

export default Payment;