const { pgTable, serial, varchar, text } = require("drizzle-orm/pg-core");

export const userinfo=pgTable('userinfo',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    username:varchar('username'),
    bio:text('bio'),
    location:varchar('location'),
    url:varchar('url')
});