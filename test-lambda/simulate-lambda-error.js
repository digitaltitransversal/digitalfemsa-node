/**
 * Simula el error de ca_bundle.crt que ocurre en AWS Lambda
 * 
 * Ejecutar: node simulate-lambda-error.js
 */

const path = require('path');
const fs = require('fs');

console.log('🧪 Simulando entorno AWS Lambda...\n');

// Simular el __dirname de Lambda
const lambdaDir = '/var/task';
console.log(`📁 Lambda __dirname simulado: ${lambdaDir}`);

// Intentar construir la ruta del certificado como lo hace el SDK
const certPath = path.join(lambdaDir, '/cert/ca_bundle.crt');
console.log(`📄 Ruta del certificado: ${certPath}\n`);

// Intentar leer el archivo (esto fallará)
console.log('🔍 Intentando leer ca_bundle.crt...');
try {
  const cert = fs.readFileSync(certPath);
  console.log('✅ Certificado leído exitosamente (inesperado)');
} catch (error) {
  console.log('❌ ERROR REPLICADO:');
  console.log(`   Code: ${error.code}`);
  console.log(`   Message: ${error.message}`);
  console.log(`   Path: ${error.path}\n`);
  
  console.log('📋 Este es el mismo error que ocurre en AWS Lambda!\n');
}

// Mostrar dónde está realmente el certificado
const actualSdkPath = path.join(__dirname, '../dist/cert/ca_bundle.crt');
console.log('📍 Ubicación real del certificado en el SDK:');
console.log(`   ${actualSdkPath}`);
console.log(`   Existe: ${fs.existsSync(actualSdkPath) ? '✅' : '❌'}\n`);

// Mostrar el problema
console.log('⚠️  PROBLEMA:');
console.log('   El SDK usa __dirname para construir la ruta del certificado.');
console.log('   En Lambda, __dirname apunta a /var/task/');
console.log('   Pero el certificado está en node_modules/digitalfemsa/dist/cert/\n');

// Mostrar la solución
console.log('✅ SOLUCIÓN:');
console.log('   Usar un httpsAgent custom que no dependa del ca_bundle.crt:');
console.log('');
console.log('   const https = require("https");');
console.log('   const config = new Configuration({');
console.log('     accessToken: "key_xxxxx",');
console.log('     baseOptions: {');
console.log('       httpsAgent: new https.Agent({');
console.log('         rejectUnauthorized: true');
console.log('       })');
console.log('     }');
console.log('   });');
console.log('');
