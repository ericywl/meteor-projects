import { Mongo } from "meteor/mongo";
import numeral from "numeral";

export const Players = new Mongo.Collection("players");

export const calcPlayerPositions = (players) => {
    return players.map((player, index) => {
        let rank = 1;
        if (index !== 0 && players[index - 1].score > player.score)
            rank++;

        return {
            ...player,
            rank,
            position: numeral(rank).format("0o")
        }
    });
};