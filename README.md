# STYLE TRANSFER 

*Alexis Soltysiak* 

*Imane Chouhki*

*Jean-Charles Coudon*

*Antoine Heseque*

## Rejoindre le site : 



[Cliquer ici pour rejoindre le site](https://style-transfer-front.herokuapp.com/)



## <u>Introduction</u>

N'avez-vous jamais rêvé de voir un de vos selfie peints par Picasso, van Gogh ? Eh bien c'est possible maintenant grâce à l'intelligence artificielle. Il vous suffit de mettre une photo de ce que vous souhaité en entrée ainsi qu'une photo du style que vous voulez donner et les algorithmes se chargeront du reste !

De nos jours les filtres sont présents sur la plupart des photos postées sur les réseaux ou dans le domaine du cinéma. Ils peuvent changer une photo ou une vidéo en changeant les couleurs, la saturation, ou des aspects que l'on veut donner. Cependant un filtre ne change qu'un aspect de la photo. C'est pourquoi pour appliquer un style idéal il faudrait avoir une photo de référence avec le style en question afin de l'appliquer directement aux photos que l'on souhaite. C'est ce que nous allons découvrir !

Le Projet d'IA avancée de cette année est d'obtenir une image dans un certain style choisi. Pour cela il faut donner en entrée une image de référence et une image de style. Le but principal est de faire une façade, ici un site, sur lequel un utilisateur peut mettre une image qu'il choisit, puis sélectionner une image de style d'un peintre célèbre, et enfin sous quelques dizaine de secondes voir son image avec le style du peintre !

Nous espérons que ce Readme vous aidera à comprendre comment fonctionne l'application, ce qu'est le style Transfer et comment fonctionne le code de manière générale. Nous allons essayer de décrire comment fonctionne le Transfer de style sur une image grâce à un réseau de neurone, et présenter nos travaux sur le sujet.

Pour cela nous avons fait dans un premier temps des recherches sur les différents travaux qui existaient sur le sujet. Puis nous avons étudié et compris différentes façons de faire. Pour finir grâce aux connaissances apprisent en cours, complétées avec les recherches, nous avons réussis à faire un site répondant au sujet.



## <u>Sommaire</u>  :



#### **I - Site :**

1. [Comment le site fonctionne ? ](#Comment-le-site-fonctionne-? )
2. [Difference entre le site et le code ](#Difference-entre-le-site-et-le-code) 

#### II - Modèle 

1. [Reseau de Neurone](#reseau-de-neurone)
2. [Methode ](#methode)

#### III - Code

1. [Installations et Input](#Installations-et-Input)
2. [Preprocessing / PostProcessing](#Preprocessing-/-PostProcessing)
3. [Extraction des features](#Extraction-des-features)
4. [Les fonctions des différents Loss](#Les-fonctions-des-différents-Loss)
5. [Entrainement](#Entrainement)





## I - Site : 



### 	1. Comment le site fonctionne ?

Afin de rejoindre le site, cliquez sur ce lien  : [Style Transfer](https://style-transfer-front.herokuapp.com/)

Vous êtes maintenant face à une page web. Afin de réaliser le Transfer de votre image, il vous suffit de mettre le lien de l'image que vous souhaitez. La taille de l'image et le format seront vérifiés par notre algorithme. 


<div align="center">
    <img src="images/.png" width="70%">
</div>

Maintenant que votre photo est chargée comme photo de base, vous pouvez sélectionner grâce au menu déroulant, le style du peintre que vous souhaitez. Nous avons essayé de proposer une variété de style différent, et d'autres vont encore être ajoutés !

![img](https://cdn.discordapp.com/attachments/891968066613825577/901487988704440340/2.PNG)



Après avoir sélectionné le style que vous souhaitez, il vous suffit de cliquer sur le bouton "générer"

Un chargement démarre ainsi et votre image est en train d'être créée ! Après un temps d'attente votre image avec le style demandé apparaitra et vous pourrez la télécharger et la partager à vos amis !



![img](https://cdn.discordapp.com/attachments/891968066613825577/901488004869267486/5.PNG)



### 	2. Difference entre le site et le code

Nous avons longtemps cherché sur le sujet du style transfer et testé de nombreux codes. Nous avons ainsi poussé les recherches afin de trouver le moyen le plus rapide et performant possible. Notre seule déception durant ce projet est de ne pas avoir un algorithme qui permet un style transfert en temps réel. En effet nous avons produit différents codes et nous avons fait de nombreux tests et dans tous les cas le temps d'exécution ne descendait pas en dessous d'une à deux minutes (avec utilisation GPU).

Pour remédier à cela nous avons utilisé une API sur le site. Ce modèle a été entrainé avec différents styles et permet de prédire de manière plus rapide que notre code sur une image d'entrée. Cependant les résultats restent pour le moins très similaires.



# II - Modèle



### 	1. Réseau de Neurone

Afin de répondre à ce problème, et après les recherches effectuées, nous avons décidé d'utiliser le réseau Réseau de neurone convolutif (CNN) VGG19 qui est le plus adapté. Il nous permettra d'extraire les informations de style et de contenu des images concernées. Ainsi il sera possible de modifier l'image de contenu afin qu'elle adopte le caractère de l'image de style.

Pour utiliser les réseaux de neurones il faut des entrées et des sorties afin de réaliser des prédictions, calculer les loss et effectuer les backpropagations. Pour les entrées du réseau de neurone il y aura une image de contenu et une image de style. L'image générée sera aussi en entrée du reseau de neurone à chaque epochs.

Prenons un exemple : 

Nous avons mis l'image d'une tortue de mer dans la content image. Et nous souhaitons lui donner le style de La Grande Vague de Kanagawa. On peut voir qu'après plusieurs epochs nous obtenons en output image, une tortue qui est dans le style de Kanagawa. Le résultat est bluffant n'est-ce pas ? 



![image-20211023165942731](C:\Users\ASUS\AppData\Roaming\Typora\typora-user-images\image-20211023165942731.png)

*<u>Dans l'image synthétisée de sortie, les coups de pinceau à l'huile de l'image de style sont appliqués, conduisant à des couleurs plus froides, tout en préservant la forme principale des objets dans l'image de contenu.</u>*



De manière plus détaillée nous installons un réseau de neurones VGG19 qui est un réseau de neurones convolutif pré-entrainé. 

Effectivement le VGG-19 est un réseau de neurones convolutif de 19 couches de profondeur entraîné sur plus d'un million d'images de la base de données ImageNet. Le réseau a donc appris de riches représentations de caractéristiques pour un large éventail d'images. Le réseau a une taille d'entrée d'image de 224 par 224.

Il contient 19 layer qui sont représenté ci-dessous .

![VGG et Transfer Learning - datacorner par Benoit Cayla](https://www.datacorner.fr/wp-content/uploads/2021/03/vgg_1.jpg)





### 	2. Méthode



Pour décrire la méthode, nous allons décrire les différentes étapes. 

La première chose à faire est d**'initialiser l'image synthétisée. ** ici on commencera par la content image. Cette image synthétisée est la seule variable qui doit être mise à jour pendant le processus de transfert de style. Ce sont donc les paramètres du modèle à mettre à jour pendant l'apprentissage.

 



Dans un second temps, nous choisissons un CNN (convolution neural network ici le model VGG19 vu ci-dessus) pré-entraîné pour **extraire les caractéristiques de l'image et figer ses paramètres de modèle** pendant l'entraînement. Pour cela on sélectionne les couches du model VGG19 qui nous intéressent. Plus on **extrait les features** proches de la couche d'entrée, plus on capture des features détaillées, et vice versa, plus on s'éloigne de la couche d'entrée, plus on capte les informations global de l'image.

C'est pour cela que nous choisissons une couche proche de la sortie du model (la dernière couche de convolution du 4ème bloc de convolution) pour extraire les features de l'image de contenue, afin de capter les informations globales à transférer à l'image générée. Pour les couches de style nous sélectionnons chaque premières couches à différents niveaux du modèle (chaque premières couches de convolution des 5 blocs de convolution) pour **extraire des informations globales et plus détaillés de l'image de style.**





Ensuite, nous calculons la fonction de perte du transfert de style par propagation vers l'avant (direction des flèches pleines) et mettons à jour les paramètres du modèle (l'image synthétisée pour la sortie) par rétropropagation (direction des flèches en pointillés). La fonction de perte couramment utilisée dans le transfert de style se compose de trois parties :

\- **La perte de contenu** rend l'image synthétisée et l'image de contenu proches dans les caractéristiques de contenu ; 

\- **La perte de style** rend l'image synthétisée et l'image de style proches des caractéristiques de style ; 

\- **La perte de variation totale** aide à réduire le bruit dans l'image synthétisée. 

 **Finalement, la fonction de loss en style Transfer est la somme pondérée de la content loss, la style loss, et la total variation loss**.

 En jouant sur ces poids, on peut décider d'avoir une image avec un style très présent, laisser plus d'importance au contenu et réduire plus ou moins le bruit sur l'image générée.

Enfin, lorsque l'apprentissage du modèle est terminé, nous sortons les paramètres du modèle du transfert de style pour générer l'image synthétisée finale. Nous pouvons voir un schéma résumé de la méthode utilisée.



![img](https://cdn.discordapp.com/attachments/891968066613825577/901581695411695696/unknown.png)





## 3 - Code : 



### 	1. Installations et Input



Afin de pouvoir utiliser les fonctionnalités et certaines fonctions utiles, il nous faut importer des bibliothèques. 

Il faudra installer : 

1. **Torch** 
2. **TorchVision** : afin d'accéder à des architectures de modèle.
3. **PIL**: Une bibliothèque de traitement d'image.
4. **Matplotlib** : Une bibliothèque complète permettant des visualisations.
5. **d2l** : Une bibliothèque pour avoir un affichage dynamique.

Ces bibliothèques sont complètes et vastes , nous n'utiliserons que certaines fonctions. Cependant elles vont nous être indispensable pour la suite. 

Puis nous continuons par importer l'image content que l'on souhaite styliser , ainsi que l'image de style sur lequel on veut copier le style.



### 	2. Preprocessing / PostProcessing



Afin d'effectuer le Preprocessing et le postprocessing nous allons avoir 2 fonctions. Dans un premier temps nous allons avoir la fonction `preprocess`qui est une pipeline. Dans celle ci nous allons effectuer les actions suivantes dans l'ordre :

1. **Resizer l'image** à la taille souhaitée par l'utilisateur.

   Afin de donner à l'image la taille qui est en paramètre dans l'input.

2. **Transformer les données** de l'image en Tensor pour pouvoir travailler avec pytorch ensuite.

   Dans le but de pouvoir travailler avec pytorch il faut transformer l'image en Tensor .

3. **Normaliser les channels RGB.**

   Pour se débarrasser des distorsions causées par les lumières et les ombres dans une image.

Finalement la fonction passe l'image d'entrée dans cette pipeline puis ajoute une dimension pour être au format du réseau de neurone convolutionel.

Dans un second temps nous avons la fonction `postprocess` qui va restaurer les valeurs des pixel avant leurs normalisations. Elle remplace également chaque pixel ayant une valeur inférieure à 0 ou supérieure à 1 par 0 ou 1. Cela permet ensuite de convertir l'image en image PIL pour l'affichage.

Ces deux fonctions sont indispensables pour pouvoir préparer l'image à être utilisés par les fonctions qui vont suivre.



### 	3. Extraction des features



Dans cette partie nous allons **extraire les features** des images de content et des images de style. Pour cela on va devoir utiliser le réseau de neurone convolutif VGG19 pré-entrainé sur le dataset Imagenet.

Afin d'extraire les différentes features des images on sélectionne les couches du model VGG19 qui nous intéressent. Mais chaque couche du model ne vas pas donner les mêmes niveaux de détails de feature. Effectivement plus on extrait les features proches de la couche d'entrée, plus on capture des features détaillées, et inversement, plus on s'éloigne de la couche d'entrée, plus on capte les informations global de l'image.

Dans notre cas nous allons choisir une couche proche de la sortie du model (la dernière couche de convolution du 4ème bloc de convolution) pour extraire les features de l'image de contenue, afin de **capter les informations globales à transférer à l'image générée**.

Pour les couches de style nous sélectionnons chaque premières couches à différents niveaux du modèle (chaque	 premières couches de convolution des 5 blocs de convolution) pour extraire des informations globales et plus détaillés de l'image de style.





Nous pouvons utiliser la fonction `extract_features` qui va permettre de **récupérer les features de style et de contenu** en récupérant les sorties des couches intermédiaires (listes `style_layers` et `content_layers`) du réseau de neurones VGG19.

Par la suite, nous utiliserons les fonctions :`get_contents` et `get_styles` afin de faire passer les images de contenu et de style dans la pipeline de preprocessing pour ensuite extraire les features à l'aide la fonction `extract_features` définie juste avant. Les features de l'image générée, quant à elles, seront extraites durant l'entrainement.



### 	4. Les fonctions des différents Loss



Pour savoir après la prédiction si nous nous sommes éloigné de l'objectif où non il nous faut des fonctions de Loss. Dans l'algorithme nous utilisons 3 fonctions de Loss différentes qui ont toutes leurs utilités. Ainsi, La fonction de loss du style Transfer contient la content loss, la style loss et la total variation loss.



##### Content Loss

La fonction de content loss est assez classique, elle calcule la différence entre l'image de contenu et l'image générée et la met au carré à la manière d'une MSE. Les deux inputs de la fonction square proviennent de l'extraction de features.

##### Style Loss

La style loss utilise également la fonction de squared loss pour calculer la différence de style entre l'image générée et l'image de style. Cependant avant d'utiliser la fonction de squared loss, les features de style de l'image générée et de l'image de style doivent être transformées en *Matrice de Gram*.

##### Total Variation Loss

La Total Variation Loss est une fonction de loss qui n'est pas toujours présente en style Transfer. Elle permet de réduire les bruits à hautes fréquences (pixels particulièrement sombre ou clair) qui peuvent être générée dans l'image de sortie. (Permet de faire en sorte que les valeurs des pixels voisins soient plus proches.)

**<u>Pour finir , la fonction de loss en style transfer est la somme pondérée de la content loss, la style loss, et la total variation loss. En jouant sur ces poids, on peut décider d'avoir une image avec un style très présent, laisser plus d'importance au contenu et réduire plus ou moins le bruit sur l'image générée.</u>**



#### Synthétisation de l'image créée

Afin d'initier l'image que nous allons générer, nous utilisons la classe suivante `SynthesizedImage` qui nous permet de définir un modèle et de traiter l'image générée comme étant les paramètres du modèle à mettre à jour. 

Nous utiliserons aussi les fonctions  `get_inits` pour créer une instance de la classe `SynthesizedImage` qui l'initialise avec l'image `X`. C'est ici que l'on initialise la matrice Gram de l'image de style.



### 	5. Entrainement

Nous allons maintenant grâce à toutes les fonctions créées ci-dessus commencer l'entrainement. Il faut savoir que pendant l'entrainement, à chaque epoch, on extrait les features de style et de contenu de l'image générée et on calcule la fonction loss.

Afin d'entrainer nous reprenons les mêmes notions que nous avons vu en cours : 

1. On remet les gradients à 0
2. On extrait les features de l'image générée
3. Calculer la Loss ( Comme on a pu le voir précedement on calcul les 3 loss différentes que l'ont pondère afin de personaliser notre style transfer)
4. Backpropagation ( Afin d'affecter les gradients dans notre réseau de neuronne )
5. Affichage de la Loss et de l'image de sortie actuelle.

Il nous suffit finalement de lancer l'entrainement en commencant par renseigner la taille de l'image que l'on souhaite, et d'effectuer toutes les étapes vues afin de pouvoir lancer l'entrainement.



# CONCLUSION



Nous pouvons voir que l'image synthétisée conserve le paysage et les objets de l'image de contenu, et transfère en même temps la couleur de l'image de style. Par exemple, l'image synthétisée a des blocs de couleur comme ceux de l'image de style. Certains de ces blocs ont même la texture subtile des coups de pinceau.

Nous avons vu dans un premier temps l'utilisation du site ainsi que les différences avec le code. Puis nous avons regardé quel réseau de neurone nous avons utilisé ainsi que la méthode qui a été entreprise. Pour finir nous avons regardé l'organisation du code, et effectuer les étapes dans l'ordre, de l'installation jusqu'à l'entrainement et enfin le résultat.

Nous pouvons nous demander dans quelle mesure pourrait on utiliser le style transfer sur des textes ?
