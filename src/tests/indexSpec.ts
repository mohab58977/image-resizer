import supertest from 'supertest'
import { promises as fs } from 'fs'
import path from 'path'
import { app } from './../index'
import { getfull, imagespath, resizedpath ,imagequery} from '../routes/resize'
import processImage from '../routes/processor'



/*const fullimagepath  = path.resolve(imagespath, `foo.jpg`)
    const fullresizedpath =
        
        path.resolve(resizedpath, `foo.jpg`)
      
*/
const request: supertest.SuperTest<supertest.Test> = supertest(app)

describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/')

      expect(response.status).toBe(200)
    })
  })

  describe('endpoint: /resize', (): void => {
    it('gets /resize?filename=fjord (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/resize?filename=fjord'
      )

      expect(response.status).toBe(200)
    })

    it('gets /resize?filename=fjord&width=500&height=500 (valid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/resize?filename=fjord&width=500&height=500'
      )

      expect(response.status).toBe(200)
    })

    it('gets /resize?filename=fjord&width=-500&height=500 (invalid args)', async (): Promise<void> => {
      const response: supertest.Response = await request.get(
        '/resize?filename=fjord&width=-500&height=500'
      )

      expect(response.status).toBe(200)
    })

    it('gets /resize (no arguments)', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/resize')

      expect(response.status).toBe(200)
    })
  })

  describe('endpoint: /foo', (): void => {
    it('returns 404 for invalid endpoint', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/foo')

      expect(response.status).toBe(404)
    })
  })
})

const args: imagequery = {
  filename :'foo',
  width: '-100',
  height: '-100'
}

const fulladdress = getfull(args)
describe('Test image processing via sharp', (): void => {
  it('raises an error )', async (): Promise<void> => {
    const error: null | string = await processImage({
      source: fulladdress.fullimagepath,
      target: fulladdress.fullresizedpath,
      width: fulladdress.w,
      height: fulladdress.h
    })
    expect(error).not.toBeNull();
  })
})

const args2: imagequery = {
  filename: 'foo',
  width: '100',
  height: '100',
}
const fulladdress2 = getfull(args2)
it('raises an error ', async (): Promise<void> => {
  const error: null | string = await processImage({
    source: fulladdress2.fullimagepath,
    target: fulladdress2.fullresizedpath,
    width: fulladdress2.w,
    height: fulladdress2.h,
  })
  expect(error).not.toBeNull()
})

const args3: imagequery = {
  filename: 'fjord',
  width: '100',
  height: '100',
}
const fulladdress3 = getfull(args3)
it(' creates a thumb and save it to disk', async (): Promise<void> => {
   await processImage({
    source: fulladdress3.fullimagepath,
    target: fulladdress3.fullresizedpath,
    width: fulladdress3.w,
    height: fulladdress3.h,
  })
  let errorFile: null | string = ''

  try {
    await fs.access(fulladdress3.fullresizedpath)
    errorFile = null
  } catch {
    errorFile = 'File was not created'
  }

  expect(errorFile).toBeNull()
})

  // Erase test file. Test should not run on productive system to avoid cache loss
  afterAll(async (): Promise<void> => {
    const resizedImagePath: string = path.resolve(
      resizedpath,
      'fjord-500x500.jpg'
    )

    try {
      await fs.access(resizedImagePath)
      fs.unlink(resizedImagePath)
      await fs.access(fulladdress3.fullresizedpath)
      fs.unlink(fulladdress3.fullresizedpath)
    } catch {
      // intentionally left blank
    }
  })
