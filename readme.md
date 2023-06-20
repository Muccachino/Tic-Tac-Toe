## Tic-Tac-Toe

In this game two players alternately put their mark in a 3x3 grid.
The first player who manages to get a row of three (horizontal, vertical or diagonal) wins the game.
If neither player gets a row before all squares are marked, then it is a draw.
After each round you can decide whether to replay with the same names, or to start a new game.
If you choose replay starting player alternates every time.
A win counter shows how many rounds a player has already won. The counter resets if you start a new game.

```
getPlayerNames()
```

Reads out the inputs for the player names.

```
checkPlayerInput()
```

Checks whether both player names have been entered.

```
createPlayer()
```

Creates two players with a class function and the entered names as properties.
It then displays the names to the left and right of the game board.

```
setMark()
```

Registers which square on the board has been clicked, which player is currently active and depending on these factors
either puts a circle or a cross in the square.
After each turn the board checks if a winning condition has been met and if not the next player can make their turn.

```
createCircle()
createCross()
```

These two functions create the marking symbols and append them to the clicked square.

```
showPlayerTurn()
```

Displays as a headline which player is currently active.

```
borderActivePlayer()
```

Adds a border around the currently active player to further highlight whose turn it is.

```
showGameBoard()
```

After entering the player names it hides the header and input form and displays the game board.

```
showWinner()
```

If a winning condition has been met the game board will be hidden and the winning page displayed.
It shows who won this round and a point counter for each player.

```
showDraw()
```

If all squares have been clicked without a player meeting a winning condition.
It displays a draw message and the current points of the players.

```
replay()
```

Removes all marks made resets the mark counters and goes back to the gameb oard.

```
determineStartPlayer()
```

Before replaying this function checks how many rounds have been played and depending on the number of rounds
being even or uneven it sets the value that determines whose turn it is.

```
restart()
```

Reloads the whole page if you click on "Restart" during a round or on "New Game" at the end of a round.
