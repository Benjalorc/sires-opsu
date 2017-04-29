# sires-opsu

Instalar nodejs

    sudo apt-get install nodejs

Instalar mongodb

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    
    echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    
    sudo apt-get update
    
    sudo apt-get install -y mongodb-org

*Si el proyecto se esta levantando en cloud9 adicionalmente ejecutar lo siguiente*

    mkdir data
    
    echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    
    chmod a+x mongod


Una vez clonado el proyecto y ubicados en la carpeta ejecutar el comando de instalacion de las dependencias

    npm install

**Para el momento de la construccion de este proyecto se utilizaron las ultimas versiones de las dependencias en el archivo package.json, las cuales son**

- express 4.15.2
- mongoose 4.9.6
- bcryptjs 2.4.3
- cors 2.8.3
- jsonwebtoken 7.4.0
- body-parser 1.17.1
- passport 0.3.2
- passport-jwt 2.2.1

**Se recomienda configurar el archivo package.json explicitamente con estas versiones antes de instalar los paquetes**

Iniciar el servicio de mongodb

    mongod

*Este proyecto se levanto desde cloud9, por lo que escucha al puerto definido en la constante*

- const port = process.env.PORT;
    
*Para levantarlo en otro servidor cambiar el valor de dicha constante a 3000 en el archivo app.js*

Finalmente para iniciar

    npm start