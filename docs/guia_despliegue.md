# 🚀 Guía de Despliegue desde Cero (Producción AWS EKS)

Esta guía sirve como tu "chuleta" o manual de referencia rápida. Sigue estos pasos **en orden** cada vez que destruyas por completo la infraestructura y necesites volver a levantar tu TFG desde cero en AWS.

---

## 1. Autenticación en AWS
Lo primero es asegurarte de que tu terminal tiene los permisos actualizados del AWS Learner Lab.
```bash
aws configure
```
*(Pega tu Access Key, Secret Key y Session Token).*

---

## 2. Crear la Infraestructura (Terraform)
Entra en la carpeta de Terraform y levanta el clúster, la red y los repositorios de imágenes.
```bash
cd terraform
terraform apply -auto-approve
```
*(Este proceso tarda unos 15-20 minutos. Espera a que termine correctamente).*

---

## 3. Conectar tu Terminal a Kubernetes
Una vez el clúster existe, dile a tu herramienta `kubectl` cómo conectarse a él:
```bash
aws eks update-kubeconfig --name tfg-taekwondo-cluster --region us-east-1
```

---

## 4. Instalar el Driver de Volúmenes (¡Crítico!)
Para que AWS pueda crear los discos duros para tu base de datos y tus archivos media, necesitas instalar este complemento. **Si te saltas esto, los pods se quedarán en estado `Pending` para siempre.**
```bash
aws eks create-addon \
  --cluster-name tfg-taekwondo-cluster \
  --addon-name aws-ebs-csi-driver \
  --region us-east-1
```
*(Dale 1 o 2 minutos de margen después de ejecutarlo para que AWS lo instale por debajo).*

---

## 5. Subir tus Certificados SSL (IONOS)
Vuelve a la raíz de tu proyecto y sube los certificados para el HTTPS.
```bash
cd ..
kubectl create secret tls ionos-tls-secret \
  --cert=client/certs/certificado.crt \
  --key=client/certs/clave.key
```

---

## 6. Desplegar la Aplicación
Lanza todas las configuraciones de Kubernetes a la vez:
```bash
kubectl apply -f kubernetes/infraestructura.yml
kubectl apply -f kubernetes/proxy.yml
kubectl apply -f kubernetes/despliegue.yml
```

Puedes ver cómo van arrancando ejecutando esto:
```bash
kubectl get pods -w
```
*(Usa `Ctrl+C` para salir. Espera a que todos pongan `Running` antes de pasar al paso 7).*

---

## 7. Preparar la Base de Datos (Backend)
Cuando recreas el proyecto, la base de datos nace vacía. Hay que crear las tablas de Django y el usuario administrador.

**1. Busca el nombre de tu pod del backend:**
```bash
kubectl get pods | grep backend
```
*Copia el nombre completo, por ejemplo: `backend-deployment-6f4d495877-kvhsb`*

**2. Crea las tablas (Migraciones):**
```bash
kubectl exec -it [AQUÍ_EL_NOMBRE_DEL_POD] -- python manage.py migrate
```

**3. Crea tu usuario para el Panel de Control:**
```bash
kubectl exec -it [AQUÍ_EL_NOMBRE_DEL_POD] -- python manage.py createsuperuser
```

**4. Reinicia el backend (¡Importante!)**
Como la base de datos tardó unos segundos en inicializarse la primera vez, es posible que el backend se haya quedado "tonto" intentando conectar al principio. Para que pille todo en limpio y no te dé un "502 Bad Gateway", reinícialo:
```bash
kubectl rollout restart deployment backend-deployment
```

---

## 8. Obtener la URL y Configurar IONOS
Por último, averigua qué dirección te ha dado AWS para tu entrada principal:
```bash
kubectl get service proxy-service
```

1. Busca la columna **`EXTERNAL-IP`**. Verás una URL larguísima terminada en `.elb.amazonaws.com`.
2. Cópiala.
3. Ve a tu panel de IONOS.
4. En la configuración DNS de tu dominio, crea un registro **CNAME** (o tipo ALIAS) y pega esa URL de AWS como destino.

¡Y listo! Al entrar a tu dominio cargará tu aplicación asegurada con HTTPS.
