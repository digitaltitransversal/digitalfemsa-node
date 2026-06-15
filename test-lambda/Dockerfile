# Dockerfile para simular AWS Lambda localmente
FROM public.ecr.aws/lambda/nodejs:18

# Copiar función Lambda
COPY index.js ${LAMBDA_TASK_ROOT}/
COPY package.json ${LAMBDA_TASK_ROOT}/

# Instalar dependencias
RUN npm install

# Comando handler
CMD [ "index.handler" ]
