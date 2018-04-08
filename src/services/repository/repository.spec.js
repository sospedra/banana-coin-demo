/* global expect, describe, it */
const repositoryService = require('./')

jest.mock('util', () => {
  const fixture = require('./fixture')
  return { promisify: jest.fn(() => () => fixture) }
})

describe('service repository', () => {
  const dirname = 'dirname'
  const dbname = 'dbname'
  const repository = repositoryService(dirname, dbname)

  it('getAll should return all the fixture', async () => {
    const data = await repository.getAll()
    expect(data).toMatchSnapshot()
  })

  it('getByID should return one log from the fixture', async () => {
    const data = await repository.getByID(0)
    expect(data).toMatchSnapshot()
  })

  it('create should return the id of the new log', async () => {
    const data = await repository.create({})
    expect(data).toMatchSnapshot()
  })

  it('update should not fail', async () => {
    await repository.update(0, {})
  })

  it('remove should not fail', async () => {
    await repository.remove(0)
  })

  it('purge should not fail', async () => {
    await repository.purge()
  })
})
