import fs from 'fs'

import { Request, Response } from 'express'

interface readfileprops {
  target: string
  req: Request
  res: Response
}

const thumbread = async (props: readfileprops): Promise<void> => {
  fs.readFile(props.target, function (err, data) {
    if (err) {
      props.res.send(err)
    } // Fail if the file can't be read.
    props.res.writeHead(200, { 'Content-Type': 'image/jpeg' })
    return props.res.end(data) // Send the file data to the browser.
  })
}

export default thumbread
