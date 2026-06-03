# Testing Baseline - DigitalFemsa Node SDK

**Fecha de creación**: 2 de junio de 2026  
**Versión del SDK**: 1.1.1  
**Dependencias actuales**: axios@1.16.1

## 📊 Resultados del Baseline

### Test Suites
- **Total**: 22 test suites
- **Pasando**: 22 (100%)
- **Fallando**: 0

### Pruebas
- **Total**: 153 pruebas
- **Pasando**: 153 (100%)
- **Fallando**: 0

### Cobertura de Código
- **General**: 62.23%
- **APIs**: 61.33%
- **Models**: 100%
- **Common/Config**: ~85%

## 📁 Estructura de Pruebas

### Pruebas Existentes (3 archivos, 28 tests)
- `__tests__/api.spec.ts` - Instanciación de 19 APIs
- `__tests__/configuration.spec.ts` - Configuración
- `__tests__/models.spec.ts` - Exports de modelos

### Pruebas de Contrato Nuevas (19 archivos, 125 tests)

#### APIs Críticas (Cobertura Completa)
1. **OrdersApi** (23 tests)
   - createOrder, getOrderById, updateOrder, cancelOrder
   - orderRefund, orderCancelRefund, getOrders, ordersCreateCapture

2. **CustomersApi** (18 tests)
   - createCustomer, getCustomerById, updateCustomer, deleteCustomerById
   - getCustomers, createCustomerFiscalEntities

3. **PaymentMethodsApi** (16 tests)
   - getCustomerPaymentMethods, createCustomerPaymentMethods
   - updateCustomerPaymentMethods, deleteCustomerPaymentMethods

4. **WebhooksApi** (20 tests)
   - createWebhook, getWebhook, updateWebhook, deleteWebhook
   - getWebhooks, testWebhook

#### APIs Secundarias (Pruebas Básicas - 48 tests)
5. ApiKeysApi (9 tests)
6. BalancesApi (1 test)
7. ChargesApi (5 tests)
8. CompaniesApi (4 tests)
9. DiscountsApi (6 tests)
10. EventsApi (6 tests)
11. LogsApi (4 tests)
12. PaymentLinkApi (5 tests)
13. ProductsApi (3 tests)
14. ShippingContactsApi (3 tests)
15. ShippingsApi (3 tests)
16. TaxesApi (3 tests)
17. TransactionsApi (4 tests)
18. TransfersApi (4 tests)
19. WebhookKeysApi (5 tests)

## 🎯 Qué Validan las Pruebas

### Validaciones de Contrato
✅ **Parámetros requeridos**: Verifica que los campos obligatorios lancen `RequiredError`  
✅ **Estructura de requests**: Valida que los objetos tengan los campos correctos  
✅ **Tipos de datos**: Confirma que TypeScript acepta los tipos correctos  
✅ **Endpoints HTTP**: Verifica que se llamen los endpoints correctos (GET, POST, PUT, DELETE)  
✅ **Métodos HTTP**: Confirma que se usen los verbos HTTP correctos  

### Ejemplos de Campos Validados
- **OrderRequest**: `currency`, `customer_info`, `line_items` (requeridos)
- **Customer**: `name`, `email`, `phone` (requeridos)
- **WebhookRequest**: `url`, `synchronous` (requeridos)
- **PaymentMethod**: `type`, `token_id` (requeridos)

## 🔍 Cómo Usar Este Baseline

### Antes de Actualizar Dependencias
```bash
# 1. Ejecutar pruebas actuales (deben pasar todas)
npm test

# 2. Verificar que no hay errores
# Expected: 153 passed, 22 test suites passed
```

### Después de Actualizar Dependencias
```bash
# 1. Actualizar dependencias
npm install

# 2. Ejecutar pruebas
npm test

# 3. Comparar resultados:
#    - ¿Todas las 153 pruebas pasan?
#    - ¿Hay nuevos errores?
#    - ¿Cambió la cobertura significativamente?
```

### Interpretación de Resultados

#### ✅ Escenario Ideal
```
Test Suites: 22 passed, 22 total
Tests:       153 passed, 153 total
```
**Acción**: Dependencias actualizadas exitosamente, no hay breaking changes.

#### ⚠️ Escenario con Fallos
```
Test Suites: 2 failed, 20 passed, 22 total
Tests:       10 failed, 143 passed, 153 total
```
**Acción**: 
1. Revisar qué pruebas fallaron
2. Identificar qué cambió en la dependencia
3. Ajustar código si es necesario
4. Actualizar pruebas si el cambio es intencional

## 📝 Comandos Útiles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar solo pruebas de contrato
npm test -- __tests__/contract/

# Ejecutar pruebas de una API específica
npm test -- __tests__/contract/orders-api.contract.spec.ts

# Ver cobertura detallada
npm test -- --coverage --verbose

# Ejecutar pruebas en modo watch
npm test -- --watch
```

## 🚨 Vulnerabilidades Actuales (Pre-Fix)

```
3 vulnerabilities (2 moderate, 1 high)

- axios 1.13.6: 19 vulnerabilidades HIGH
- brace-expansion <1.1.13: 1 vulnerabilidad MODERATE  
- follow-redirects ≤1.15.11: 1 vulnerabilidad MODERATE
```

**Próximo paso**: FASE 2 - Actualizar dependencias y verificar que todas las pruebas sigan pasando.

## 📌 Notas Importantes

1. **Código Autogenerado**: Las APIs en `/api` y `/model` son autogeneradas por OpenAPI Generator. Las pruebas están en `__tests__/` y NO se regeneran.

2. **Propósito de las Pruebas**: Detectar breaking changes cuando:
   - Se actualizan dependencias (axios, etc.)
   - Se regenera el SDK con `make node`
   - La API de DigitalFemsa cambia

3. **Mantenimiento**: Si una prueba falla después de regenerar el SDK:
   - Revisar qué cambió en la API
   - Actualizar la prueba si el cambio es intencional
   - Documentar el breaking change

4. **Limitaciones**: Estas son pruebas de contrato con mocks, NO prueban:
   - La API real de DigitalFemsa
   - Lógica de negocio del backend
   - Casos edge complejos
   - Integración end-to-end

---

**Creado por**: Implementación FASE 1 del plan de pruebas de regresión  
**Próximo paso**: FASE 2 - Resolver vulnerabilidades con esta red de seguridad
