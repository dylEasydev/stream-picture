# Service de streaming de l'application stream Camer 

## Description du service

Il s'agit d'un serveur permettant la modeification des images de 
profil d'utilisateur , de miniature de video et d'audio des services **stream camer**

La modifiacation des images ( profil ,miniature ) est sécuriser par un jeton d'authentification fournis par ce service [stream-auth]() .

Le choix du jeton est **JWT** pour implementer au mieux une architecture **micro-service** .   


## Prérequis
Avant de se lancer à coeur joie vers le demarage de se projet rassurez vous d'avoir:

**Node js** et **npm** installer sur votre ordinateur lien du site [ici](node.org).

**PostgreSQL** installer sur votre ordinateur [ici](postgres.org)

**git** installer sur votre ordinateur [ici](git.org)

**openssl** installer sur votre ordinateur [ici](openssl.org)

**ffmpeg** installer sur votre ordinateur [ici](ffmpe.org)

## Installation 

pour commencer effectuer un pull du depôt
>[!NOTE]
>Commande au niveau du terminale
>```
>  $ mkdir picture_camer
>   $ cd ./picture_camer
>   $ git init
>   $ git remote add origin git@github.com:dylEasydev/Streamserver.git
>   $ git branch -M main
>   $ git pull -u origin main
>```
vous pouvez effectuer un **clone** ou un **fork** à votre choix .

Installer les dependances  `npm install`

## Configuration
Créer un fichier `.env` à la racine du projet puis copiez le code si dessous à l'interieur .

```js
PORT = 3001 // choisir un numéro de port disponible exp: 3003 , 5014 ...
DB_NAME= // Nom de la BD que vous aurez créer pour ce service  
DB_HOST = localhost //Hôte de la BD
DB_DRIVER = postgres
DB_PASSWORD = //mots de passe de l'admin de la BD
DB_USER = //nom de l'admin de la BD
NODE_ENV = developemnent
HOSTNAME = 127.0.0.1
PRIVATE_KEY =//votre clés privée

```

Généré les clés pour securisé le serveur HTTP/2.
>[!NOTE]
>avec un serveur HTTP/2 vous avez l'avantages du multiplexage , compression de l'en-tête
>et l'option de push . Si votre navigateur ou client ne supporte pas le protocole HTTP/2
>le serveur repasse à un serveur HTTP/1.1 classic

```
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365  -in server.csr -signkey server.key -out server.crt
```

## demarage du serveur
ouvrez le terminal et lancez la commande `npm run dev` .

pour les adepte de javascript vous pouvez compiler grâce à la commande `npm build`.
Puis lancer le serveur avec la commande `node -r dotenv/config ./dist/index.js`

## Documentation
la documentation est à l'adresse ``https://127.0.0.1:${process.env.PORT}/docs`` .
son fichier markdow [ici](./doc.md) à enrichir si vous voulez bien . 


## colaborateur
