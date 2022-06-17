import { Request, Response, Router } from 'express'
import path from 'path'
import fs from 'fs'
import processImage from './processor'
import thumbread from './validator'

const router: Router = Router()

export interface imagequery {
  filename?: string
  width?: string
  height?: string
  w?: string
  h?: string
}
interface pathdef {
  fullimagepath: string
  fullresizedpath: string
  width: string | undefined
  height: string | undefined
  w: number
  h: number
}

let errorflag = ''

export const imagespath = path.resolve(__dirname, '../../imageset/images')
export const resizedpath = path.resolve(__dirname, '../../imageset/resized')

router.use(async (req: Request, res: Response): Promise<void> => {
  console.log('Time: ', Date.now())

  const fullpaths = getfull(req.query)
  const source = fullpaths.fullimagepath
  const target = fullpaths.fullresizedpath
  const width = parseInt(fullpaths.width!)
  const height = parseInt(fullpaths.height!)

  await checker(req.query, req, res)
  if (fs.existsSync(fullpaths.fullresizedpath) && errorflag === '') {
    // res.send(fullpaths.fullresizedpath)

    return await thumbread({ target, req, res })
  } else {
    if (errorflag === '') {
      await processImage({ source, target, width, height })
      res.send('request again to view file ')
    } else {
      console.log(errorflag)
    }

    //const fullpaths = getfull(req.query)
  }

  errorflag = ''
})

async function checker(props: imagequery, req: Request, res: Response) {
  const fullpaths = getfull(props)
  const width = fullpaths.w
  const height = fullpaths.h

  if (
    typeof props.filename === 'undefined' ||
    props.filename === '' ||
    width <= 0 ||
    height <= 0
  ) {
    errorflag =
      'something is wrong with the parameters recheck the inputs and make sure your url looks like this : http://localhost:9090/resize?filename=fjord or this : http://localhost:9090/resize?filename=fjord&width=500&height=500 '

    return res.send(errorflag)
  } else if (!fs.existsSync(fullpaths.fullimagepath)) {
    const files: Array<string> = []

    fs.readdirSync(imagespath).forEach(filename => {
      const name = path.parse(filename).name
      const filepath = path.resolve(imagespath, filename)
      const stat = fs.statSync(filepath)
      const isFile = stat.isFile()

      if (isFile) files.push(name)
    })
    errorflag = `available files are : ' ${files} '  `
    return res.send(errorflag)
  } else {
    return
  }
}

export const getfull = (props: imagequery): pathdef => {
  const width = props.width || props.w
  const height = props.height || props.h
  const w = parseInt(width!)
  const h = parseInt(height!)

  const fullimagepath = path.resolve(imagespath, `${props.filename}.jpg`)
  const fullresizedpath =
    width && height 
      ? path.resolve(resizedpath, `${props.filename}-${width}x${height}.jpg`)
      : path.resolve(imagespath, `${props.filename}.jpg`)
  const rare: pathdef = { fullimagepath, fullresizedpath, width, height, w, h }

  return rare
}

export default router
