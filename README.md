# farkle-fun

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).


## Game Engine

Starting into building the engine which will calculate combo matches and scores. Honestly not sure where to start. Read up on pattern matching a little. It seems to me that is what I'm trying to do. e.g. A player selcts 3 one's (1-1-1) and 2 fives (5-5). This would be a score of 1000 + 50 + 50 = 1500. Is that a pattern? 1-1-1-5-5? Does seem quite right. The only thing I know for sure is that I can't/don't want to `if` check for every single combo variation possibility.

Realizing there are a few set of common combos I can check for. E.g. 3 of a kind, 4 of a kind, etc... Initial tests seem correct but there are a few edge cases which don't fit this thought process. e.g. Flush 1-2-3-4-5-6. Maybe unique `if` checks on just the edge cases. 

Another problem I know I'll face and don't have an answer for is; how to determine which combo to select. e.g. In combo of 5-5-5-5-4-4. Is it best to go with 5-5-5-5 (1,000 points), 5-5 5-5 4-4 (1,500). I guess I just need to calculate and track every possible scoring combo and then compair results to determine the highest score. Because in the described scenario obviously the players intent is to score a triple pair (1,500). If I choose the 4 of a kind this would upset a player.


# TODOS

- [ ] determine when dice are hot
 - [ ] let player keep rolling
- [ ] What happens when a non-scoring dice is selected?
- [x] What happens when someone rolls a farkle?
 - [x] Determine it's a farkle for them and automaticaly end turn?
   - [ ] display animated logos on farkle & hot dice
 - [ ] ~Let player determine it's a farkle and end turn. When player does so mark as farkle?~
- [x] Display farkle count
 - [ ] Reduce user score by 1000 on 2 farkles and reset farkle count?
- [ ] Add animation for winning match


- [ ] Test game variants

Opening Score
This variant is the same as Farkle, except:
When the game begins, each player must continue throwing the dice until they have scored at least 500 points or until they Farkle. Once they have reached the 500 points, they are free to continue rolling or end their turn.
Opening scores of 350, 400, 600, or 1000 points may be used instead of 500.
 
Alternative Winning Score
This variant is the same as Farkle, except:
The target score needed to win the game is greater or less than 10,000 (e.g., 20,000 or 5000)
 
Hot Dice Roll
This variant is the same as Farkle, except:
A player who scores on all six dice must roll them all again at least once.
 
Three Farkles
This variant is the same as Farkle, except:
A player who rolls three Farkles in a row loses 1000 points.
 
Toxic Twos
This variant is the same as Farkle, except:
Four or more 2’s thrown in a single roll cancels the player’s entire score for that turn and ends their turn immediately.
 
High Stakes (or Greed)
This variant is the same as Farkle, except:
A player may choose to begin their turn by rolling the dice remaining from the previous player’s turn (e.g., those dice that were not set aside for scoring from the previous player’s turn). If the player scores with any of the dice on the first roll, they receive 1000 points in addition to any other points they may accumulate.
 
Welfare
This variant is the same as Farkle, except:
A player must score exactly 10,000 points to win the game. If a player scores more than 10,000 points, then all points scored that turn are given to the player with the lowest score.
 
Five Dice Farkle
This variant is the same as Farkle, except:
Five dice are used instead of six. (Obviously, certain scoring combinations, such as three pair, are impossible using this variant.)
 
Team Farkle
This variant is the same as Farkle, except:
The game is played in teams. Teammates sit opposite each other at the table and combine their scores. The game is typically played to 20,000 points instead of 10,000.
