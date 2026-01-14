# 🚀 Guía de Deploy en Vercel

Esta guía te ayudará a desplegar tu proyecto en Vercel de forma rápida y sencilla.

## Opción 1: Deploy desde la Interfaz Web de Vercel (Recomendado)

### Paso 1: Preparar tu proyecto en GitHub

1. **Inicializa Git** (si aún no lo has hecho):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Crea un repositorio en GitHub**:
   - Ve a [github.com](https://github.com)
   - Crea un nuevo repositorio
   - No inicialices con README, .gitignore o licencia

3. **Conecta tu proyecto local con GitHub**:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Deploy en Vercel

1. **Ve a Vercel**:
   - Visita [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub

2. **Importa tu proyecto**:
   - Haz clic en "Add New..." → "Project"
   - Selecciona tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto estático

3. **Configuración**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (dejar por defecto)
   - **Build Command**: Dejar vacío (no necesita build)
   - **Output Directory**: Dejar vacío

4. **Deploy**:
   - Haz clic en "Deploy"
   - ¡Listo! Tu sitio estará disponible en unos segundos

## Opción 2: Deploy desde la Terminal (CLI)

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Deploy

```bash
vercel
```

Sigue las instrucciones:
- **Set up and deploy?** → Y
- **Which scope?** → Selecciona tu cuenta
- **Link to existing project?** → N (primera vez)
- **What's your project's name?** → Nombre de tu proyecto
- **In which directory is your code located?** → `./`

### Paso 4: Deploy de Producción

```bash
vercel --prod
```

## ✅ Verificación Post-Deploy

Después del deploy, verifica:

1. ✅ Las imágenes se cargan correctamente (`Img/Pile1.jpg`, etc.)
2. ✅ Las animaciones GSAP funcionan
3. ✅ El scroll funciona correctamente
4. ✅ Los textos flotantes aparecen en el momento correcto

## 🔧 Solución de Problemas

### Las imágenes no se cargan

Si las imágenes no aparecen, verifica:
- Las rutas en `index.html` son correctas: `Img/Pile1.jpg`
- Las imágenes están en la carpeta `Img/` en el repositorio
- Las rutas son case-sensitive (mayúsculas/minúsculas importan)

### Error 404 en rutas

Vercel debería servir automáticamente `index.html` como página principal. Si tienes problemas, el archivo `vercel.json` ya está configurado.

### Actualizar el sitio

Cada vez que hagas `git push` a tu repositorio, Vercel desplegará automáticamente una nueva versión si tienes el "Auto Deploy" activado.

## 📝 Notas Importantes

- ✅ El proyecto ya incluye `vercel.json` configurado
- ✅ No necesitas `package.json` para este proyecto estático
- ✅ Las imágenes deben estar en el repositorio (no en `.gitignore`)
- ✅ Vercel ofrece HTTPS gratuito automáticamente

## 🎉 ¡Listo!

Tu sitio estará disponible en una URL como:
`https://tu-proyecto.vercel.app`

¡Disfruta de tu galería de piscinas en línea!
