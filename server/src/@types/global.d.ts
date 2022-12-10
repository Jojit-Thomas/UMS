import express from "express"
declare global {
  namespace Express {
    interface Request {
      user: Object;
      universtiy : Object;
    }
    interface Request {
      cookies : {
        adminAccessToken : String,
        
      }
    }
  }
  interface Error {
    status: number;
  }
    
}