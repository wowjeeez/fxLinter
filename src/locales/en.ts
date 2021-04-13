export const en = {
    "vector-math-only": "To improve performance, use vector math instead of the native solutions (on JS and C# use a wrapper, such as fivem-js)",
    "favor-keybindings": "Instead of listening for keypresses in a while loop, use RegisterKeyMapping",
    "no-object-calls": "To make your code more readable, remove the Citizen. prefix from certain functions (Wait, CreateThread, SetTimeout)",
    "no-RegisterServerEvent": "Instead of RegisterServerEvent use RegisterNetEvent",
    "limit-in-sql-calls": "To boost the performance of queries, always try to limit your SELECTs using the LIMIT [number] keyword",
    "no-get-player-ped-for-local": "Instead of GetPlayerPed(-1) and other obsolete solutions use PlayerPedId() to get the local ped, it's faster",
    "no-get-player-ped": "Are you sure that you need that GetPlayerPed there?",
    "use-fxmanifest": "Use fxmanifest.lua instead of __resource.lua",
    "src": "Use local src = source instead of _source, it has better readability"
}