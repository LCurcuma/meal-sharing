--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: _meal; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._meal (
    id smallint,
    title character varying(38) DEFAULT NULL::character varying,
    description character varying(353) DEFAULT NULL::character varying,
    location character varying(7) DEFAULT NULL::character varying,
    "when" character varying(19) DEFAULT NULL::character varying,
    max_reservations smallint,
    price numeric(5,2) DEFAULT NULL::numeric,
    created_date character varying(19) DEFAULT NULL::character varying,
    image_url character varying(94) DEFAULT NULL::character varying
);


ALTER TABLE public._meal OWNER TO rebasedata;

--
-- Name: _reservation; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._reservation (
    id character varying(1) DEFAULT NULL::character varying,
    number_of_guests character varying(1) DEFAULT NULL::character varying,
    meal_id character varying(1) DEFAULT NULL::character varying,
    created_date character varying(1) DEFAULT NULL::character varying,
    contact_phonenumber character varying(1) DEFAULT NULL::character varying,
    contact_name character varying(1) DEFAULT NULL::character varying,
    contact_email character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._reservation OWNER TO rebasedata;

--
-- Name: _review; Type: TABLE; Schema: public; Owner: rebasedata
--

CREATE TABLE public._review (
    id character varying(1) DEFAULT NULL::character varying,
    title character varying(1) DEFAULT NULL::character varying,
    description character varying(1) DEFAULT NULL::character varying,
    meal_id character varying(1) DEFAULT NULL::character varying,
    stars character varying(1) DEFAULT NULL::character varying,
    created_date character varying(1) DEFAULT NULL::character varying
);


ALTER TABLE public._review OWNER TO rebasedata;

--
-- Data for Name: _meal; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._meal (id, title, description, location, "when", max_reservations, price, created_date, image_url) FROM stdin;
1	Little Chicks Steamed Bun	“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Author: Xue Ren雪人	Denmark	2025-07-06 00:00:00	0	83.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-11-36.jpg
2	Eevee Cake	A cake inspired by Fluffy Eevee Pancakes from the game, Pokemon Cafe Mix! Author: Sugar High Score	Denmark	2025-07-05 00:00:00	105	66.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-30-56.jpg
3	Pokemon Macaron	Firstly, Whipsugar (ホイップシュガー) creates macarons topped with 3D icing versions of the OG three Eeveelutions. There’s no recipe for the macarons, just a guide for the decorations, including crystals too. Even if this is above your skill level (mine too) then I highly recommend watching as it’s amazing to see them finished. Author: ホイップシュガーのアイシングクッキーチャンネル	Denmark	2025-07-06 00:00:00	0	197.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-38-13.jpg
4	Easy Black Sesame Molten Lava Buns	“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人	Denmark	2025-07-06 00:00:00	0	157.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_14-50-19.jpg
5	Little Sheep Steamed Buns	“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人	Denmark	2025-07-05 00:00:00	85	96.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-36-02.jpg
6	 Unicorn Doughnut Steamed Bun	“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人	Denmark	2025-07-06 00:00:00	0	151.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-39-19.jpg
7	Little Tiger Steamed Buns	“Baozi” and “mantou” are steamed buns, a popular brunch bite-size food in Chinese society, they are made of 5 simple ingredients and cooked in a bamboo steamer. Xue Ren here to show you how to transform traditional round white steamed buns into surprisingly cute characters. Author: Xue Ren雪人	Denmark	2025-07-05 00:00:00	73	159.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-44-42.jpg
8	Sumikko Gurashi Meringue Cookies	This cute cookies are so sweet, so it seems! They're good desert abd snacks. Author: BEMBUM KITCHEN	Denmark	2025-07-08 00:00:00	148	28.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-48-32.jpg
9	Italian Meringue	The Italian meringue recipe and piping techniques in this video tutorial will give absolute beginners a place to start when learning how to make their own animal and character meringues. Author: Colby Jack Rabbit	Denmark	2025-07-06 00:00:00	0	109.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-53-20.jpg
10	Cherry Bear	Really good and cute Cherry Bear Meringue Cookie. Author: 머랭쓰 Meringue’s	Denmark	2025-07-07 00:00:00	0	7.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-07_15-57-18.jpg
11	Bunny & Chick 3D Meringue Cookies	Cute 3D meringue cookies! Author: Sugar Bean 슈가빈	Denmark	2025-07-09 00:00:00	25	123.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-19-06.jpg
12	Pooh meringuecookie	Cute meringue cookies with characters from Winnie the Pooh. Author: 베이몬 Baking Monster	Denmark	2025-07-09 00:00:00	0	198.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-34-38.jpg
13	Winnie the Pooh Santa Meringue cookies	Cute Christmas Winnie that has sweet taste! Author: 누빗 nubittime	Denmark	2025-07-08 00:00:00	0	161.00	2025-07-12 00:00:00	https://theporodyofcats.wordpress.com/wp-content/uploads/2025/07/photo_2025-07-09_13-44-30.jpg
\.


--
-- Data for Name: _reservation; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._reservation (id, number_of_guests, meal_id, created_date, contact_phonenumber, contact_name, contact_email) FROM stdin;
\.


--
-- Data for Name: _review; Type: TABLE DATA; Schema: public; Owner: rebasedata
--

COPY public._review (id, title, description, meal_id, stars, created_date) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

