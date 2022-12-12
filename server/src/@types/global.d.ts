import express from "express"
declare global {
  namespace Express {
    interface Request {
      user: Object;
      universtiy : Object;
    }
    }
  }
  interface Error {
    status: number;
  }
    
}