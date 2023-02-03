# Bank App FRONTEND
**Frontend del proyecto - TP Final programacion 3 - 2023**

**Profesor**: Gaston Larriera  

## Descripcion del repositorio 📖

* **Components**: Contiene los componentes utilizados para armar la web, esta dividido para los componentes que se usan en la parte del administrador y la del cliente.
* **Pages**: Contiene los "esqueletos" de las paginas disponibles, estas usan a los componentes.

El modulo consiste en ser el front de la aplicacion del banco, el cual esta dividido en dos secciones, la parte del **admistrador** (con todo lo relacionado al manejo de cuentas, clientes y usuarios), y la parte del **cliente** (el cual puede ver sus cuentas y sus movimientos, como tambien realizar transferencias y extracciones/depositos).

Para la comunicacion con el backend se utiliza la herramienta **axios**, y para la validacion de formularios se utilizo **formik** junto con **yup**.

## Dependencias 🛠️
```
axios
formik
moment
react
react-dom
react-router-dom
react-scripts
web-vitals
yup
yup-es
```

## Como instalarlo 🔨
Para levantar el modulo, es necesario situarse en la carpeta donde se lo descargo y ejecutar los siguientes comandos:

```
npm install
```

```
npm start
```

Si todo sale bien, el modulo se levanta en http://localhost:3000, para poder loguearse, se puede utilizar alguno de los usuarios precargados:

```
ADMIN
    usuario: admin
    password: 12345

CLIENTE 1
    usuario: cliente
    password: 12345
    Alias: ASUNTO.CIENTIFICA.CUANTO

CLIENTE 2
    usuario: cliente2
    password: 12345
    Alias: NORTEAMERICANO.RECORDAR.VIEJO
```

## Autor ✒️

**Federico Ignacio Ibarra Berardi** - 

**Email**: federicoibarrab@gmail.com
