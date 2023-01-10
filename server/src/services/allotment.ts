import cron from "node-cron"
import { SelectedStudent, allotmentModel } from "../models/allotment_model";
import createHttpError from "http-errors";
import moment from "moment";
import sudent from "../controllers/student"

export const initScheduledJobs = async () => {
  let last = await getLatestAllotment()
  if (last) {
    let lastYear = moment(last.date).year();
    let thisYear = moment(new Date).year();
    if (lastYear < thisYear) {
      console.log("call allotment 1")
      sudent.allotment();
    } else {
      console.log("allotment already took place this year")
    }
  } else {
    sudent.allotment();
    console.log("call allotment 2")
  }
  const scheduledJobFunction = cron.schedule("* * 1 1 *", () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
  });

  scheduledJobFunction.start();
}

export const createAllotmentDoc = (selectedStudent: SelectedStudent[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    allotmentModel.create({ selectedSutdents: selectedStudent }).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}


export const getLatestAllotment = () => {
  return new Promise((resolve, reject) => {
    allotmentModel.find({}).sort({ date: 1 }).then((res) => {
      if (res.length > 0) {
        resolve(res[0])
      } else {
        //@ts-ignore
        resolve()
      }
    }).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}