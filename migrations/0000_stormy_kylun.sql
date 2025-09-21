CREATE TABLE `authors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`url_external` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `authors_name_unique` ON `authors` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `authors_url_external_unique` ON `authors` (`url_external`);--> statement-breakpoint
CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`url_external` text NOT NULL,
	`portada` text,
	`titulo` text NOT NULL,
	`tipo` text,
	`estado` text,
	`ultima_actualizacion` integer,
	`descripcion` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`author_id` text,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `books_url_external_unique` ON `books` (`url_external`);--> statement-breakpoint
CREATE TABLE `chapters` (
	`id` text PRIMARY KEY NOT NULL,
	`capitulo_num` integer DEFAULT 0 NOT NULL,
	`titulo` text NOT NULL,
	`url_external` text NOT NULL,
	`local_path` text,
	`titulo_attr` text,
	`is_downloaded` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`book_id` text NOT NULL,
	FOREIGN KEY (`book_id`) REFERENCES `books`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `chapters_url_external_unique` ON `chapters` (`url_external`);