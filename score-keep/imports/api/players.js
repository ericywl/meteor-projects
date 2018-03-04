import { Mongo } from "meteor/mongo";
import Numbro from "numbro";

export const Players = new Mongo.Collection("players");

export const calcPlayerPosition = (players) => {
    let rank = 1;

    return players.map((player, index) => {
        if (index !== 0 && players[index - 1].score > player.score) {
            rank++;
        }

        return {
            ...player,
            rank,
            position: Numbro(rank).format("0o")
        }
    })
};