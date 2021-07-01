# Pomodoro

## Description globale

Le principe global était de créer un systeme de timer fun et utile.

Le pomodoro c'est la phase de travail (que j'ai fixée à 30s pour l'exercice et pour se rapprocher d'un timer de HIIT). On le lance en appuyant sur start.

A la fin du timer, une alerte retentit et on peut lancer une première pause de 15s.

Le nombre de cycles s'incrémente au fur et à mesure. Au bout du 4eme cycle, on ouvre l'onglet break pour lancer une pause plus longue.

## Partie HTML / CSS

J'ai utilisé le CDN Bootstrap CSS et JS car dans ce cas cela allégeait beaucoup la mise en forme, et notamment le travail des onglets.
Cela me permet d'avoir une application esthétique, totalement responsive, et de me concentrer sur la partie logique du JS.

## Partie JS

### Fonction afficherTemps()

Elle prend en paramètre le temps restant et la zone dans laquelle on est en train de travailler (work, pause ou break).

A l'aide de **template literals** et d'un **opérateur ternaire conditionnel**, je peux gérer simplement le format du chornomètre afin d'afficher un 0 avant l'unité des secondes quand on passe en dessous de 10s.

### Fonction start()

C'est le coeur du timer. 
Je l'attache à un événement lié au bouton start de chaque onglet.
Afin de refactoriser au maximum mon code, je passe en paramètres les éléments qui me permettent de savoir dans quel onglet se trouve l'utilisateur.
Toutes les secondes, le temps restant décrémente de 1 et on appelle la fonction aficherTemps().

Quand le temps est écoulé, à l'aide d'un switch, je définis en fontion de l'onglet où se trouve l'utilisateur et du nombre de cycles écoulés, l'onglet qui doit s'afficher ensuite.

### Gestion du stop and go

Afin que l'utilisateur puisse **avec le même bouton** démarrer puis mettre en pause, il fallait arrêter le timer au clic, c'est l'objet de la fonction stop() placée dans l'eventListener.




