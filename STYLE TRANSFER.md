# STYLE TRANSFER 

*Alexis Soltysiak* 

*Imane Chouhki*

*Jean-Charles Coudon*

*Antoine Heseque*

## Rejoindre le site : 



[Cliquer ici pour rejoindre le site](Lien site)



## <u>Introduction</u>

N'avez-vous jamais révé de voir un de vos selfie peints par picasso , van Gogh ? Et bien c'est possible maintenant grâce à l'intelligence artificielle. Il vous suffit simplement de mettre une photo de ce que vous souhaité en entré ainsi qu'une photo du style que vous voulez donner et les algorithmes se chargeront du reste !

De nos jours les filtres sont présents sur la plupart des photos postées sur les réseaux, où dans le domaine du cinéma. Ils peuvent changer une photo ou une vidéo en changeant les couleurs , la saturation , ou des aspects que l'on veut donner. Cependant un filtre ne change qu'un aspect de la photo. C'est pourquoi pour appliquer un style idéal il faudrait avoir une photo de référence avec le style en question afin de l'appliquer directement aux photos que l'on veut.  C'est ce que nous allons découvrir !

Le Projet d'IA avancée de cette année est d'obtenir une image dans un certain style choisis. Pour cela il fait donner en entrée une image de référence et une image de style. Le but principal est de faire une facade, ici un site , sur lequel un utilisateur peut mettre une image qu'il choisit, puis selectionner une image de style d'un peintre célèbre , et enfin sous quelques dizaine de seconde voir son image avec le style du peintre !

Nous esperons que ce ReadMe vous aidera à comprendre comment fonctionne l'application, ce qu'est le style transfer et comment fonctionne le code de mainère gérérale. Nous allons essayer de décrire comment fonctionne le transfer de style sur une image grâce à un réseau de neurone , et présenter nos travaux sur le sujet.

Pour cela nous avons fais dans un premier temps des recherches sur les différents travaux qui existaient sur le sujet. Puis nous avons étuidé et compris différentes façon de faire. Pour finir grâce aux connaisances apprisent en cours , complétées avec les recherches , nous avons réussis à faire un site répondant au sujet.



## <u>Sommaire</u>  :



#### **I - Site :**

1. [Comment le site fonctionne ? ](#Comment-le-site-fonctionne-? )
2. [Difference entre le site et le code ](#Difference-entre-le-site-et-le-code) 

#### II - Modèle 

2. [Reseau de Neurone](#reseau-de-neurone)
3. [Methode ](#methode )

#### III - Code

1. [Installations et Input](#Installations-et-Input )

2. Preprocessing / PostProcessing

3. Extraction des features

4. Les fonctions des différents Loss

5. Synthétisation de l'image

6. Entrainement 

7. Prediction

   

## I - Site : 



### 	1. Comment le site fonctionne ?

Afin de rejoindre le site , cliquez sur ce lien : [Style Transfer](Lien site)

Vous être maintenant face à une page web. Afin de réaliser le transfer de vôtre image, il vous suffit de mettre le lien de l'image que vous souhaitez. La taille de l'image et le format seront vérifiés par notre algorithme. 

![img](https://cdn.discordapp.com/attachments/891968066613825577/901487971092529212/1.PNG)



Maintenant que votre photo est chargé comme photo de base, vous pouvez selectionner grâce au menu déroulant, le style du peintre que vous souhaitez. Nous avons essayé de proposer une variété de style différent, et d'autres vont encore être ajouté !

![img](https://cdn.discordapp.com/attachments/891968066613825577/901487988704440340/2.PNG)

Après avoir séléctionné le style que vous souhaitez , il vous suffit de cliquer sur le bouton "générer"

Un chargement démare ainsi et votre image est en train d'être créée ! Après un temps d'attente votre image avec le style demandé appraitra et vous pouvez la telecharger , la comprendre et la partager à vos amis !

![img](https://cdn.discordapp.com/attachments/891968066613825577/901488004869267486/5.PNG)



### 	2. Difference entre le site et le code

Nous avons longtemps cherché sur le sujet du style layer et tester de nombreux codes. Nous avons ainsi poussé les recherches afin de trouver le moyene le plus rapide et performant possible. Notre seule déception durant ce projet est de ne pas pouvoir réussis à faire du style transfer en temps direct. Nous avons produis différents codes et nous avons fait de nombreux tests et dans tous les cas le temps d'execution ne descendait pas en desous de plusieurs dizaines de secondes. 

Pour remédier à cela nous avons utilisé une API sur le site. Elle a été entrainé avec différents styles et permet de prédire de manière plus rapide que notre code sur une image d'entrée. Cependant les résultats restent pour le moins très similaires.

# II - Modèle



### 	1. Reseau de Neurone

Afin de répondre à ce problème, et après les recherches effectuées , nous avons opté pour une Réseau de neuronne convolutif ( CNN ) qui est le plus adapté. Il nous permettra d'appliquer automatiquement le style d'une image à une autre image. Effectivement il sera ainsi possible de modifier l'image de contenu afin qu'elle se adopte le caractère de l'image de style.

Pour utiliser les réseaux de neronnes il faut des entrées et des sorties afin de réaliser des prédictions , calculer les loss et affecter les backpropagation. Pour les entrées du réseau de neuronne il y aura une image de contenu et une image de style. 

Prenons un exemple : 

Nous avons mis l'image d'une tortue de mer dans la content image. Et nous souhaitons lui donner le style de La Grande Vague de Kanagawa. On peut voir qu'apres plusieurs passage d'entrainement nous obtenons en output image, une tortue qui est dans le style de Kanagawa. Le resultat est bluffant n'est-ce pas ? 

Dans l'image synthétisée de sortie, les coups de pinceau à l'huile de l'image de style sont appliqués, conduisant à des couleurs plus froides, tout en préservant la forme principale des objets dans l'image de contenu. 

![image-20211023165942731](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20211023165942731.png)

De manière plus détaillée nous installons un réseau de neurones VGG19 qui est un réseau de neurone pré-entrainé. 

Effectivement le VGG-19 est un réseau de neurones convolutifs de 19 couches de profondeur entraîné sur plus d'un million d'images de la base de données ImageNet. Le réseau a donc appris de riches représentations de caractéristiques pour un large éventail d'images. Le réseau a une taille d'entrée d'image de 224 par 224.

Il est contient 19 layer qui sont représenté ci-dessous .

![VGG et Transfer Learning - datacorner par Benoit Cayla](https://www.datacorner.fr/wp-content/uploads/2021/03/vgg_1.jpg)

.



### 	2. Méthode



Pour décrire la méthode , nous allons décrire les différentes étapes. 

La première chose à faire est d**'initaliser l'image synthétisée.** ici on commencera par la content image. Cette image synthétisée est la seule variable qui doit être mise à jour pendant le processus de transfert de style. Ce sont donc les paramètres du modèle à mettre à jour pendant l'apprentissage.

Dans un second temps, nous choisissons un CNN ( convolution neural network ici le model VGG19 vu ci-dessus ) pré-entraîné pour **extraire les caractéristiques de l'image et figer ses paramètres de modèle** pendant l'entraînement. Pour cela On sélectionne les couches du model VGG19 qui nous intéressent. Plus on **extrait les features** proches de la couche d'entrée, plus on capture des features détaillées, et vice versa, plus on s'éloigne de la couche d'entrée, plus on capte les informations global de l'image.

C'est pour cela que nous choisissons une couche proche de la sortie du model (la dernière couche de convolution du 4ème bloc de convolution) pour extraire les features de l'image de contenue, afin de capter les informations globales à transférer à l'image généréee. Pour les couches de style nous sélectionnons chaque premières couches à différents niveaux du modèle (chaques premières couches de convolution des 5 blocs de convolution) pour **extraire des informations globales et plus détaillés de l'image de style.**

Ensuite, nous calculons la fonction de perte du transfert de style par propagation vers l'avant (direction des flèches pleines) et mettons à jour les paramètres du modèle (l'image synthétisée pour la sortie) par rétropropagation (direction des flèches en pointillés). La fonction de perte couramment utilisée dans le transfert de style se compose de trois parties : 

- **La perte de contenu** rend l'image synthétisée et l'image de contenu proches dans les caractéristiques de contenu ; 

- **La perte de style** rend l'image synthétisée et l'image de style proches des caractéristiques de style ; 

- **La perte de variation totale** aide à réduire le bruit dans l'image synthétisée. 

  **Au final, la fonction de loss en style transfer est la somme pondérée de la content loss, la style loss, et la total variation loss**.

  En jouant sur ces poids, on peut décider d'avoir une image avec un style très présent, laisser plus d'importance au contenu et réduire plus ou moins le bruit sur l'image générée.

Enfin, lorsque l'apprentissage du modèle est terminé, nous sortons les paramètres du modèle du transfert de style pour générer l'image synthétisée finale. Nous pouvons voir un schéma résumé de la méthode utilisée.



![image-20211023171309158](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20211023171309158.png)





## 3 - Code : 



### 	1. Installations et Input





