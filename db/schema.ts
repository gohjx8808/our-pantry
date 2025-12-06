import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const itemsTable = sqliteTable("items", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  quantity: int().notNull(),
  expiryDate: int("expiry_date", { mode: "timestamp" }),
  imageUri: text("image_uri"),
  updatedAt: int("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  createdAt: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});
