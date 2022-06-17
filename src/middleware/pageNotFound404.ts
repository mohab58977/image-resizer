import { Request, Response } from 'express'

export const pageNotFound404 = (req: Request, res: Response) => {
  res.status(404)
  res.send('pageNotFound')
}
