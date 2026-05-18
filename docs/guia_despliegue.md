# 🚀 Guía de Despliegue en Producción sobre AWS EKS

Esta documentación describe el proceso completo para desplegar la aplicación desde cero en un entorno de producción utilizando AWS EKS, Terraform y Kubernetes.

> **Objetivo:**
> Disponer de una guía de referencia rápida para reconstruir toda la infraestructura y desplegar nuevamente el proyecto en AWS tras eliminar el entorno anterior.

---

# 1. Configuración y Autenticación en AWS

Antes de comenzar, es necesario configurar las credenciales del entorno AWS Learner Lab para que la terminal pueda interactuar con los servicios de AWS.

Ejecuta el siguiente comando:

```bash
aws configure
```

Introduce los siguientes datos cuando sean solicitados:

* Access Key
* Secret Access Key
* Session Token
* Región (`us-east-1`)

---

# 2. Creación de la Infraestructura con Terraform

Accede al directorio de Terraform y ejecuta el despliegue automático de la infraestructura.

Este proceso creará:

* Clúster EKS
* Red y subredes
* Security Groups
* Repositorios ECR
* Recursos asociados

```bash
cd terraform

terraform apply -auto-approve
```

> **Importante:**
> La creación completa de la infraestructura puede tardar entre 15 y 20 minutos.

---

# 3. Configuración de `kubectl`

Una vez creado el clúster, configura `kubectl` para conectarse a Kubernetes en AWS.

```bash
aws eks update-kubeconfig \
  --name tfg-taekwondo-cluster \
  --region us-east-1
```

Este comando actualizará automáticamente el archivo de configuración local de Kubernetes.

---

# 4. Instalación del Driver de Volúmenes Persistentes

Para permitir que Kubernetes cree volúmenes persistentes en AWS EBS, es obligatorio instalar el complemento `aws-ebs-csi-driver`.

> **Advertencia:**
> Si este complemento no se instala, los pods que dependan de almacenamiento persistente permanecerán indefinidamente en estado `Pending`.

Ejecuta:

```bash
aws eks create-addon \
  --cluster-name tfg-taekwondo-cluster \
  --addon-name aws-ebs-csi-driver \
  --region us-east-1
```

> Se recomienda esperar entre 1 y 2 minutos antes de continuar para permitir que AWS complete la instalación.

---

# 5. Configuración de Certificados SSL

Regresa a la raíz del proyecto y crea el secreto TLS de Kubernetes utilizando los certificados SSL proporcionados por IONOS.

```bash
cd ..

kubectl create secret tls ionos-tls-secret \
  --cert=client/cert_temp/certificado.crt \
  --key=client/cert_temp/clave.key
```

Este secreto será utilizado posteriormente por el proxy o ingress para habilitar HTTPS.

---

# 6. Despliegue de la Aplicación en Kubernetes

Aplica todos los manifiestos necesarios para desplegar la infraestructura interna, el proxy y la aplicación.

```bash
kubectl apply -f kubernetes/infraestructura.yml
kubectl apply -f kubernetes/proxy.yml
kubectl apply -f kubernetes/despliegue.yml
```

## Verificación del Estado de los Pods

Para supervisar el estado de los pods en tiempo real:

```bash
kubectl get pods -w
```

> Espera hasta que todos los pods se encuentren en estado `Running` antes de continuar.

---

# 7. Inicialización de la Base de Datos

Tras el primer despliegue, la base de datos estará vacía. Es necesario ejecutar las migraciones de Django y crear el usuario administrador.

---

## 7.1 Obtener el Nombre del Pod del Backend

```bash
kubectl get pods | grep backend
```

Ejemplo:

```text
backend-deployment-6f4d495877-kvhsb
```

---

## 7.2 Ejecutar las Migraciones

```bash
kubectl exec -it [NOMBRE_DEL_POD] -- python manage.py migrate
```

Este comando creará todas las tablas necesarias en la base de datos.

---

## 7.3 Crear el Usuario Administrador

```bash
kubectl exec -it [NOMBRE_DEL_POD] -- python manage.py createsuperuser
```

Introduce los datos solicitados para acceder posteriormente al panel de administración de Django.

---

## 7.4 Reiniciar el Backend

Durante el primer despliegue, el backend puede intentar conectarse a la base de datos antes de que esta termine de inicializarse, lo que puede generar errores temporales como `502 Bad Gateway`.

Para evitar problemas de conexión, reinicia el despliegue del backend:

```bash
kubectl rollout restart deployment backend-deployment
```

---

# 8. Configuración del Dominio en IONOS

Obtén la URL pública asignada por AWS al servicio principal:

```bash
kubectl get service proxy-service
```

Busca el valor de la columna:

```text
EXTERNAL-IP
```

El resultado tendrá un formato similar a:

```text
xxxxxxxxxx.us-east-1.elb.amazonaws.com
```

---

## Configuración DNS

1. Copia la URL proporcionada por AWS.
2. Accede al panel de administración de IONOS.
3. Dirígete a la configuración DNS del dominio.
4. Crea un registro:

   * Tipo: `CNAME` o `ALIAS`
   * Destino: URL del balanceador de carga de AWS.

---

## Configuración del Frontend

Asegúrate de modificar el archivo:

```text
config.js
```

para que el frontend apunte correctamente a la URL pública del backend o proxy desplegado.

---

# ✅ Despliegue Finalizado

Una vez propagados los cambios DNS y verificado el estado de los pods, la aplicación quedará disponible públicamente mediante HTTPS.

---

# 🚨 Guía de Recuperación: Error `ImagePullBackOff`

Si Kubernetes muestra el error:

```text
ImagePullBackOff
```

significa que los nodos no pueden descargar las imágenes desde Amazon ECR.

Sigue los pasos siguientes para volver a etiquetar y subir las imágenes correctamente.

---

# 9. Autenticación en Amazon ECR

Inicia sesión en el registro privado de Amazon ECR:

```bash
aws ecr get-login-password --region us-east-1 | docker login \
  --username AWS \
  --password-stdin 654654433904.dkr.ecr.us-east-1.amazonaws.com
```

---

# 10. Subida de la Imagen del Backend

## Etiquetado

```bash
docker tag tfg-backend:latest \
  654654433904.dkr.ecr.us-east-1.amazonaws.com/tfg-backend:latest
```

## Push a ECR

```bash
docker push \
  654654433904.dkr.ecr.us-east-1.amazonaws.com/tfg-backend:latest
```

---

# 11. Subida de la Imagen del Frontend

## Etiquetado

```bash
docker tag tfg-frontend:latest \
  654654433904.dkr.ecr.us-east-1.amazonaws.com/tfg-frontend:latest
```

## Push a ECR

```bash
docker push \
  654654433904.dkr.ecr.us-east-1.amazonaws.com/tfg-frontend:latest
```

---

# 12. Actualización de los Despliegues en Kubernetes

Una vez subidas las imágenes, reinicia los despliegues para forzar la descarga de las nuevas versiones.

```bash
kubectl rollout restart deployment backend-deployment
kubectl rollout restart deployment frontend-deployment
```

---

# 13. Verificación Final

Comprueba nuevamente el estado de los pods:

```bash
kubectl get pods -w
```

El despliegue se considerará correcto cuando todos los pods muestren:

```text
1/1 Running
```
