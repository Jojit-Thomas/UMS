import e, { RequestHandler } from "express";
import createHttpError from "http-errors";
import { Types } from "mongoose";
import busDB from "../services/bus";

const addBus:RequestHandler = async (req, res, next) => {
  try {
    let slots = []
    for(let i = 0; i < req.body.row; i++) { 
      let arr = [];
      for(let idx = 0; idx < req.body.col; idx++){
        arr.push({id : `${String.fromCharCode(i + 65)}${idx}` , isReserved: false, user : ""})
      }
      slots.push(arr)
    }
    req.body.slots = slots;
    await busDB.createBus(req.body)
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    next(err)
    // res.status(500).json("Internal server error")
  }
}

const allBus:RequestHandler = async (req, res, next) => {
  try{
    let buses = await busDB.fetchAllBus()
    res.status(200).json(buses)
  } catch (err) {
    next(err)
    // res.status(500).json("Internal server error")
  }
}

const busDetails:RequestHandler = async (req, res) => {
  try{
    let bus = await busDB.fetchBusDetails(req.params.id)
    res.status(200).json(bus)
  } catch(err) {

  }
}

const bookSeat: RequestHandler = async (req, res) => {
  try{
    const {busId, slotId, user} = req.body
    if(!busId || !slotId || !user) throw createHttpError.BadRequest("busId or slotId or user is missing")
    console.log(busId, slotId)
    await busDB.updateReservedStatus(busId, slotId, user)
    res.sendStatus(204)
  } catch(err) {
    res.status(err.status || 500).json(err.message)
  }
}



export default {addBus, allBus, busDetails, bookSeat}