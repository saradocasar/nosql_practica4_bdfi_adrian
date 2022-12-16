<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">


<br/><br/>


# Practica BDFI - Object Document Mapper (ODM)

## 1. Objetivo

- Desarrollar las 4 operaciones CRUD (Create, Read, Update and Delete) a través de un ODM
- Practicar con un ODM para realizar queries mas avanzadas
- Identificar las ventajas de usar ODMs

## 2. Dependencias

Para realizar la práctica el alumno deberá tener instalado en su ordenador:
- Herramienta GIT para gestión de repositorios [Github](https://git-scm.com/downloads)
- Entorno de ejecución de javascript [NodeJS](https://nodejs.org/es/download/)
- Base de datos NoSQL [MongoDB](https://www.mongodb.com/download-center/community)

## 3. Descripción de la práctica

La práctica simula una aplicación de gestión de pacientes basada en el patron MVC (Modelo-Vista-Controlador) y en el ODM de MongoDB para NodeJS: Mongoose.

La **vista** es una interfaz web basada en HTML y CSS que permite realizar diversas acciones sobre los pacientes como crear, editar, buscar, filtrar, listar o eliminar. La vista esta incluida ya en el codigo descargado.

El **modelo** es la representación de la información de los pacientes. El modelo que se usará en esta práctica es el siguiente:

```
PatientSchema = Schema({
    name: String,
    surname: String,
    dni: String, 
    city: String,
    profession: Array,
    medicalHistory: [{
    	specialist: String,
    	diagnosis: String,
    	date: Date,
    }]
});
```

El **controlador** ejecuta acciones sobre el modelo Paciente. El alumno deberá desarrollar el controlador del paciente para que las acciones que se realicen a través de la página web funcionen correctamente. Para ello, desarrollara las operaciones correspondientes con Mongoose implementando las operaciones CRUD sobre el objeto paciente, así como otra serie de queries.

En el siguiente video puede observar cual sería el funcionamiento normal de la aplicación [link](https://www.youtube.com/watch?v=OAwlZS5Z9FM)

## 4. Descargar e instalar el código del proyecto

Abra un terminal en su ordenador y siga los siguientes pasos.

El proyecto debe clonarse en el ordenador desde el que se está trabajando con:

```
$ git clone https://github.com/BBDD-ETSIT/nosql_practica4_bdfi
```

y entrar en el directorio de trabajo

```
$ cd nosql_practica4_bdfi
```

Una vez dentro de la carpeta, se instalan las dependencias con:

```
$ npm install
```

Ejecutamos los seeders para añadir pacientes por defecto a la base de datos de mongo con:

```
$ npm run seed
```

Por último podemos arrancar la práctica con:

```
$ npm start
```

Abra un navegador y vaya a la url "http://localhost:8001" para ver la aplicación de gestión de pacientes.

**NOTA: Cada vez que se quiera realizar una prueba del código desarrollado, debemos parar y arrancar de nuevo la practica. Para ello, desde el terminal pulse ctrl+c para parar y arranque de nuevo con npm start**

## 5. Tareas a realizar

### 5.1 Implementar las funciones para operar en la Base de Datos

El alumno deberá editar el fichero patient.js ubicado en la carpeta controllers. Se le provee un esqueleto con todos los funciones que deberá rellenar. En cada uno de estas funciones se deberá hacer uso del ODM Mongoose para realizar operaciones con la base de datos y devolver un resultado de la operación.

**NOTA: recuerde que las peticiones a las bases de datos son asíncronas por ello los métodos que ejecutan deben ser asincronos (como puede observar en la cabecera de los mismos) y por tanto las operaciones con Mongoose deben ir precedidas del termino await. Por ejemplo, "var restaurantes = await Restaurante.find()" guardaría en la variable "restaurantes" el resultado de ejecutar la operación "find()"" del modelo Restaurante definido con Mongoose**

Las funciones hacen lo siguiente:

### list()

**Descipcion:**
- Busca en la base de datos todos los pacientes existentes en la coleccion "Paciente"

**Parametros:**

- Ninguno


**Returns:**

- Un array de objetos de pacientes

### read(patientId)

**Descipcion:**
- Busca en la colección "Paciente" el paciente cuyo id corresponde con el de patientId

**Parametros:**

- patientId - Id del paciente a buscar

**Returns:**

- Un objeto con todos los atributos del paciente

### create(body)

**Descipcion:**
- Crea un nuevo paciente en la colleción "Paciente" de Mongo

**Parametros:**

- body - Objeto que contiene los datos rellenados a través de la web

**Returns:**

- El nuevo objeto paciente creado

### update(patientId, body)

**Descipcion:**
- Actualiza los datos del paciente en la base datos

**Parametros:**

- patientId - Id del paciente a actualizar
- body - Objeto que contiene los datos rellenados a través de la web

**Returns:**

- El objeto paciente con los datos actualizados

### delete(patientId)

**Descipcion:**
- Elimina un paciente de la base dadtos

**Parametros:**

- patientId - Id del paciente a eliminar

**Returns:**

- El resultado de la operacion de borrado

### filterPatientsByCity(city)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base a su ciudad de origen

**Parametros:**

- city - String del nombre de la ciudad

**Returns:**

- Un array de objetos de pacientes

### filterPatientsByDiagnosis(diagnosis)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base a sus diagnosticos

**Parametros:**

- diagnosis - String que representa el diagnostico de un paciente

**Returns:**

- Un array de objetos de pacientes

### filterPatientsBySpeacialistAndDate(specialist, sDate,fDate)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base al especialista y que la consulta se hiciese dentro de un rango de fechas 

**Parametros:**

- specialist - String con el especialista medico
- sdate - Fecha de inicio de la busqueda de consultas (Ej: 2016-03-24)
- fdate - Fecha de final de la busqueda de consultas (Ej: 2019-08-14)

**Returns:**

- Un array de objetos de pacientes

### addPatientHistory(patientId, medicalRecord) 

**Descipcion:**
- Añade un nueva consulta al historial medico del paciente representado por patientId

**Parametros:**

- patientId - Id del paciente al que se le añade una nueva consulta al historial
- medicalRecord - Objeto con los datos de la consulta

**Returns:**

- El objeto paciente con los datos actualizados incluido la nueva consulta

### 5.2 Conectar a la base de datos adecuada y añadir en el seed un nuevo paciente
 Primero hay que conseguir conectar a la base de datos, deberá definir la URI de Conexión a la base de datos con nombre **hospitales_NOMBREALUMNO** por ejemplo para Enrique Barra la base de datos se llamaría **hospitales_Enrique**. Este cambio se debe realizar en dos sitios, los ficheros rest_server.js y md-seed-config.js en las siguientes líneas respectivamente.

```
await mongoose.connect('### Definir la URI de la BBDD',{ useNewUrlParser: true, useUnifiedTopology: true })
```

```
const mongoURL = process.env.MONGO_URL || '### Definir la URI de la BBDD';
```
En este punto podremos comprobar que la aplicación funciona con 
```
$ npm run seed
```

```
$ npm start
```
Al hacer esto veremos que nos llena la base de datos con los seed (semilla), que son los datos iniciales de la aplicación. 
Una vez hecho esto tendremos que entrar con mongosh y borrar la base de datos **hospitales_NOMBREALUMNO**, para que así podamos hacer el siguiente paso, que es añadir datos al seed y que al arrancar la aplicación los cree porque detectará que no existe la base de datos.

En este momento tendremos que editar el fichero `seeders/patients.seeders.js` y añadir un nuevo paciente con nuestros datos, nos inventamos el id y la especialidad. 

Una vez hecho esto al volver a arrancar la aplicación con "npm start" cargará este nuevo paciente en la base de datos con el seeder.
En este momento accedemos a la base de datos con mongosh y hacemos una query para buscar este nuevo paciente. Y hacemos una captura de pantalla (CAPTURA1) donde se vean sus datos en la mongo shell.


### 5.3 Añadir un campo nuevo al modelo paciente 

En este momento queremos añadir un campo tipo booleano al modelo paciente, el campo se llama `premium` y tiene que ser `Boolean`.

- Edite `models/patients.js` para añadir este campo.

- Compruebe el contenido de `views/show.ejs` y vea que sobre la línea 107 hay una condición que si el paciente tiene el campo premium a true muestra dicha información.

- Edite el método `read` del paciente que se encuentra en el fichero `controllers/patient.js` para que cuando el paciente  sea el nuevo que añadimos en el seed ponga el campo premium a true (y por lo tanto al visualizar el paciente saldrá la fila adecuada). 


En este punto hay que realizar una captura de pantalla (CAPTURA2) donde se muestre que se ha añadido el paciente nuevo inventado por usted con el campo premium a true.

### 5.4 Desplegar la aplicacion y la base de datos con Docker-compose 

Se debe definir un fichero docker compose para desplegar tanto la aplicación desarrollada en NodeJs como la base de datos de mongoDB de la aplicación final modificada que ya ha pasado los tests del autocorector (es de decir la aplicacicón después de haber realizado la tarea 5.3).

Para ello el nombre de los contenedores a desplegar debe seguir la siguiente convencion: **servicio_NOMBREALUMNO** por ejemplo para el contenedor de node para Enrique Barra sería **node_Enrique**



## 6. Prueba de la práctica 

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado.

La herramienta de autocorrección preguntará por el correo del alumno y el token de Moodle. En el enlace [https://www.npmjs.com/package/autocorector](https://www.npmjs.com/package/autocorector) se proveen instrucciones para encontrar dicho token.

Para instalar y hacer uso de la [herramienta de autocorrección](https://www.npmjs.com/package/autocorector) en el ordenador local, ejecuta los siguientes comandos en el directorio del proyecto:

```
$ autocorector
```

Se puede pasar la herramienta autocorector tantas veces como se desee sin ninguna repercusión en la calificación.

## 7. Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a Moodle con el siguiente comando:
```
$ autocorector --upload
```

El alumno podrá subir al Moodle la entrega tantas veces como desee pero se quedará registrada solo la última subida.

A pesar de que el autocorector le provee al alumno de una nota, esta es provisional y queda condicionada a la entrega de las capturas y del fichero de despligue en docker-compose. El alumno deberá subir a Moodle las capturas solicitadas y el fichero docker-compose con las modificaciones realizadas. 

**RÚBRICA**: Cada método que se pide resolver de la practica se puntuara de la siguiente manera:
-  **1 punto por cada uno de las siguientes funciones realizadas:**  list, read, create, update, delete, filterPatientsByCity y filterPatientsByDiagnosis
-  **1,5 puntos por cada uno de las siguientes funciones realizadas:**  filterPatientsBySpeacialistAndDate y addPatientHistory 

Si pasa todos los tests se dará la máxima puntuación. 

