# deadlock.wiki — Console commands, prose sections

Source: https://deadlock.wiki/Console_commands, revision oldid=236265. Copied verbatim on 2026-11-24 (everything except the command table and navigation).

# Console commands

Console commands allow you to modify gameplay settings. If the player has the "Dev command console" option enabled in settings, pressing **F7** will open the developer console, which allows you to run commands. They can be used in the [Hideout](https://deadlock.wiki/Hideout), Sandbox and "Explore NYC" modes, as well as cheat-enabled custom games (with the exception of server commands, as they can only be executed in custom servers).

For a complete list of console commands and variables, see the [Valve Developer Wiki](https://developer.valvesoftware.com/wiki/List_of_Deadlock_console_commands_and_variables).

For a non-formatted list of console variables, see [Data:Convars.json](https://deadlock.wiki/Data:Convars.json).

(Above the command table:) Commands that require cheats will not work in standard multiplayer matches. To enable cheats in a custom lobby, run `sv_cheats true`.

## Auto execute console commands on startup

- In the `<installation path>\steamapps\common\Deadlock\game\citadel\cfg` folder create a text file name it `autoexec.cfg`
- Put the console commands that you want to run on startup of Deadlock in the `autoexec.cfg` file, one console command on each line and save it
- In the Steam app right-click Deadlock in your list of games on the Library tab and select Properties...
- In the "LAUNCH OPTIONS" field enter `-console -exec autoexec`

[image: File:Launch_options_field.png, screenshot of the Launch options field — not reused on this site]

## Hosting Custom Games

- The host starts a custom game by loading into the map with `map dl_midtown`
  - You may want to pause the game immediately after joining by pressing **P** to give other players time to join the match.
- The host finds their ID by running `status`
  - Find a green line in the console that looks like this: `[Client] steamid : [A:1:XXXXXXXXXX:XXXXX] (XXXXXXXXXXXXXXXXX)` (the Xs will be replaced with numbers)
  - Select the part after `steamid` that looks like this, including the square brackets: `[A:1:XXXXXXXXXX:XXXXX]`
  - Right click and choose "Copy Selected Text"
- The host sends players the ID they just copied. Players can now connect to the game by opening their console and running `connect [A:1:XXXXXXXXXX:XXXXX]` (replace the part after connect with the ID they got from the host).
- Upon joining, players will be able to select their team and hero. To bring up this menu again, players can run `changeteam 0`.
- If you ever want to restart the game, the host can run `changelevel dl_midtown` .

### Adding Bots

- On the main menu, before you start the game, run `exec citadel_botmatch_practice_6v6` to load the bot config.
  - If you're already in a game, you can perform these steps then run `changelevel dl_midtown` to restart the game instead of starting a new one.
- Run `citadel_spawn_practice_bots false` so that bots won't spawn immediately when the game starts.
- Run `citadel_spawn_practice_bots_count 12` to ensure that bots fill all remaining slots (they'll be added until both teams have 6 players).
- Start the game (i.e. `map street_test`) and press **P** to pause the game during the pregame (as soon as you load in).
  - You can use `citadel_pregame_duration` before starting the game to increase the duration of the pregame if you want.
- Allow all other human players to connect and select their team and hero.
  - The team/hero menu can be a bit glitchy. Players can use the `changeteam` command instead (see table above for command description).
  - Remember to choose your (the host's) own team and hero as well. This may automatically unpause the game - press **P** after selecting a team to pause again.
  - After all human players have joined teams and selected heroes, the host runs `citadel_spawn_practice_bots true`, then presses **P** again to unpause the game. Bots should fill the remaining slots on each team.

## External links

- [List of Deadlock console commands and variables](https://developer.valvesoftware.com/wiki/List_of_Deadlock_console_commands_and_variables) on the Valve Developer Community.
