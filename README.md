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

Starting into building the engine which will calculate combo matches and scores. Honestly not sure where to start. Read up on pattern matching a little. It seems to me that is what I'm trying to do. e.g. A user selcts 3 one's (1-1-1) and 2 fives (5-5). This would be a score of 1000 + 50 + 50 = 1500. Is that a pattern? 1-1-1-5-5? Does seem quite right. The only thing I know for sure is that I can't/don't want to `if` check for every single combo variation possibility.

Realizing there are a few set of common combos I can check for. E.g. 3 of a kind, 4 of a kind, etc... Initial tests seem correct but there are a few edge cases which don't fit this thought process. e.g. Flush 1-2-3-4-5-6. Maybe unique `if` checks on just the edge cases. 

Another problem I know I'll face and don't have an answer for is; how to determine which combo to select. e.g. In combo of 5-5-5-5-4-4. Is it best to go with 5-5-5-5 (1,000 points), 5-5 5-5 4-4 (1,500). I guess I just need to calculate and track every possible scoring combo and then compair results to determine the highest score. Because in the described scenario obviously the players intent is to score a triple pair (1,500). If I choose the 4 of a kind this would upset a player.