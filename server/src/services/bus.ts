// import {ObjectId} from "mongoose";
import { Types } from "mongoose";
import { bus_model, bus_type } from "../models/bus_model";

const createBus = (busDetails: bus_type): Promise<void> => {
  return new Promise((resolve, reject) => {
    bus_model.create(busDetails).then(() => resolve())
  })
}

const fetchAllBus = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    bus_model.find().then((buses) => resolve(buses))
  })
}

const fetchBusDetails = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    bus_model.findById(id).then((bus) => resolve(bus))
  })
}

const updateReservedStatus = (busId: string, slotId: string, user: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(user)
    bus_model.updateOne(
      { _id: new Types.ObjectId(busId) }, 
      { $set: { "slots.$[].$[t].isReserved": true, "slots.$[].$[t].user": user } }, 
      { arrayFilters: [{ "t.id": slotId }] }
      )
      .then((result) => {
        // console.log(result)
        resolve()
      })
      .catch((err) => console.error(err))
  })
}

export default { createBus, fetchAllBus, fetchBusDetails, updateReservedStatus }

