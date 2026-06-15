/**
 * Lambda function para replicar el issue de ca_bundle.crt
 * 
 * Para desplegar:
 * 1. zip -r lambda.zip index.js node_modules/
 * 2. aws lambda create-function --function-name test-digitalfemsa ...
 */

const { OrdersApi, Configuration } = require('digitalfemsa');

exports.handler = async (event) => {
  console.log('Lambda started');
  
  try {
    // Esto debería fallar con el error de ca_bundle.crt
    const config = new Configuration({
      accessToken: process.env.DIGITALFEMSA_API_KEY || 'key_test'
    });
    
    const ordersApi = new OrdersApi(config);
    
    console.log('Attempting to call getOrders...');
    const response = await ordersApi.getOrders();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success',
        orders: response.data
      })
    };
    
  } catch (error) {
    console.error('Error occurred:', error.message);
    console.error('Stack:', error.stack);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        code: error.code
      })
    };
  }
};
