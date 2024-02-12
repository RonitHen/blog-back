DROP DATABASE IF EXISTS blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;

-- Create the table for the posts
CREATE SEQUENCE "Post_id_seq";
CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL DEFAULT nextval('"Post_id_seq"'::regclass),
    title character varying COLLATE pg_catalog."default",
    content character varying COLLATE pg_catalog."default",
    date date,
    posted_by character varying COLLATE pg_catalog."default",
    CONSTRAINT "Post_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;

-- Create the table for the users
 CREATE TABLE IF NOT EXISTS public.users
 (
     id character varying COLLATE pg_catalog."default" NOT NULL,
     email character varying COLLATE pg_catalog."default",
     name character varying COLLATE pg_catalog."default",
     first_name character varying COLLATE pg_catalog."default",
     admin boolean,
     CONSTRAINT users_pkey PRIMARY KEY (id)
 )

 TABLESPACE pg_default;

 ALTER TABLE IF EXISTS public.users
     OWNER to postgres;

-- Insert some posts into the table
INSERT INTO public.posts(title, content, date, posted_by)
VALUES
  ('Eliad Ohayon', 'Content of post 1.', '2024-02-11', 'https://shaharisrael.co.il/wp-content/uploads/2023/10/WhatsApp-Image-2023-10-17-at-09.43.22-1.jpg', 'Ronit.H'),
  ('Moshe Ohayon', 'Content of post 2.', '2024-02-12', 'https://www.mynet.co.il/picserver/mynet/crop_images/2023/10/09/SkTO9z11bT/SkTO9z11bT_0_0_1079_1582_0_large.jpg', 'Ronit.H'),
  ('Yehuda Bachar', 'Content of post 3.', '2024-02-13', 'https://www.kipa.co.il/userFiles/2024/02/735-415/325134_f2d3821863ddd1124be07f7d994508dc.jpg', 'Ronit.H'),
  ('Post 4', 'Content of post 4.', '2024-02-14', 'img_url', 'Ronit.H'),
  ('Post 5', 'Content of post 5.', '2024-02-15', 'img_url', 'Ronit.H'),
  ('Post 6', 'Content of post 6.', '2024-02-16', 'img_url','Ronit.H');

-- Insert some users into the table
INSERT INTO public.users(id, email, name, first_name, admin)
VALUES
  (100387108082396151313, 'ronit.heinoch@gmail.com', 'Ronit Heinoch', 'Ronit', true),
  (1, 'ilia.kohanovski@grunitech.com', 'Ilia Kohanovski', 'Ilia', true),
  (2, 'user2@example.com', 'John Doe', 'John', false),
  (3, 'user3@example.com', 'Emily Smith', 'Emily', false),
  (4, 'user4@example.com', 'Michael Johnson', 'Michael', false),
  (5, 'user5@example.com', 'Emma Brown', 'Emma', false);