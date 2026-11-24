# deadlock.wiki — Console commands, "Useful Console Commands" table

Source: https://deadlock.wiki/Console_commands, revision oldid=236265. Copied verbatim (52 rows) on 2026-11-24.
"Requires cheats" appears only in the Description column.

| Command | Values | Default | Description |
| --- | --- | --- | --- |
| bot_kick_all |  |  | Kicks all bots from the game. |
| changelevel | See the `map` command. |  | Loads a new map. When used in a multiplayer lobby, players will remain connected while the map changes. |
| changeteam | <ul><li>0: Select a team and hero.</li><li>1: Join spectators.</li><li>2: Join The Hidden King and select a hero.</li><li>3: Join The Archmother and select a hero.</li></ul> |  | Allows changing your team and hero. |
| citadel_allow_purchasing_anywhere | true/false |  | Enables purchasing anywhere on the map, not just at shops. Requires cheats. |
| citadel_ability_cooldown_max 2 |  |  | Changes all ability cooldown duration to 2 seconds. The duration is limited to below normal ability cooldown duration. When set to a number below or equal to zero, it is reset back to the default cooldown. Requires cheats. |
| citadel_rapid_stamina_regen true |  |  | Enables fast stamina, causing stamina to regen very fast. Requires cheats. |
| citadel_rapid_stamina_regen false |  |  | Disables fast stamina. Requires cheats. |
| citadel_dps_multiplier | number | 1.0 | Adds a multiplier to player damage output. Affects all damage including weapon and ability damage. Requires cheats. |
| citadel_enable_no_hero_death |  |  | Enables invincibility (your health will never go below 1). Requires cheats. |
| citadel_disable_no_hero_death |  |  | Disables invincibility. Requires cheats. |
| citadel_display_new_player_recommendations | true/false | true | Turns the "Great for New Players" banner on/off when selecting a hero. |
| citadel_hero_testing_enabled | true/false | false | Enables the "Testing Tools" menu from the Hero Sandbox. Enabling the menu does not require cheats, but using any of this menu's functionality will. |
| citadel_hero_testing_infinite_money | true/false | false | Gives players infinite souls and ability points. |
| citadel_hud_visible | true/false | true | Shows/hides the HUD. |
| citadel_item_purchases_force_enhanced | true/false | false | While true, all items purchased/drafted will be enhanced. |
| citadel_pause |  |  | Pause the match. |
| citadel_player_move_speed_scale | number | 1.0 | Scales movement speed causing players to move faster or slower. Requires cheats. |
| citadel_pregame_duration | number | 10.0 | Changes the duration of the pregame (countdown before the game starts). |
| citadel_region_override | <ul><li>-1: Auto</li><li>0: North America</li><li>1: Europe</li><li>2: Asia</li><li>3: South America</li><li>4: Europe (not sure if this is different from 1)</li><li>5: Oceania</li></ul> | -1 | Overrides your matchmaking region. **(Currently does not work)** |
| citadel_show_bullet_lag_compensation | number | 0 | How long to show bullet hitboxes. Green hitbox is client, red hitbox is server. |
| citadel_solo_bot_match | true/false | false | Gets enabled by bot match configs. When disabled, bots don't move. This also enables the pregame countdown. Not sure what else it does. |
| citadel_create_unit | Hero name from `dump_hero_names` |  | Spawns an allied dummy bot in front of the player. Requires cheats |
| citadel_spawn_nearby_neutrals |  |  | Respawns nearby neutral camps. Requires cheats. |
| citadel_spawn_practice_bots | true/false | false | Enable to spawn bots when the game starts. You can also set this to true during a game to spawn bots (although setting it to false, kicking bots, and setting it to true again will not respawn bots). |
| citadel_spawn_practice_bots_count | number |  | Number of practice bots to spawn when `citadel_spawn_practice_bots` is set to true. |
| citadel_test_survey_popup |  |  | Shows the post-match survey popup asking players to rate the match. |
| citadel_unit_status_use_new | true/false |  | Enables experimental health bars. |
| citadel_unlock_flex_slots |  |  | Unlocks all flex slots. Requires cheats. |
| citadel_unpause_countdown | number | 3 | Changes how many seconds the countdown will last when the game is unpaused. Requires cheats. |
| citadel_weapon_damage_multiplier | number | 1.0 | Adds a multiplier to weapon damage output. Does not affect ability damage. Requires cheats. |
| deadlock_early_development_warning_disabled | true/false | false | Disables the Early Development Build popup when the game starts. This gets set to true if you close the popup after checking "Don't show this again". |
| deadlock_get_old_builds |  |  | Downloads and prints out all of the build data for your account prior to the new builds feature. Added in [Update:August 6, 2024](https://deadlock.wiki/Update:August_6,_2024). |
| deadlock_post_match_survey_disabled | true/false | false | Disables the post-match survey. This gets set to true if you submit or skip a survey after checking "Don't show this again". |
| disconnect |  |  | Disconnect from the current match. |
| dump_hero_names |  |  | Lists the internal names of all available heroes. Requires cheats. |
| healthpct | 0 - 100 |  | Sets your health to the given percentage of your max health. Requires cheats. |
| hud_damagemeter | true/false | false | Displays your current DPS next to your crosshair. Requires cheats. |
| hurtme | number |  | Deal damage to yourself. Deals 10 damage with no value. Requires cheats. |
| kill | The name of an NPC or Player to kill |  | Kills the target. |
| killme |  |  | Kills you. |
| kingme |  |  | Gives you 1.2 million souls and levels up all your abilities. Requires cheats. |
| map | <ul><li>dl_midtown: The main multiplayer map</li><li>dl_streets: 4 lanes map</li><li>street_test: Old version of 4 lanes map (before [Update:September 26, 2024](https://deadlock.wiki/Update:September_26,_2024))</li><li>new_player_basics: The Hero Sandbox map</li><li>1v1_test: Seems like an early, smaller version of street_test</li><li>hero_testing: Seems like an early Hero Sandbox</li></ul> |  | Starts a game and loads into the chosen map. |
| citadel_minimap_unit_click_radius |  |  | Minimap ping radius |
| citadel_minimap_max_icon_shrink | 1 |  | Range of icons shrinking when grouped (e.g. player icons) |
| citadel_minimap_player_width |  |  | Default minimap player icon sizes |
| citadel_minimap_overlap_scan_distance |  |  | How close icons have to be to shrink (see citadel_minimap_max_icon_shrink) |
| minimap_update_rate_hz | 5 |  | Frequency of minimap updates |
| citadel_minimap_zip_line_thickness | 5 |  | Thickness of ziplines on minimap |
| selecthero | Hero name from `dump_hero_names` |  | Requires you to be on the hero selection screen, or have `citadel_hero_testing_enabled` set to true. |
| spawn_hero_testing_controller |  |  | Adds the hero testing tools to the UI. Requires cheats. |
| trooper_kill_all |  |  | Kills all non-neutral creeps and guardians that aren't shielded. Requires cheats. |
| trooper_kill_non_bosses |  |  | Kills all non-neutral creeps. Requires cheats. |
