# Test Lambda - Replicar Issue ca_bundle.crt

Este directorio contiene código para replicar el issue de `ca_bundle.crt` en AWS Lambda.

## 🎯 Objetivo

Demostrar que el SDK falla en AWS Lambda con el error:
```
Error: ENOENT: no such file or directory, open '/var/task/cert/ca_bundle.crt'
```

## 🚀 Método 1: Desplegar Lambda Real (Recomendado)

### Pre-requisitos
- AWS CLI configurado
- Cuenta AWS con permisos de Lambda
- IAM Role para Lambda

### Pasos

1. **Compilar el SDK**
```bash
cd ..
npm run build
cd test-lambda
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Crear el package**
```bash
zip -r lambda.zip index.js node_modules/
```

4. **Crear la función Lambda**
```bash
aws lambda create-function \
  --function-name test-digitalfemsa-ca-bundle \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://lambda.zip \
  --timeout 30 \
  --memory-size 512 \
  --environment Variables="{DIGITALFEMSA_API_KEY=key_xxxxx}"
```

5. **Invocar la función**
```bash
aws lambda invoke \
  --function-name test-digitalfemsa-ca-bundle \
  output.json

cat output.json
```

6. **Ver logs**
```bash
aws logs tail /aws/lambda/test-digitalfemsa-ca-bundle --follow
```

### Resultado Esperado

**Sin el workaround:**
```json
{
  "statusCode": 500,
  "body": {
    "error": "ENOENT: no such file or directory, open '/var/task/cert/ca_bundle.crt'",
    "code": "ENOENT"
  }
}
```

**Con el workaround (ver index-fixed.js):**
```json
{
  "statusCode": 200,
  "body": {
    "message": "Success",
    "orders": [...]
  }
}
```

## 🧪 Método 2: Simular Localmente con Docker

### Usar Lambda Runtime Interface Emulator

1. **Crear Dockerfile**
```bash
# Ver Dockerfile en este directorio
docker build -t test-lambda .
```

2. **Ejecutar**
```bash
docker run -p 9000:8080 \
  -e DIGITALFEMSA_API_KEY=key_xxxxx \
  test-lambda
```

3. **Invocar**
```bash
curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
  -d '{}'
```

## 🧪 Método 3: Simular el Error Localmente

### Script de Simulación

```bash
node simulate-lambda-error.js
```

Este script:
1. Cambia `__dirname` para simular el entorno Lambda
2. Intenta cargar el certificado
3. Muestra el error

## 📊 Comparación de Métodos

| Método | Realismo | Facilidad | Costo |
|--------|----------|-----------|-------|
| Lambda Real | ⭐⭐⭐⭐⭐ | ⭐⭐ | 💰 (mínimo) |
| Docker Local | ⭐⭐⭐⭐ | ⭐⭐⭐ | Gratis |
| Simulación Local | ⭐⭐ | ⭐⭐⭐⭐⭐ | Gratis |

## 🔧 Archivos

- `index.js` - Lambda con el issue (falla)
- `index-fixed.js` - Lambda con workaround (funciona)
- `package.json` - Dependencias
- `deploy.sh` - Script de despliegue
- `Dockerfile` - Para testing local
- `simulate-lambda-error.js` - Simulación simple

## 🧹 Limpieza

```bash
# Eliminar función Lambda
aws lambda delete-function --function-name test-digitalfemsa-ca-bundle

# Eliminar archivos locales
rm -rf node_modules lambda.zip output.json
```
