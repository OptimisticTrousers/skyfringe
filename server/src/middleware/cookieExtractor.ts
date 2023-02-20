import { Request } from "express";

const cookieExtractor = (req: Request) => {
  let token = null;
  if(req && req.cookies) {
    token = req.cookies["jwt"]
  }
  return token; 
}

export default cookieExtractor;