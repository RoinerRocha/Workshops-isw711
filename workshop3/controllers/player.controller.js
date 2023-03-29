import { playerModel } from "../models/player.model.js";


export const getPlayers = async function () {
  //get all players
  try {
    const players = await playerModel.find();
    if (players) {
      return players;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getPlayer = async function (id) {
  //get one specific player
  try {
    const player = await playerModel.findById(id);
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const filterPlayerByName = async function (name, limit = 5) {
  //get players by name
  try {
    const player = await playerModel.find({ first_name: { $regex: '.*' + name + '.*' } }).limit(limit)
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

// obtener jugadores por ascendente o descendente
export const getPlayerAscDesc = async function (param) {
  try {
    const player = await playerModel.find();
    if (player && param == "DESC") {
      player.sort(function (name, name2) {
        if (name.first_name < name2.first_name) {
          return -1;
        }
        if (name.first_name > name2.first_name) {
          return 1;
        }
        return 0;
      });
      return player;
    } if (player && param == "ASC") {
      player.sort(function (name, name2) {
        if (name.first_name < name2.first_name){
          return 1;
        }
        if (name.first_name > name2.first_name){
          return -1;
        }
        return 0;
      });
      return player;
    }else {
      return null;
    }
  }catch (error){
    return null;
  }
}