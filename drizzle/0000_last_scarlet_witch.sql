CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`quantity` integer NOT NULL,
	`expiry_date` integer,
	`image_uri` text,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
