/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, WordcountEntry, Project} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const projects = await Promise.all([
    Project.create({name: 'Harry Potter Fanfic', userId: users[0].id}),
    Project.create({name: 'The Great American Novel', startingWordcount: 58900, userId: users[1].id}),
    Project.create({name: 'The European Swallow', userId: users[0].id}),
  ])
  const entries = await Promise.all([
    WordcountEntry.create({wordcount: 100, projectId: projects[0].id, date: "2016-12-01"}),
    WordcountEntry.create({wordcount: 100, projectId: projects[0].id, date: "2017-12-09"}),
    WordcountEntry.create({wordcount: 200, projectId: projects[0].id, date: "2017-12-07"}),
    WordcountEntry.create({wordcount: 150, projectId: projects[0].id, date: "2017-12-05"}),
    WordcountEntry.create({wordcount: 122, projectId: projects[0].id, date: "2017-11-01"}),
    WordcountEntry.create({wordcount: 155, projectId: projects[2].id, date: "2017-12-01"}),
    WordcountEntry.create({wordcount: 122, projectId: projects[2].id, date: "2017-10-01"}),
    WordcountEntry.create({wordcount: 122, projectId: projects[2].id, date: "2017-09-01"}),

  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${projects.length} projects`)
  console.log(`seeded ${entries.length} entries`)

  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
