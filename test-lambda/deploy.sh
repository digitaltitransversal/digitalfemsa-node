#!/bin/bash

# Script para desplegar Lambda y replicar el issue

echo "🔨 Building SDK..."
cd ..
npm run build
cd test-lambda

echo "📦 Installing dependencies..."
npm install

echo "📦 Creating Lambda package..."
zip -r lambda.zip index.js node_modules/ -x "*.git*"

echo "☁️  Creating Lambda function..."
aws lambda create-function \
  --function-name test-digitalfemsa-ca-bundle \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://lambda.zip \
  --timeout 30 \
  --memory-size 512 \
  --environment Variables="{DIGITALFEMSA_API_KEY=key_xxxxx}"

echo "✅ Lambda created!"
echo ""
echo "To test:"
echo "aws lambda invoke --function-name test-digitalfemsa-ca-bundle output.json"
echo ""
echo "To view logs:"
echo "aws logs tail /aws/lambda/test-digitalfemsa-ca-bundle --follow"
