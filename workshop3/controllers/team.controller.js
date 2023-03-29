import { teamModel } from "../models/team.model.js";


export const getTeams = async function(){
  //get all teams
  try {
    const teams = await teamModel.find();
    if (teams) {
      return teams;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

//filtrar los equipos
export const filterTeam = async function(name, limit = 3){
  try {
    const team = await teamModel.find({name: { $regex: '.*'+ name + '.*'}}).limit(limit)
    if(team){
      return team;
    }else {
      return null;
    }
  }catch(error){
    return null;
  }
}