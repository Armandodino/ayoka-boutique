import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const products=sqliteTable('products',{id:text('id').primaryKey(),data:text('data').notNull(),stock:integer('stock').notNull().default(0),position:integer('position').notNull().default(0)});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),data:text('data').notNull()});
export const orders=sqliteTable('orders',{id:text('id').primaryKey(),requestId:text('request_id').notNull().unique(),created:text('created').notNull(),status:text('status').notNull().default('Nouvelle'),data:text('data').notNull()});

export const contacts=sqliteTable('contacts',{id:text('id').primaryKey(),data:text('data').notNull(),phone:text('phone').notNull().default(''),email:text('email').notNull().default(''),updated:text('updated').notNull()});
