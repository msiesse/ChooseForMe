# ChooseForMe

Ce README sera exceptionnellement en français. L'app utilisé dans ce programme ne délivre actuellement qu'en France et les commits ont été fait en Français.
Je ferai peut-être à l'avenir une version universel de ce projet.

## Introduction

ChooseForMe est un programme simple qui vous permet de commander instantanément un menu aléatoire sur l'application Frichti. Pour cela, vous avez juste besoin de
lancer votre serveur local sur un PC par exemple.

## Pré-requis

Vous allez avoir besoin:
- Un compte frichti vérifié
- Une carte bancaire enregistré sur votre compte
- Un ordinateur pour faire lancer le serveur sous nodeJS

### Installation

Clonez le repo sur votre machine.

Créez un fichier signin.txt avec comme contenu:

```
votre_adresse_mail;votre_mot_de_passe;votre_adresse_de_livraison
```

Créer un fichier host.txt avec comme contenu:

```
votreadresseIPLocal
```

Si vous etes sur mac, faites simplement un ifconfig et cherchez une adresse IPv4 sous la forme 192.168.x.x.

De mon côté, je trouve cette adresse sur l'interface en4, mais cela dépend de comment est organisé votre réseau.

Par la suite, vous devrez générer une clé de votre choix (SHA256 par exemple) que vous stockerez dans un fichier api_key.txt. Cette clé servira de connexion au serveur local pour plus de sécurité.

Générez ensuite un certificat SSL auto-signé de la manière suivante:
```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```


## Utilisation

Lancez le serveur:
```
npm start
```

Vous devriez voir quelque chose comme:
```
192.168.x.x listening on port 3000
```

Si c'est le cas, vous êtes prêt à utiliser le programme.

Pour utiliser le programme, rien de plus simple, lancez une requête sur votre PC ou tout autre appareil connecté au réseau local sur l'adresse suivante:
```
https://votreadresseIP:3000/randomFrichti?API_KEY=votrekey
```

Vous devrez recevoir votre menu d'ici 1h.

## Auteur
* **Martin Siesse** [Msiesse](https://github.com/msiesse)
