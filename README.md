# ChooseForMe

Ce README sera exceptionnellement en français. L'app utilisé dans ce programme ne délivre actuellement qu'en France et les commits ont été fait en Français.
Je ferai peut-être à l'avenir une version universel de ce projet.

## Introduction

ChooseForMe est un programme simple qui vous permet de commander instantanément un menu aléatoire sur l'application Frichti. Pour cela, vous avez juste besoin de
lancer votre serveur local sur un PC par exemple

## Pré-requis

Vous allez avoir besoin:
- Un compte frichti vérifié
- Une carte bancaire enregistré sur votre compte
- Un ordinateur pour faire lancer le serveur sous nodeJS

### Installation

Clonez le repo sur votre machine.

Créez un fichier signin.txt avec comme contenu:

```
votreadressemail;votremotdepasse;votreadressepostale
```

Créer un fichier host.txt avec comme contenu:

```
votreadresseIPLocal
```

Si vous etes sur mac, faites simplement un ifconfig et cherchez une adresse IPv4 sous la forme 192.168.x.x

De mon côté, je trouve cette adresse sur l'interface en4, mais cela dépend de comment est organisé votre réseau.


Lancez le serveur:
```
npm start
```

Vous devriez voir quelque chose comme:
```
Listening host: 192.168.x.x on port 3000
```

Si c'est le cas, vous êtes prêt à utiliser le programme.

## Utilisation

Pour utiliser le programme, rien de plus simple, lancez une requête sur votre PC ou tout autre appareil connecté au réseau local sur l'adresse suivante:
```
http://votreadresseIP:3000/randomFrichti
```

Vous devrez recevoir votre menu d'ici 1h.

### ATTENTION

Le serveur est très peu sécurisé. Si quelqu'un est connecté à votre réseau et connait l'adresse IP ainsi que la requête à demander, il pourra commander à votre place.
En attendant d'ajouter une protection, pensez bien à sécurisez votre réseau et assurez vous d'être le seul à y avoir accès.

## Auteur
* **Martin Siesse** [Msiesse](https://github.com/msiesse)
