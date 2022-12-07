import express from "express"
declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
  interface Error {
    status: number;
  }
    
}