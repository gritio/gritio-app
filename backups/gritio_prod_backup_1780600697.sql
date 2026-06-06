--
-- PostgreSQL database dump
--

\restrict TAcvFQwtab4R54d5D5HF420DulQjUkDTm71YCygHGweU9cWRrfJeAnxwfPZTwQ0

-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DistributionStrategy; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."DistributionStrategy" AS ENUM (
    'SPREAD_EVENLY',
    'EQUAL_DISTRIBUTION',
    'FRONT_LOAD',
    'PROGRESSIVE'
);


ALTER TYPE public."DistributionStrategy" OWNER TO postgres;

--
-- Name: Frequency; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Frequency" AS ENUM (
    'DAILY',
    'WEEKLY'
);


ALTER TYPE public."Frequency" OWNER TO postgres;

--
-- Name: GoalStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."GoalStatus" AS ENUM (
    'ON_TRACK',
    'BEHIND',
    'AHEAD'
);


ALTER TYPE public."GoalStatus" OWNER TO postgres;

--
-- Name: MeasurementType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."MeasurementType" AS ENUM (
    'NUMBER',
    'TIME',
    'STEPS',
    'DISTANCE'
);


ALTER TYPE public."MeasurementType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: CountGoal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CountGoal" (
    id text NOT NULL,
    "goalId" text NOT NULL,
    "targetCount" integer NOT NULL,
    "currentCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CountGoal" OWNER TO postgres;

--
-- Name: Goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Goal" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    area text NOT NULL,
    unit text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    target integer NOT NULL,
    progress integer DEFAULT 0 NOT NULL,
    status public."GoalStatus" DEFAULT 'ON_TRACK'::public."GoalStatus" NOT NULL,
    remarks text,
    "yearlyMeasure" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "distributionStrategy" public."DistributionStrategy" DEFAULT 'SPREAD_EVENLY'::public."DistributionStrategy" NOT NULL,
    "finalTarget" double precision,
    "startValue" double precision,
    "lifeGoalId" text
);


ALTER TABLE public."Goal" OWNER TO postgres;

--
-- Name: LifeGoal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LifeGoal" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."LifeGoal" OWNER TO postgres;

--
-- Name: MonthlyGoal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MonthlyGoal" (
    id text NOT NULL,
    "goalId" text NOT NULL,
    title text NOT NULL,
    month text NOT NULL,
    "monthDate" timestamp(3) without time zone NOT NULL,
    target numeric(10,2) NOT NULL,
    unit text NOT NULL,
    "currentProgress" numeric(10,2) DEFAULT 0 NOT NULL,
    status public."GoalStatus" DEFAULT 'ON_TRACK'::public."GoalStatus" NOT NULL,
    remarks text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MonthlyGoal" OWNER TO postgres;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    "goalId" text NOT NULL,
    title text NOT NULL,
    type public."MeasurementType" NOT NULL,
    frequency public."Frequency" NOT NULL,
    target integer NOT NULL,
    unit text NOT NULL,
    "timesPerWeek" integer,
    "lastUpdated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    months integer[] DEFAULT ARRAY[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
);


ALTER TABLE public."Task" OWNER TO postgres;

--
-- Name: TaskCompletion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaskCompletion" (
    id text NOT NULL,
    "taskId" text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    value numeric(10,2) NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TaskCompletion" OWNER TO postgres;

--
-- Name: TaskMonthAggregation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaskMonthAggregation" (
    id text NOT NULL,
    "taskId" text NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    "totalValue" numeric(10,2) NOT NULL,
    "daysWithActivity" integer DEFAULT 0 NOT NULL,
    target integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TaskMonthAggregation" OWNER TO postgres;

--
-- Name: TimeGoal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TimeGoal" (
    id text NOT NULL,
    "goalId" text NOT NULL,
    "targetHours" integer NOT NULL,
    "targetMinutes" integer DEFAULT 0 NOT NULL,
    "currentHours" integer DEFAULT 0 NOT NULL,
    "currentMinutes" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TimeGoal" OWNER TO postgres;

--
-- Name: Todo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Todo" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    description text,
    done boolean DEFAULT false NOT NULL,
    priority boolean DEFAULT false NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Todo" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "auth0Id" text,
    password text,
    name text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    dob timestamp(3) without time zone,
    phone text,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "emailVerificationToken" text,
    "emailVerificationExpires" timestamp(3) without time zone,
    coins integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: WeightGoal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WeightGoal" (
    id text NOT NULL,
    "goalId" text NOT NULL,
    "startWeight" double precision NOT NULL,
    "currentWeight" double precision NOT NULL,
    "targetWeight" double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."WeightGoal" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: CountGoal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CountGoal" (id, "goalId", "targetCount", "currentCount", "createdAt", "updatedAt") FROM stdin;
cmkaqgwjd000p01mvhck6f3iw	cmkaqgwiy000o01mvosdv8m3i	50	0	2026-01-12 05:39:37.273	2026-01-14 19:40:54.646
cmk6njt3z000l01o2rja94ulb	cmk6njt3q000k01o2yndq4eyy	6	0	2026-01-09 09:06:49.247	2026-01-14 19:41:02.93
cmk6nisjl000j01o2l6e1m6d3	cmk6nisj9000i01o2dk36j03b	2	0	2026-01-09 09:06:01.857	2026-01-14 19:41:11.822
cmk6nhpc8000h01o2hsl5i7qv	cmk6nhpbx000g01o2xww9cahq	4	0	2026-01-09 09:05:11.048	2026-01-14 19:41:19.173
cmk6nfpl9000d01o2lh24lp0u	cmk6nfpky000c01o2ckz3syvy	4	0	2026-01-09 09:03:38.061	2026-01-14 19:41:33.528
cmk6nf30l000b01o2laf4vv3z	cmk6nf30c000a01o2667jhsif	1	0	2026-01-09 09:03:08.805	2026-01-14 19:41:40.216
cmk6naq6g000901o2o5fvyk0y	cmk6naq65000801o2nx6zmh6c	2	0	2026-01-09 08:59:45.544	2026-01-14 19:42:29.838
cmk6n74nx000501o2ntqwk32t	cmk6n74nk000401o2bfi71pl3	10	0	2026-01-09 08:56:57.693	2026-01-14 19:42:44.225
cmk6n5fs9000301o2ox8wuc4g	cmk6n5frx000201o2t9dcnzz9	12	0	2026-01-09 08:55:38.793	2026-01-14 19:43:04.96
cmk6ngqwh000f01o2ur1gb2f5	cmk6ngqw7000e01o211l03h4y	6	0	2026-01-09 09:04:26.417	2026-01-14 19:45:05.073
cmkx1f4an000401o4gvz5jw4l	cmkx1f49d000301o4t8em9xch	6	0	2026-01-27 20:17:05.663	2026-01-27 20:17:05.663
cmkx1hdpn000801o4j9sm7x1n	cmkx1hdp9000701o46l15f3dy	4	0	2026-01-27 20:18:51.179	2026-01-27 20:18:51.179
cmkx1lr3j000d01o4lhvgbwp5	cmkx1lr34000c01o4bt8pcxxn	4	0	2026-01-27 20:22:15.151	2026-01-27 20:22:38.339
cmkx2hven000p01o438dbu8w4	cmkx2hvea000o01o4hjabpqpo	13	0	2026-01-27 20:47:13.727	2026-01-27 20:47:13.727
cmkx1g06n000601o40a2u2q74	cmkx1g061000501o49zws73w3	1	0	2026-01-27 20:17:46.99	2026-01-27 20:50:17.113
cmkxop3x4006l01o49uktc780	cmkxop3wo006k01o4x82oaqzi	6	0	2026-01-28 07:08:42.904	2026-01-28 07:08:42.904
cmpw9cvsz001w01ogi71u3c80	cmpw9cvse001v01og65qhgq3i	180	0	2026-06-02 06:30:03.779	2026-06-02 06:30:03.779
cmpw9eau3001y01ogha979o83	cmpw9eati001x01ogaopmwvs1	7	0	2026-06-02 06:31:09.915	2026-06-02 06:31:09.915
cmpw9f44w002001ogmvhyl81k	cmpw9f44d001z01ogtf61x27m	1	0	2026-06-02 06:31:47.888	2026-06-02 06:31:47.888
cmpw9fvgp002201ogy9c3sbxv	cmpw9fvg4002101ogqmlz6omv	30	0	2026-06-02 06:32:23.305	2026-06-02 06:32:23.305
cmpw9glcf002401ogzvxjrloc	cmpw9glbx002301ogb4r6hc1y	30	0	2026-06-02 06:32:56.847	2026-06-02 06:32:56.847
cmpw9he44002601ogarjinjpf	cmpw9he3m002501ogw0fuvkui	8	0	2026-06-02 06:33:34.132	2026-06-02 06:33:34.132
\.


--
-- Data for Name: Goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Goal" (id, "userId", title, area, unit, "startDate", "endDate", target, progress, status, remarks, "yearlyMeasure", "createdAt", "updatedAt", "distributionStrategy", "finalTarget", "startValue", "lifeGoalId") FROM stdin;
cmk6nisj9000i01o2dk36j03b	cmk5w4rki00001yo2kjphkgvu	Cooking - Learn 2 new dishes	Personal	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 09:06:01.815	2026-01-14 19:41:11.674	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmk6nhpbx000g01o2xww9cahq	cmk5w4rki00001yo2kjphkgvu	Watch Movies in Theater with Nandu	Relationships	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 09:05:11.008	2026-01-14 19:41:19.024	SPREAD_EVENLY	\N	\N	cmkefdkxi000101l6h1wczkmp
cmk6nfpky000c01o2ckz3syvy	cmk5w4rki00001yo2kjphkgvu	Trips	Personal	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 09:03:38.02	2026-01-14 19:41:33.376	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmk6nf30c000a01o2667jhsif	cmk5w4rki00001yo2kjphkgvu	Nandu Side Project	Relationships	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 09:03:08.768	2026-01-14 19:41:40.071	SPREAD_EVENLY	\N	\N	cmkefdkxi000101l6h1wczkmp
cmk6naq65000801o2nx6zmh6c	cmk5w4rki00001yo2kjphkgvu	Design and Stitch Skirt for Sanjana and Shreya	Personal	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 08:59:45.501	2026-01-14 19:42:29.688	SPREAD_EVENLY	\N	\N	cmkefe8ma000201l6ncp5nuvt
cmk6n8vfl000601o2zhkfw4s2	cmk5w4rki00001yo2kjphkgvu	Swimming 	Health	Time	2026-01-09 00:00:00	2027-01-09 00:00:00	100	0	ON_TRACK	\N		2026-01-09 08:58:19.011	2026-01-14 19:42:38.231	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmkx1hdp9000701o46l15f3dy	cmkarzu47000001rrwzckt76v	Watch Movies with parents	Relationships	Count	2026-01-27 00:00:00	2027-01-27 00:00:00	100	0	ON_TRACK	\N		2026-01-27 20:18:51.132	2026-01-27 20:18:51.132	SPREAD_EVENLY	\N	\N	cmkx1d1se000201o40ipo78fq
cmkx1lr34000c01o4bt8pcxxn	cmkarzu47000001rrwzckt76v	Reach 4 levels in Kumon	Learning	Count	2026-01-27 00:00:00	2027-01-27 00:00:00	100	25	ON_TRACK	\N		2026-01-27 20:22:15.102	2026-01-27 20:44:48.053	SPREAD_EVENLY	\N	\N	cmkx1bly5000001o41a7u1gzq
cmkaqgwiy000o01mvosdv8m3i	cmk5w4rki00001yo2kjphkgvu	Complete 50 issues on Gritio Project	Personal	Count	2026-01-11 00:00:00	2027-01-11 00:00:00	100	20	ON_TRACK	\N		2026-01-12 05:39:37.221	2026-02-02 18:48:17.864	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmkx2hvea000o01o4hjabpqpo	cmkarzu47000001rrwzckt76v	Read books	Learning	Count	2026-01-27 00:00:00	2027-01-27 00:00:00	100	15	ON_TRACK	\N		2026-01-27 20:47:13.681	2026-01-27 20:47:57.07	EQUAL_DISTRIBUTION	\N	\N	cmkx1bly5000001o41a7u1gzq
cmkx1g061000501o49zws73w3	cmkarzu47000001rrwzckt76v	Work on a L4 RC Car	Personal	Count	2026-01-27 00:00:00	2027-01-27 00:00:00	100	0	ON_TRACK	\N		2026-01-27 20:17:46.931	2026-01-27 20:50:17.097	EQUAL_DISTRIBUTION	\N	\N	cmkx1c0gc000101o4cvri8kx3
cmkx1f49d000301o4t8em9xch	cmkarzu47000001rrwzckt76v	Endurance Activities	Personal	Count	2026-01-27 00:00:00	2027-01-27 00:00:00	100	17	ON_TRACK	\N		2026-01-27 20:17:05.583	2026-01-27 20:51:31.689	SPREAD_EVENLY	\N	\N	cmkx1d1se000201o40ipo78fq
cmk6njt3q000k01o2yndq4eyy	cmk5w4rki00001yo2kjphkgvu	Nandu Learning to cook - 6 dishes 	Relationships	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	33	ON_TRACK	\N		2026-01-09 09:06:49.209	2026-02-02 18:48:27.815	SPREAD_EVENLY	\N	\N	cmkefdkxi000101l6h1wczkmp
cmk6ngqw7000e01o211l03h4y	cmk5w4rki00001yo2kjphkgvu	Endurance Activities	Personal	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	17	ON_TRACK	\N		2026-01-09 09:04:26.37	2026-02-02 18:48:45.17	SPREAD_EVENLY	\N	\N	cmkefdkxi000101l6h1wczkmp
cmk6n5frx000201o2t9dcnzz9	cmk5w4rki00001yo2kjphkgvu	Read Books	Learning	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	4	ON_TRACK	\N		2026-01-09 08:55:38.749	2026-02-02 18:49:15.115	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmk6mr5z8000001o2wyiff16g	cmk5w4rki00001yo2kjphkgvu	Maintain HBA1C	Health	Kilogram	2026-01-08 00:00:00	2027-01-08 00:00:00	100	100	ON_TRACK	This is not kilogram but it is mg/dl		2026-01-09 08:44:32.869	2026-02-02 18:49:41.926	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmpjlnt4j000901mth0vw3by4	cmk5w4rm700011yo2ey83qv4z	Reach 90 KG	Health	Kilogram	2026-05-24 00:00:00	2027-12-31 00:00:00	100	100	ON_TRACK	\N		2026-05-24 09:53:28.586	2026-06-02 06:29:03.966	SPREAD_EVENLY	\N	\N	cmoh2c46t000x01mv0hf3khtk
cmpw9cvse001v01og65qhgq3i	cmk5w4rm700011yo2ey83qv4z	Write Daily	Personal	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:30:03.719	2026-06-02 06:30:03.719	SPREAD_EVENLY	\N	\N	cmp8noc4r001101mv1jcgxvfn
cmkxop3wo006k01o4x82oaqzi	cmkarzu47000001rrwzckt76v	Learn Cooking - 6 dishes	Personal	Count	2026-01-28 00:00:00	2027-01-28 00:00:00	100	33	ON_TRACK	\N		2026-01-28 07:08:42.854	2026-02-08 07:14:59.198	SPREAD_EVENLY	\N	\N	cmkx1bly5000001o41a7u1gzq
cmpw9eati001x01ogaopmwvs1	cmk5w4rm700011yo2ey83qv4z	Read Books	Learning	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:31:09.848	2026-06-02 06:31:09.848	SPREAD_EVENLY	\N	\N	cmp8noc4r001101mv1jcgxvfn
cmk6n74nk000401o2bfi71pl3	cmk5w4rki00001yo2kjphkgvu	Yoga do surya Namaskar 	Health	Count	2026-01-09 00:00:00	2027-01-09 00:00:00	100	10	ON_TRACK	\N		2026-01-09 08:56:57.648	2026-02-08 08:39:08.325	SPREAD_EVENLY	\N	\N	cmkefcuyk000001l6nuhkyzf8
cmpw9f44d001z01ogtf61x27m	cmk5w4rm700011yo2ey83qv4z	Ship Personal Project	Career	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:31:47.829	2026-06-02 06:31:47.829	SPREAD_EVENLY	\N	\N	cmp8noc4r001101mv1jcgxvfn
cmpw9fvg4002101ogqmlz6omv	cmk5w4rm700011yo2ey83qv4z	Finance Weekly Review	Finance	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:32:23.243	2026-06-02 06:32:23.243	SPREAD_EVENLY	\N	\N	cmoh2dkz0000y01mvq774wx77
cmpw9glbx002301ogb4r6hc1y	cmk5w4rm700011yo2ey83qv4z	Nandu Growth Sessions	Relationships	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:32:56.789	2026-06-02 06:32:56.789	SPREAD_EVENLY	\N	\N	cmp8ni7bs000z01mvxmqqso8a
cmpw9he3m002501ogw0fuvkui	cmk5w4rm700011yo2ey83qv4z	Travel & Experiences	Personal	Count	2026-06-02 00:00:00	2027-06-02 00:00:00	100	0	ON_TRACK	\N		2026-06-02 06:33:34.074	2026-06-02 06:33:34.074	SPREAD_EVENLY	\N	\N	cmoh2c46t000x01mv0hf3khtk
\.


--
-- Data for Name: LifeGoal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LifeGoal" (id, "userId", title, description, "createdAt", "updatedAt") FROM stdin;
cmkefcuyk000001l6nuhkyzf8	cmk5w4rki00001yo2kjphkgvu	Be happy and healthy - Both Physically and mentally	Focus on maintaining physical health and mental health	2026-01-14 19:39:37.532	2026-01-14 19:39:37.532
cmkefdkxi000101l6h1wczkmp	cmk5w4rki00001yo2kjphkgvu	Be a Good Mother	Working and building on the relationship with Nandu through meaningful activities	2026-01-14 19:40:11.19	2026-01-14 19:40:11.19
cmkefe8ma000201l6ncp5nuvt	cmk5w4rki00001yo2kjphkgvu	Help the Indian Weaver Community	Help the Indian weaver community in whatever way possible. 	2026-01-14 19:40:41.89	2026-01-14 19:40:41.89
cmkx1d1se000201o40ipo78fq	cmkarzu47000001rrwzckt76v	To be a loving son	to be a loving son to my parents.	2026-01-27 20:15:29.102	2026-01-27 20:15:29.102
cmkx1bly5000001o41a7u1gzq	cmkarzu47000001rrwzckt76v	To be an independent and happy human being	To be an independent and happy human being	2026-01-27 20:14:21.917	2026-01-27 20:43:22.044
cmkx1c0gc000101o4cvri8kx3	cmkarzu47000001rrwzckt76v	To design a Car	to create a super fast car	2026-01-27 20:14:40.716	2026-01-27 20:43:45.222
cmoh2c46t000x01mv0hf3khtk	cmk5w4rm700011yo2ey83qv4z	Health and Wellness	1. Staying under overweight category always.\n2. Being mentally happy. 	2026-04-27 10:37:15.701	2026-05-16 18:00:31.66
cmoh2dkz0000y01mvq774wx77	cmk5w4rm700011yo2ey83qv4z	Financial Everything	1. Becoming Mortgage free by 2038\n2. Retire at 55\n3. Having a 6 month emergency fund until 55\n4. Nandus education fund by 2033\n	2026-04-27 10:38:24.107	2026-05-16 18:00:52.522
cmp8noc4r001101mv1jcgxvfn	cmk5w4rm700011yo2ey83qv4z	Explore and Grow	- Do something that you are proud of each year, could be a new project like gritio, learning a new skill, writing a book etc.\n- Grow as an AI engineer/data scientist - Read, Write something	2026-05-16 18:04:24.555	2026-05-16 18:04:24.555
cmp8ni7bs000z01mvxmqqso8a	cmk5w4rm700011yo2ey83qv4z	Upbring Nandu	- Help him find his path\n- Spend time with him\n- Financial education\n- Inspire 	2026-05-16 17:59:38.392	2026-05-29 08:10:12.405
\.


--
-- Data for Name: MonthlyGoal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."MonthlyGoal" (id, "goalId", title, month, "monthDate", target, unit, "currentProgress", status, remarks, "createdAt", "updatedAt") FROM stdin;
91813f42-44df-4c41-98d1-823e4a0788ce	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - February	February 2026	2026-02-01 00:00:00	6.94	Kilogram	0.00	ON_TRACK	Monthly target for February	2026-01-09 08:44:32.923	2026-01-09 08:44:32.923
53acc8e4-b838-4c38-885d-a0c095e0a643	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - March	March 2026	2026-03-01 00:00:00	6.91	Kilogram	0.00	ON_TRACK	Monthly target for March	2026-01-09 08:44:32.926	2026-01-09 08:44:32.926
eda2d3c4-43d5-4734-a559-217ac05af174	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - April	April 2026	2026-04-01 00:00:00	6.88	Kilogram	0.00	ON_TRACK	Monthly target for April	2026-01-09 08:44:32.929	2026-01-09 08:44:32.929
07cf1c80-8b3b-4204-8c03-3e5789be8655	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - May	May 2026	2026-05-01 00:00:00	6.85	Kilogram	0.00	ON_TRACK	Monthly target for May	2026-01-09 08:44:32.931	2026-01-09 08:44:32.931
0d67f3f6-09b1-4dc5-86e8-74f6722fccb3	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - June	June 2026	2026-06-01 00:00:00	6.82	Kilogram	0.00	ON_TRACK	Monthly target for June	2026-01-09 08:44:32.935	2026-01-09 08:44:32.935
46fcb23b-1e2b-46ef-a4d2-d3cf40dcee1e	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - July	July 2026	2026-07-01 00:00:00	6.79	Kilogram	0.00	ON_TRACK	Monthly target for July	2026-01-09 08:44:32.936	2026-01-09 08:44:32.936
48cddb97-4578-4231-bffe-00c8f7965dc0	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - August	August 2026	2026-08-01 00:00:00	6.76	Kilogram	0.00	ON_TRACK	Monthly target for August	2026-01-09 08:44:32.938	2026-01-09 08:44:32.938
827e3c57-6afd-487e-95f4-4625e731dbf9	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - September	September 2026	2026-09-01 00:00:00	6.73	Kilogram	0.00	ON_TRACK	Monthly target for September	2026-01-09 08:44:32.94	2026-01-09 08:44:32.94
a65d237b-fa8a-4797-b311-5ceebbe03e5a	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - October	October 2026	2026-10-01 00:00:00	6.70	Kilogram	0.00	ON_TRACK	Monthly target for October	2026-01-09 08:44:32.942	2026-01-09 08:44:32.942
723870f0-2a75-406e-bcdd-f60e827902d8	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - November	November 2026	2026-11-01 00:00:00	6.67	Kilogram	0.00	ON_TRACK	Monthly target for November	2026-01-09 08:44:32.944	2026-01-09 08:44:32.944
8aa19061-417b-4bcf-9abb-50ce7c0c3509	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - December	December 2026	2026-12-01 00:00:00	6.64	Kilogram	0.00	ON_TRACK	Monthly target for December	2026-01-09 08:44:32.946	2026-01-09 08:44:32.946
4200bb49-a6be-442c-b588-26b9f72c4354	cmk6n5frx000201o2t9dcnzz9	Read Books - February	February 2026	2026-02-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 08:55:38.798	2026-01-09 08:55:38.798
bf32bd62-66f4-4b24-89cd-3059e6f081ab	cmk6n5frx000201o2t9dcnzz9	Read Books - March	March 2026	2026-03-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 08:55:38.8	2026-01-09 08:55:38.8
1ad67006-d525-4dbd-a2f1-4efdcd379adf	cmk6n5frx000201o2t9dcnzz9	Read Books - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 08:55:38.802	2026-01-09 08:55:38.802
14010895-0e68-4cbc-8225-51db608b62ed	cmk6n5frx000201o2t9dcnzz9	Read Books - May	May 2026	2026-05-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 08:55:38.807	2026-01-09 08:55:38.807
b8796ded-87f7-403d-89e7-2a8dcfb09a3a	cmk6n5frx000201o2t9dcnzz9	Read Books - June	June 2026	2026-06-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 08:55:38.809	2026-01-09 08:55:38.809
36936a61-7c58-450b-9e62-0a814e7f9c71	cmk6n5frx000201o2t9dcnzz9	Read Books - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 08:55:38.811	2026-01-09 08:55:38.811
0d35fe68-b709-46b7-a198-8f9725cf7f70	cmk6n5frx000201o2t9dcnzz9	Read Books - August	August 2026	2026-08-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 08:55:38.813	2026-01-09 08:55:38.813
b4e2d85d-e7af-4cde-9487-8f49332b779c	cmk6n5frx000201o2t9dcnzz9	Read Books - September	September 2026	2026-09-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 08:55:38.815	2026-01-09 08:55:38.815
57cd32d0-baff-431f-9ec1-275acb327e1f	cmk6n5frx000201o2t9dcnzz9	Read Books - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 08:55:38.816	2026-01-09 08:55:38.816
3effae8f-4768-49ce-826c-582546ed3b72	cmk6n5frx000201o2t9dcnzz9	Read Books - November	November 2026	2026-11-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 08:55:38.818	2026-01-09 08:55:38.818
5d47fb80-1c21-44d5-9aae-ac0e9b1f709f	cmk6n5frx000201o2t9dcnzz9	Read Books - December	December 2026	2026-12-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 08:55:38.82	2026-01-09 08:55:38.82
bcda4798-72a3-4800-a8de-0dab73a3da6e	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - January	January 2026	2026-01-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for January	2026-01-09 08:59:45.546	2026-01-09 08:59:45.546
3589e6ad-f95e-4826-8733-54bf6492f0f8	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - February	February 2026	2026-02-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 08:59:45.548	2026-01-09 08:59:45.548
98b3a2d4-3854-4878-afd8-62679650e5e7	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - March	March 2026	2026-03-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 08:59:45.55	2026-01-09 08:59:45.55
ee17530b-1984-4db2-872c-2195ff305d58	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - April	April 2026	2026-04-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 08:59:45.553	2026-01-09 08:59:45.553
43272c16-88ea-4da3-8a26-481af3f68b5c	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - May	May 2026	2026-05-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 08:59:45.556	2026-01-09 08:59:45.556
f1dab639-16b7-45f9-afec-733b064049d0	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - June	June 2026	2026-06-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 08:59:45.558	2026-01-09 08:59:45.558
05c3114b-1f01-482a-b645-47186df8557b	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - July	July 2026	2026-07-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 08:59:45.561	2026-01-09 08:59:45.561
46de7796-aa2b-477b-b265-563a9f41f959	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - August	August 2026	2026-08-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 08:59:45.564	2026-01-09 08:59:45.564
7efbba92-60cb-43a6-93d3-98358f64f68f	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - September	September 2026	2026-09-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 08:59:45.566	2026-01-09 08:59:45.566
1d03d3e9-e897-4690-a46d-4fbd12f82e1f	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - October	October 2026	2026-10-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 08:59:45.568	2026-01-09 08:59:45.568
97f43c85-d8bf-433f-893d-29afafa64ead	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - November	November 2026	2026-11-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 08:59:45.57	2026-01-09 08:59:45.57
9665ab92-5fe5-421d-aa3a-746f627aa867	cmk6naq65000801o2nx6zmh6c	Design and Stitch Skirt for Sanjana and Shreya - December	December 2026	2026-12-01 00:00:00	0.17	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 08:59:45.572	2026-01-09 08:59:45.572
2b55d09e-342c-4bc0-87d7-00958245261c	cmk6nf30c000a01o2667jhsif	Nandu Side Project - January	January 2026	2026-01-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for January	2026-01-09 09:03:08.807	2026-01-09 09:03:08.807
79d37328-f45b-4813-9f88-6313d74152a5	cmk6nf30c000a01o2667jhsif	Nandu Side Project - February	February 2026	2026-02-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:03:08.809	2026-01-09 09:03:08.809
73461a93-c4df-4f78-9df6-43c12c664a62	cmk6nf30c000a01o2667jhsif	Nandu Side Project - March	March 2026	2026-03-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:03:08.81	2026-01-09 09:03:08.81
04d454cf-1273-40c2-aee6-437ce9d98554	cmk6nf30c000a01o2667jhsif	Nandu Side Project - April	April 2026	2026-04-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:03:08.812	2026-01-09 09:03:08.812
30b6a4bb-9746-417b-8a71-432441be7ccb	cmk6nf30c000a01o2667jhsif	Nandu Side Project - May	May 2026	2026-05-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:03:08.814	2026-01-09 09:03:08.814
0a9cb52f-3fd6-4114-bfe1-4cf1e43c7404	cmk6nf30c000a01o2667jhsif	Nandu Side Project - June	June 2026	2026-06-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:03:08.816	2026-01-09 09:03:08.816
8ca3b668-a82c-4d6a-9ec7-2bd8199252da	cmk6nf30c000a01o2667jhsif	Nandu Side Project - July	July 2026	2026-07-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:03:08.817	2026-01-09 09:03:08.817
e083fdd7-f9d3-471b-8a4f-b438652133ec	cmk6nf30c000a01o2667jhsif	Nandu Side Project - August	August 2026	2026-08-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:03:08.819	2026-01-09 09:03:08.819
e261066c-b5f6-4c43-9ef9-68d7ebbcbbb7	cmk6nf30c000a01o2667jhsif	Nandu Side Project - September	September 2026	2026-09-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:03:08.821	2026-01-09 09:03:08.821
30c7b29d-bcdb-422e-a7fe-fdba8abfacf6	cmk6nf30c000a01o2667jhsif	Nandu Side Project - October	October 2026	2026-10-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:03:08.823	2026-01-09 09:03:08.823
4ab2fbb8-daab-4ebb-bc06-980acfc32e27	cmk6nf30c000a01o2667jhsif	Nandu Side Project - November	November 2026	2026-11-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:03:08.825	2026-01-09 09:03:08.825
5f49de9c-7bbb-4749-b886-58f4c38a71d0	cmk6nf30c000a01o2667jhsif	Nandu Side Project - December	December 2026	2026-12-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:03:08.826	2026-01-09 09:03:08.826
26f2d54b-3f16-498b-a553-1713f63db83b	cmk6nfpky000c01o2ckz3syvy	Trips - January	January 2026	2026-01-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for January	2026-01-09 09:03:38.063	2026-01-09 09:03:38.063
db73dac2-c25a-4521-9224-acd0abcc9d6b	cmk6nfpky000c01o2ckz3syvy	Trips - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:03:38.066	2026-01-09 09:03:38.066
3dcbd8f0-a580-479f-abb5-fda92babc975	cmk6nfpky000c01o2ckz3syvy	Trips - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:03:38.069	2026-01-09 09:03:38.069
4915bcb6-73d1-49b6-a813-f13a1b26b73e	cmk6nfpky000c01o2ckz3syvy	Trips - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:03:38.072	2026-01-09 09:03:38.072
b4ee0691-31eb-49cc-92b4-bdcf007f9355	cmk6nfpky000c01o2ckz3syvy	Trips - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:03:38.074	2026-01-09 09:03:38.074
d81935de-5ce6-4951-a147-1956eb118e6a	cmk6nfpky000c01o2ckz3syvy	Trips - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:03:38.076	2026-01-09 09:03:38.076
a5538a4b-8d21-43bf-aea2-d3015d6a617f	cmk6nfpky000c01o2ckz3syvy	Trips - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:03:38.077	2026-01-09 09:03:38.077
9307e06d-8d13-44ce-8e2a-2bcefb9eb1de	cmk6nfpky000c01o2ckz3syvy	Trips - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:03:38.079	2026-01-09 09:03:38.079
257fbf10-ed02-45aa-bc1a-69707a8bb3ba	cmk6nfpky000c01o2ckz3syvy	Trips - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:03:38.081	2026-01-09 09:03:38.081
b11a2f2b-d7c2-4bd7-9a2a-31f4488e1a21	cmk6nfpky000c01o2ckz3syvy	Trips - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:03:38.082	2026-01-09 09:03:38.082
cf57624a-958f-4057-aff3-01da8a2671dd	cmk6nfpky000c01o2ckz3syvy	Trips - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:03:38.084	2026-01-09 09:03:38.084
a0e3444e-18af-43b0-b03e-a86a7ce39f44	cmk6nfpky000c01o2ckz3syvy	Trips - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:03:38.086	2026-01-09 09:03:38.086
b2c08b80-6949-46ea-90bb-7cbc066b174d	cmk6ngqw7000e01o211l03h4y	Endurance Activities - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:04:26.421	2026-01-09 09:04:26.421
520a3b20-3b0f-4b4d-8721-b4566abcbd85	cmk6ngqw7000e01o211l03h4y	Endurance Activities - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:04:26.423	2026-01-09 09:04:26.423
5cd43f15-e1f2-446f-86fb-903d497a7e2e	cmk6ngqw7000e01o211l03h4y	Endurance Activities - April	April 2026	2026-04-01 00:00:00	2.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:04:26.425	2026-01-09 09:04:26.425
39f90b54-41c8-4fb0-bbf8-235dbcc1895d	cmk6ngqw7000e01o211l03h4y	Endurance Activities - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:04:26.426	2026-01-09 09:04:26.426
2a555013-d74b-4c0b-b51e-efb908ad6530	cmk6ngqw7000e01o211l03h4y	Endurance Activities - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:04:26.428	2026-01-09 09:04:26.428
d11a7fb9-0077-4043-a208-35dc77dbad62	cmk6ngqw7000e01o211l03h4y	Endurance Activities - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:04:26.43	2026-01-09 09:04:26.43
f628ca5d-2a7d-4c62-a3df-4f5962e73a2c	cmk6ngqw7000e01o211l03h4y	Endurance Activities - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:04:26.431	2026-01-09 09:04:26.431
2bf2b7f7-aec4-49a9-a84e-11bf1dfab808	cmk6ngqw7000e01o211l03h4y	Endurance Activities - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:04:26.433	2026-01-09 09:04:26.433
bddcce97-8041-4b55-87a4-29674f11bba2	cmk6ngqw7000e01o211l03h4y	Endurance Activities - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:04:26.435	2026-01-09 09:04:26.435
15c8d2e8-a1cd-4719-8fb3-ff54c4e66d35	cmk6ngqw7000e01o211l03h4y	Endurance Activities - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:04:26.437	2026-01-09 09:04:26.437
5dab70a4-82ab-4fec-ba10-fe74a539415e	cmk6ngqw7000e01o211l03h4y	Endurance Activities - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:04:26.439	2026-01-09 09:04:26.439
488b86c6-1650-46cb-9c1f-8c64de4ee9cd	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - January	January 2026	2026-01-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for January	2026-01-09 09:05:11.051	2026-01-09 09:05:11.051
5e9f9947-4320-46e6-99da-61d5b4236d1c	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:05:11.054	2026-01-09 09:05:11.054
a38f5e78-7416-40c4-b458-2bcc8ce4b0b8	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:05:11.057	2026-01-09 09:05:11.057
f20cc1a6-78d5-451c-aaeb-5c211b5bc673	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:05:11.06	2026-01-09 09:05:11.06
93f29caa-74f6-4dda-98a3-f6e2f7113688	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:05:11.062	2026-01-09 09:05:11.062
f223810a-58e8-47d9-9e7e-ceece3cd917e	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:05:11.064	2026-01-09 09:05:11.064
c2383eaa-7c9e-449c-a21d-0929b8650c3a	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:05:11.065	2026-01-09 09:05:11.065
906a6457-2f2e-4a68-80ea-3adf3bd318e4	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:05:11.067	2026-01-09 09:05:11.067
f2d9c5fe-de69-4bc8-a5c2-393fb1acec2f	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:05:11.071	2026-01-09 09:05:11.071
109f98de-a6c7-45c1-bdb7-e73e9501d49c	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:05:11.072	2026-01-09 09:05:11.072
9dcae2f2-2b58-4f12-8c0c-8ecd729c73e4	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:05:11.075	2026-01-09 09:05:11.075
929ab4b2-7241-424a-9db0-ae14270f5957	cmk6nhpbx000g01o2xww9cahq	Watch Movies in Theater with Nandu - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:05:11.076	2026-01-09 09:05:11.076
9ad0012c-a81f-45f4-b7c2-98501615730f	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - January	January 2026	2026-01-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for January	2026-01-09 09:06:01.859	2026-01-09 09:06:01.859
8419350a-1565-4a80-9ded-1a97fd67a3cb	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:06:01.862	2026-01-09 09:06:01.862
b6c63665-7ce9-4265-850e-77ac35ffbf28	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:06:01.864	2026-01-09 09:06:01.864
09b78cee-fffa-4d30-b38a-ebdf17c46af4	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:06:01.865	2026-01-09 09:06:01.865
44665486-321e-4e43-9e32-0c713e86bcc2	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:06:01.867	2026-01-09 09:06:01.867
788d9739-7748-4805-bac1-4e8c88fc962c	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:06:01.869	2026-01-09 09:06:01.869
eb9c943d-bdd2-4c1b-b861-c866d59764db	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - July	July 2026	2026-07-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:06:01.87	2026-01-09 09:06:01.87
a11bdca8-3bae-4952-8ab6-ddb0d48a5c17	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:06:01.872	2026-01-09 09:06:01.872
1101b551-0693-4372-9af9-26e287e84865	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:06:01.873	2026-01-09 09:06:01.873
70afb10d-afd2-418f-a568-e3e05e196b36	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - October	October 2026	2026-10-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:06:01.875	2026-01-09 09:06:01.875
15584ccf-3633-4936-8cb1-fff0d1cf2789	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:06:01.876	2026-01-09 09:06:01.876
fe080b97-d7a4-4545-972b-fa56b42771ec	cmk6nisj9000i01o2dk36j03b	Cooking - Learn 2 new dishes - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:06:01.878	2026-01-09 09:06:01.878
48a2a4a8-0441-4a0d-b934-c500c173f81e	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-09 09:06:49.251	2026-01-09 09:06:49.251
a01be053-49dc-4423-bcce-72f3eeda7b9b	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-09 09:06:49.253	2026-01-09 09:06:49.253
9cd7b8ab-ca39-485d-8eee-8ba51b124faf	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - April	April 2026	2026-04-01 00:00:00	2.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-09 09:06:49.254	2026-01-09 09:06:49.254
7e715f5c-3b22-4bc5-9d5a-a488515968ff	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-09 09:06:49.256	2026-01-09 09:06:49.256
bd46cc3c-517e-4366-918c-bd5c9c7cd2ce	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-09 09:06:49.258	2026-01-09 09:06:49.258
98f635bf-3c94-44e6-b7fc-ebb65c994d88	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-09 09:06:49.261	2026-01-09 09:06:49.261
ebdf26cf-b747-4a1e-b759-7ce28443afed	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-09 09:06:49.263	2026-01-09 09:06:49.263
5135f277-510c-4e71-8679-b1717755d3cb	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-09 09:06:49.265	2026-01-09 09:06:49.265
36f3b780-3a89-4207-9a62-b45cd369c4d2	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-09 09:06:49.266	2026-01-09 09:06:49.266
8dcc2ec8-a7e1-4fea-8928-563611daa772	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-09 09:06:49.268	2026-01-09 09:06:49.268
b1992ce0-dd23-4237-9178-cae233a39a15	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-09 09:06:49.269	2026-01-09 09:06:49.269
641ce6ae-b673-4f80-9c5d-276903243c6b	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - February	February 2026	2026-02-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for February	2026-01-12 05:39:37.288	2026-01-12 05:39:37.288
2b4d6a34-8f88-4169-8c78-8a3e4f3d6c82	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - March	March 2026	2026-03-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for March	2026-01-12 05:39:37.291	2026-01-12 05:39:37.291
fb0823bc-417a-48a7-9c7a-9fe82a984b1d	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - April	April 2026	2026-04-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for April	2026-01-12 05:39:37.293	2026-01-12 05:39:37.293
6ca12c87-1414-4bee-99f5-75110acb97fb	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - May	May 2026	2026-05-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for May	2026-01-12 05:39:37.295	2026-01-12 05:39:37.295
9986aea8-cdc9-463d-8287-4be4c74960aa	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - June	June 2026	2026-06-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for June	2026-01-12 05:39:37.297	2026-01-12 05:39:37.297
a3318033-b2d2-4b78-bed9-08453a94b0c2	cmk6njt3q000k01o2yndq4eyy	Nandu Learning to cook - 6 dishes  - January	January 2026	2026-01-01 00:00:00	2.00	Count	2.00	ON_TRACK	Monthly target for January	2026-01-09 09:06:49.249	2026-02-02 18:48:27.799
779a563b-ac0e-4271-8d9c-b4f4dbaec920	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - July	July 2026	2026-07-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for July	2026-01-12 05:39:37.299	2026-01-12 05:39:37.299
354fd47b-3eee-4fe3-b637-ae5aa15efd51	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - August	August 2026	2026-08-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for August	2026-01-12 05:39:37.304	2026-01-12 05:39:37.304
4724920f-358c-48df-8f5a-b0c997671d64	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - September	September 2026	2026-09-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for September	2026-01-12 05:39:37.305	2026-01-12 05:39:37.305
595b71cb-7e1c-47ab-97fe-0444b322930e	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - October	October 2026	2026-10-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for October	2026-01-12 05:39:37.307	2026-01-12 05:39:37.307
3c0ab52b-ba37-49a9-8055-18929ecc30cf	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - November	November 2026	2026-11-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for November	2026-01-12 05:39:37.309	2026-01-12 05:39:37.309
02714019-dc6a-443a-8f63-6b8f42ee959c	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - December	December 2026	2026-12-01 00:00:00	4.17	Count	0.00	ON_TRACK	Monthly target for December	2026-01-12 05:39:37.311	2026-01-12 05:39:37.311
ebe73061-8838-450b-a995-e558455f7ab1	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - March	March 2026	2026-03-01 00:00:00	5.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-15 06:48:15.639	2026-01-15 06:48:15.639
8efaa25d-bea1-43a4-8931-ca1bc53c37a9	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - April	April 2026	2026-04-01 00:00:00	5.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-15 06:48:15.659	2026-01-15 06:48:15.659
1ac40634-fb30-4efd-a3d7-06bde9ac4eca	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - May	May 2026	2026-05-01 00:00:00	6.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-15 06:48:15.679	2026-01-15 06:48:15.679
0ec223da-5f32-44bd-ab93-1593b1aef56d	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - June	June 2026	2026-06-01 00:00:00	7.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-15 06:48:15.7	2026-01-15 06:48:15.7
a6fc06ce-2384-46a8-9601-f7ece25b72c5	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - July	July 2026	2026-07-01 00:00:00	7.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-15 06:48:15.72	2026-01-15 06:48:15.72
f60746de-5e11-414c-b9a3-4f7701e1122c	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - August	August 2026	2026-08-01 00:00:00	8.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-15 06:48:15.741	2026-01-15 06:48:15.741
c869776a-2b5a-4bec-b975-cb0d316d3e4c	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - September	September 2026	2026-09-01 00:00:00	8.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-15 06:48:15.761	2026-01-15 06:48:15.761
5ebacdc9-3bc3-45a9-a9ec-89bb6610f263	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - October	October 2026	2026-10-01 00:00:00	9.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-15 06:48:15.781	2026-01-15 06:48:15.781
69ace886-7330-425c-aca0-3c1aa0b41e4c	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - November	November 2026	2026-11-01 00:00:00	9.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-15 06:48:15.802	2026-01-15 06:48:15.802
f02b82d2-8f30-4a70-b51f-076bba644c8f	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - December	December 2026	2026-12-01 00:00:00	10.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-15 06:48:15.822	2026-01-15 06:48:15.822
caec513f-6809-431d-950e-e3fc97c9d140	cmk6n8vfl000601o2zhkfw4s2	Swimming  - January	January 2026	2026-01-01 00:00:00	1.00	Time	0.00	ON_TRACK	Monthly target for January	2026-01-15 06:48:40.71	2026-01-15 06:48:40.71
621ecb70-302c-4c4b-a4f2-7fa3e1d0743e	cmk6n8vfl000601o2zhkfw4s2	Swimming  - February	February 2026	2026-02-01 00:00:00	2.00	Time	0.00	ON_TRACK	Monthly target for February	2026-01-15 06:48:40.731	2026-01-15 06:48:40.731
af192426-12f0-4b11-ab6c-12b03c30b005	cmk6n8vfl000601o2zhkfw4s2	Swimming  - March	March 2026	2026-03-01 00:00:00	3.00	Time	0.00	ON_TRACK	Monthly target for March	2026-01-15 06:48:40.75	2026-01-15 06:48:40.75
603f9072-b0dd-4649-808f-e08c6bd1ecfe	cmk6n8vfl000601o2zhkfw4s2	Swimming  - April	April 2026	2026-04-01 00:00:00	3.00	Time	0.00	ON_TRACK	Monthly target for April	2026-01-15 06:48:40.772	2026-01-15 06:48:40.772
d93ede98-8bbb-4848-a664-898aba63c86d	cmk6n8vfl000601o2zhkfw4s2	Swimming  - May	May 2026	2026-05-01 00:00:00	4.00	Time	0.00	ON_TRACK	Monthly target for May	2026-01-15 06:48:40.792	2026-01-15 06:48:40.792
36d8b01e-42d4-474d-86bd-f5982264a902	cmk6n8vfl000601o2zhkfw4s2	Swimming  - June	June 2026	2026-06-01 00:00:00	5.00	Time	0.00	ON_TRACK	Monthly target for June	2026-01-15 06:48:40.812	2026-01-15 06:48:40.812
45a7f68f-8537-41a4-8676-05edb1ed25af	cmk6n8vfl000601o2zhkfw4s2	Swimming  - July	July 2026	2026-07-01 00:00:00	6.00	Time	0.00	ON_TRACK	Monthly target for July	2026-01-15 06:48:40.831	2026-01-15 06:48:40.831
baaa9825-9d4e-469e-ad36-d0d3b892eddb	cmk6n8vfl000601o2zhkfw4s2	Swimming  - August	August 2026	2026-08-01 00:00:00	7.00	Time	0.00	ON_TRACK	Monthly target for August	2026-01-15 06:48:40.851	2026-01-15 06:48:40.851
fc4477eb-5367-4b37-a3f5-df66befb6a68	cmk6n8vfl000601o2zhkfw4s2	Swimming  - September	September 2026	2026-09-01 00:00:00	8.00	Time	0.00	ON_TRACK	Monthly target for September	2026-01-15 06:48:40.87	2026-01-15 06:48:40.87
bb4c8475-8884-48e4-8598-7e1cb9b8e388	cmk6n8vfl000601o2zhkfw4s2	Swimming  - October	October 2026	2026-10-01 00:00:00	8.00	Time	0.00	ON_TRACK	Monthly target for October	2026-01-15 06:48:40.89	2026-01-15 06:48:40.89
fa0b9520-77ad-44e6-af1f-a920e512bf20	cmk6n8vfl000601o2zhkfw4s2	Swimming  - November	November 2026	2026-11-01 00:00:00	9.00	Time	0.00	ON_TRACK	Monthly target for November	2026-01-15 06:48:40.909	2026-01-15 06:48:40.909
52fc2f22-7811-4df6-9be0-521188cacf5d	cmk6n8vfl000601o2zhkfw4s2	Swimming  - December	December 2026	2026-12-01 00:00:00	10.00	Time	0.00	ON_TRACK	Monthly target for December	2026-01-15 06:48:40.929	2026-01-15 06:48:40.929
118533c8-888b-406e-ac0d-b30968d3e82e	cmkx1f49d000301o4t8em9xch	Endurance Activities - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-27 20:17:05.674	2026-01-27 20:17:05.674
508bb39c-8587-4dc1-8d40-cc6742ba3062	cmkx1f49d000301o4t8em9xch	Endurance Activities - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-27 20:17:05.679	2026-01-27 20:17:05.679
b36a98d0-12de-4bf0-88d0-a4cea30201cf	cmkx1f49d000301o4t8em9xch	Endurance Activities - April	April 2026	2026-04-01 00:00:00	2.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-27 20:17:05.684	2026-01-27 20:17:05.684
e20d9289-d9ac-4d65-b749-0a7f5f31d170	cmkx1f49d000301o4t8em9xch	Endurance Activities - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-27 20:17:05.688	2026-01-27 20:17:05.688
7a742da6-24f9-4118-8d66-e3412beffafe	cmkx1f49d000301o4t8em9xch	Endurance Activities - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-27 20:17:05.692	2026-01-27 20:17:05.692
bdc7f892-3b71-4104-aa12-1941647047f3	cmkx1f49d000301o4t8em9xch	Endurance Activities - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-27 20:17:05.698	2026-01-27 20:17:05.698
f23897f3-559c-4399-b9cf-f1d224c677f4	cmkx1f49d000301o4t8em9xch	Endurance Activities - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-27 20:17:05.7	2026-01-27 20:17:05.7
221c30e7-f9f4-42ff-9202-f20d71517265	cmkx1f49d000301o4t8em9xch	Endurance Activities - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-27 20:17:05.703	2026-01-27 20:17:05.703
e111aa9b-a722-4116-ac39-d3bc343c4b93	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - January	January 2026	2026-01-01 00:00:00	4.00	Count	4.00	ON_TRACK	Monthly target for January	2026-01-15 06:48:15.593	2026-02-02 18:49:07.985
68eb47af-7091-4d49-9432-55254f8dd2c3	cmk6n74nk000401o2bfi71pl3	Yoga do surya Namaskar  - February	February 2026	2026-02-01 00:00:00	4.00	Count	4.00	ON_TRACK	Monthly target for February	2026-01-15 06:48:15.617	2026-02-08 08:39:08.296
53f8dc7e-d5ab-47e9-8014-ef3412d383e8	cmkx1f49d000301o4t8em9xch	Endurance Activities - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-27 20:17:05.706	2026-01-27 20:17:05.706
85a0e8b0-2c5b-4f92-a52a-0240b22cf493	cmkx1f49d000301o4t8em9xch	Endurance Activities - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-27 20:17:05.71	2026-01-27 20:17:05.71
f630ba4f-ef0c-48c4-9d56-30bf481e2890	cmkx1f49d000301o4t8em9xch	Endurance Activities - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-27 20:17:05.713	2026-01-27 20:17:05.713
af773f05-b736-4a51-96a9-255bb86ba733	cmkx1g061000501o49zws73w3	Work on RC Car - January	January 2026	2026-01-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for January	2026-01-27 20:17:46.994	2026-01-27 20:17:46.994
db97d0d3-c379-4930-87da-c8d2c1b9ff85	cmkx1g061000501o49zws73w3	Work on RC Car - February	February 2026	2026-02-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for February	2026-01-27 20:17:47	2026-01-27 20:17:47
4e5f9e52-6a56-4c00-ba38-e253ab733199	cmkx1g061000501o49zws73w3	Work on RC Car - March	March 2026	2026-03-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for March	2026-01-27 20:17:47.002	2026-01-27 20:17:47.002
5018e318-e5ff-44b0-9ddd-428494e33c1d	cmkx1g061000501o49zws73w3	Work on RC Car - April	April 2026	2026-04-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for April	2026-01-27 20:17:47.004	2026-01-27 20:17:47.004
fa667b92-00e3-468f-aaa8-07df9f6489e1	cmkx1g061000501o49zws73w3	Work on RC Car - May	May 2026	2026-05-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for May	2026-01-27 20:17:47.006	2026-01-27 20:17:47.006
0a7ef296-71a2-4230-8cfd-1b5d9ebefc3d	cmkx1g061000501o49zws73w3	Work on RC Car - June	June 2026	2026-06-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for June	2026-01-27 20:17:47.008	2026-01-27 20:17:47.008
19b3cda4-7853-4705-9bee-f6b3e60749b5	cmkx1g061000501o49zws73w3	Work on RC Car - July	July 2026	2026-07-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for July	2026-01-27 20:17:47.01	2026-01-27 20:17:47.01
66d478c9-614e-432e-a108-09fe11f5edb2	cmkx1g061000501o49zws73w3	Work on RC Car - August	August 2026	2026-08-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for August	2026-01-27 20:17:47.012	2026-01-27 20:17:47.012
ca319073-71fe-4e19-be11-8f6d512fa69d	cmkx1g061000501o49zws73w3	Work on RC Car - September	September 2026	2026-09-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for September	2026-01-27 20:17:47.014	2026-01-27 20:17:47.014
d3ea8b6b-bc52-460b-a418-5e932d362e85	cmkx1g061000501o49zws73w3	Work on RC Car - October	October 2026	2026-10-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for October	2026-01-27 20:17:47.016	2026-01-27 20:17:47.016
199268ce-2524-4f65-85dd-243f2595608c	cmkx1g061000501o49zws73w3	Work on RC Car - November	November 2026	2026-11-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for November	2026-01-27 20:17:47.019	2026-01-27 20:17:47.019
fb89632a-ce91-48df-9af8-c8f81225b9fa	cmkx1g061000501o49zws73w3	Work on RC Car - December	December 2026	2026-12-01 00:00:00	0.08	Count	0.00	ON_TRACK	Monthly target for December	2026-01-27 20:17:47.021	2026-01-27 20:17:47.021
3ef3e7d2-9012-4b8b-98f8-07c63b021cdb	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - January	January 2026	2026-01-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for January	2026-01-27 20:18:51.183	2026-01-27 20:18:51.183
34724721-c3b0-4d95-85c8-a468a80fe0dc	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-27 20:18:51.187	2026-01-27 20:18:51.187
6388e91a-0de1-4a77-a963-9263f4f41362	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-27 20:18:51.189	2026-01-27 20:18:51.189
b63d114d-ac75-4155-bfaf-fd5c56e3c793	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-27 20:18:51.192	2026-01-27 20:18:51.192
01a83d00-84d7-4b60-a193-0216cc3e938e	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-27 20:18:51.194	2026-01-27 20:18:51.194
b6dd9564-2f58-4c09-8343-f05ebbd1a09d	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-27 20:18:51.197	2026-01-27 20:18:51.197
10375bfb-11dc-4155-8dd9-b9f468ca56d5	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-27 20:18:51.199	2026-01-27 20:18:51.199
f4b61b27-96dd-4ed0-9fef-026ce63f59e4	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-27 20:18:51.201	2026-01-27 20:18:51.201
d940d1d6-ef92-47fd-aa85-64f447c953c0	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-27 20:18:51.203	2026-01-27 20:18:51.203
4ac4e0db-9f13-4c5d-a6e6-6d5c595b0127	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-27 20:18:51.204	2026-01-27 20:18:51.204
c349e780-e4be-4350-9d5e-0cbeff40e6f1	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-27 20:18:51.206	2026-01-27 20:18:51.206
5d292f36-03e9-4b84-904e-5728cb15e158	cmkx1hdp9000701o46l15f3dy	Watch Movies with parents - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-27 20:18:51.208	2026-01-27 20:18:51.208
9dddc0a0-e04a-44f4-9682-67944b3dd0ca	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-27 20:22:15.156	2026-01-27 20:22:15.156
7cff1cc6-037b-405f-8049-23944940969c	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-27 20:22:15.163	2026-01-27 20:22:15.163
2bab3693-0b52-4fd5-8b4a-f00909695c64	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - April	April 2026	2026-04-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-27 20:22:15.167	2026-01-27 20:22:15.167
73c2dae1-6b87-447e-8f09-b3f7ae5e1704	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-27 20:22:15.17	2026-01-27 20:22:15.17
42255927-4aed-4f87-ba54-63f7a2385827	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-27 20:22:15.173	2026-01-27 20:22:15.173
2faaf3e7-ac9f-40b7-8000-7ff8711afebc	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-27 20:22:15.176	2026-01-27 20:22:15.176
e3b89e44-6cd0-4ca9-8431-b4a8ac9d92b7	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-27 20:22:15.179	2026-01-27 20:22:15.179
fa2cce47-d87a-4b42-964a-1653dc9f26bc	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-27 20:22:15.183	2026-01-27 20:22:15.183
65ffdd3b-6eeb-4c3f-b3ed-cf2b307bfb8c	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-27 20:22:15.186	2026-01-27 20:22:15.186
67e25994-f1c3-4ebd-9ceb-835a15925635	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-27 20:22:15.188	2026-01-27 20:22:15.188
3204a75f-0efc-4b3c-8331-0ec2f7a45e07	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-27 20:22:15.191	2026-01-27 20:22:15.191
6b91bc77-129d-4c58-aca5-b69675fbea05	cmkx1lr34000c01o4bt8pcxxn	Reach 2 levels in Kumon - January	January 2026	2026-01-01 00:00:00	1.00	Count	1.00	ON_TRACK	Monthly target for January	2026-01-27 20:22:15.153	2026-01-27 20:44:48.029
6a035001-a6c1-4d9f-b635-e7f14fd73081	cmkx2hvea000o01o4hjabpqpo	Read books - February	February 2026	2026-02-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for February	2026-01-27 20:47:13.733	2026-01-27 20:47:13.733
3b2a026d-b22a-4e8e-98eb-d590fe5d221e	cmkx2hvea000o01o4hjabpqpo	Read books - March	March 2026	2026-03-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for March	2026-01-27 20:47:13.736	2026-01-27 20:47:13.736
19c6ccdc-8458-49a9-9952-3966f8571d15	cmkx2hvea000o01o4hjabpqpo	Read books - April	April 2026	2026-04-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for April	2026-01-27 20:47:13.74	2026-01-27 20:47:13.74
1b8db8d3-0b06-497c-a533-77613ded7415	cmkx2hvea000o01o4hjabpqpo	Read books - May	May 2026	2026-05-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for May	2026-01-27 20:47:13.744	2026-01-27 20:47:13.744
2d38915c-a0cb-4a40-868b-1e895e49337b	cmkx2hvea000o01o4hjabpqpo	Read books - June	June 2026	2026-06-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for June	2026-01-27 20:47:13.747	2026-01-27 20:47:13.747
cd3a8980-4e0f-4fc0-bb4f-b68213eeb39c	cmkx2hvea000o01o4hjabpqpo	Read books - July	July 2026	2026-07-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for July	2026-01-27 20:47:13.75	2026-01-27 20:47:13.75
ae20210a-5494-4932-ade1-6c58e3433d98	cmkx2hvea000o01o4hjabpqpo	Read books - August	August 2026	2026-08-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for August	2026-01-27 20:47:13.754	2026-01-27 20:47:13.754
f26a4062-7002-459a-b38d-4c9852b696fb	cmkx2hvea000o01o4hjabpqpo	Read books - September	September 2026	2026-09-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for September	2026-01-27 20:47:13.757	2026-01-27 20:47:13.757
fc7298a6-43c3-4eca-b8c2-2e3e9c3bc512	cmkx2hvea000o01o4hjabpqpo	Read books - October	October 2026	2026-10-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for October	2026-01-27 20:47:13.76	2026-01-27 20:47:13.76
87087c1f-e30e-442c-8d36-a3ce6ff0d7a2	cmkx2hvea000o01o4hjabpqpo	Read books - November	November 2026	2026-11-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for November	2026-01-27 20:47:13.764	2026-01-27 20:47:13.764
57269d15-b83f-45d7-a260-a1b0f34aa001	cmkx2hvea000o01o4hjabpqpo	Read books - December	December 2026	2026-12-01 00:00:00	1.08	Count	0.00	ON_TRACK	Monthly target for December	2026-01-27 20:47:13.767	2026-01-27 20:47:13.767
99effd63-c6c0-4eec-a897-6ebf7ecca912	cmkx2hvea000o01o4hjabpqpo	Read books - January	January 2026	2026-01-01 00:00:00	1.08	Count	2.00	ON_TRACK	Monthly target for January	2026-01-27 20:47:13.729	2026-01-27 20:47:57.036
5f464c06-ce97-4925-9c5b-f44edf91d5fb	cmkx1f49d000301o4t8em9xch	Endurance Activities - January	January 2026	2026-01-01 00:00:00	2.00	Count	1.00	ON_TRACK	Monthly target for January	2026-01-27 20:17:05.667	2026-01-27 20:51:31.664
676eb653-3621-4774-a092-14c0eac3613b	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - February	February 2026	2026-02-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for February	2026-01-28 07:08:42.91	2026-01-28 07:08:42.91
fb1db8d3-0304-4123-b718-8b3622abd4c8	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - March	March 2026	2026-03-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for March	2026-01-28 07:08:42.912	2026-01-28 07:08:42.912
5ffa5cce-2b1e-46d6-89c3-7fdb3fc3829e	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - April	April 2026	2026-04-01 00:00:00	2.00	Count	0.00	ON_TRACK	Monthly target for April	2026-01-28 07:08:42.914	2026-01-28 07:08:42.914
be958997-8e8a-492a-b16b-d6974f0bbc4d	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - May	May 2026	2026-05-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for May	2026-01-28 07:08:42.916	2026-01-28 07:08:42.916
10674fe6-8f52-4415-b1fc-335874da6047	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - June	June 2026	2026-06-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for June	2026-01-28 07:08:42.918	2026-01-28 07:08:42.918
ba964801-87e2-4f88-baa8-09ad42737de5	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - July	July 2026	2026-07-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for July	2026-01-28 07:08:42.92	2026-01-28 07:08:42.92
4d32e2c5-989c-460e-b626-0c161b056399	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - August	August 2026	2026-08-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for August	2026-01-28 07:08:42.922	2026-01-28 07:08:42.922
21440920-5552-4e9e-a48f-38766b36326a	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - September	September 2026	2026-09-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for September	2026-01-28 07:08:42.924	2026-01-28 07:08:42.924
69d4518b-8620-44b5-a74a-fc6b23c51f4e	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - October	October 2026	2026-10-01 00:00:00	1.00	Count	0.00	ON_TRACK	Monthly target for October	2026-01-28 07:08:42.927	2026-01-28 07:08:42.927
a9a2b981-2a31-4ad1-a6db-a53356149446	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - November	November 2026	2026-11-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for November	2026-01-28 07:08:42.929	2026-01-28 07:08:42.929
13e196cd-f42d-415a-b137-e993b3bfa8ca	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - December	December 2026	2026-12-01 00:00:00	0.00	Count	0.00	ON_TRACK	Monthly target for December	2026-01-28 07:08:42.931	2026-01-28 07:08:42.931
4b1fd87b-4f43-414a-85ca-85b335496505	cmkaqgwiy000o01mvosdv8m3i	Complete 50 issues on Gritio Project - January	January 2026	2026-01-01 00:00:00	4.17	Count	10.00	ON_TRACK	Monthly target for January	2026-01-12 05:39:37.277	2026-02-02 18:48:17.845
1f34f8b1-c595-428c-bd05-88e86ec8eb26	cmk6ngqw7000e01o211l03h4y	Endurance Activities - January	January 2026	2026-01-01 00:00:00	2.00	Count	1.00	ON_TRACK	Monthly target for January	2026-01-09 09:04:26.419	2026-02-02 18:48:45.104
d0a3f307-9188-4d33-9306-970dd48f74fc	cmk6n5frx000201o2t9dcnzz9	Read Books - January	January 2026	2026-01-01 00:00:00	1.00	Count	0.50	ON_TRACK	Monthly target for January	2026-01-09 08:55:38.795	2026-02-02 18:49:15.089
c5f98451-b675-43e3-8eab-be95ff4b0ed1	cmk6mr5z8000001o2wyiff16g	Maintain HBA1C - January	January 2026	2026-01-01 00:00:00	6.97	Kilogram	6.50	ON_TRACK	Monthly target for January	2026-01-09 08:44:32.917	2026-02-02 18:49:41.88
3eea82e6-df08-48fe-8188-f1c70f85c5f7	cmkxop3wo006k01o4x82oaqzi	Learn Cooking - 6 dishes - January	January 2026	2026-01-01 00:00:00	2.00	Count	2.00	ON_TRACK	Monthly target for January	2026-01-28 07:08:42.907	2026-02-08 07:14:59.179
376641e7-28b3-4011-9ea8-ae6ed501ed7c	cmpjlnt4j000901mth0vw3by4	Reach Target weight - June	June 2026	2026-06-01 00:00:00	92.50	Kilogram	0.00	ON_TRACK	Monthly target for June	2026-05-24 09:53:28.669	2026-05-24 09:53:28.669
c93bb46c-34bd-487d-a25c-12ec50da61c6	cmpjlnt4j000901mth0vw3by4	Reach Target weight - July	July 2026	2026-07-01 00:00:00	92.50	Kilogram	0.00	ON_TRACK	Monthly target for July	2026-05-24 09:53:28.674	2026-05-24 09:53:28.674
808f7eb8-0f3b-415e-9305-ae205496a15e	cmpjlnt4j000901mth0vw3by4	Reach Target weight - August	August 2026	2026-08-01 00:00:00	91.50	Kilogram	0.00	ON_TRACK	Monthly target for August	2026-05-24 09:53:28.678	2026-05-24 09:53:28.678
c7d238b7-fec8-4845-8aca-7a747d737155	cmpjlnt4j000901mth0vw3by4	Reach Target weight - September	September 2026	2026-09-01 00:00:00	91.50	Kilogram	0.00	ON_TRACK	Monthly target for September	2026-05-24 09:53:28.681	2026-05-24 09:53:28.681
ddf2a61b-390c-4cbc-9dac-6fa59c1f0520	cmpjlnt4j000901mth0vw3by4	Reach Target weight - October	October 2026	2026-10-01 00:00:00	91.50	Kilogram	0.00	ON_TRACK	Monthly target for October	2026-05-24 09:53:28.684	2026-05-24 09:53:28.684
30ffa572-afbc-454d-b25a-ec777642bae8	cmpjlnt4j000901mth0vw3by4	Reach Target weight - November	November 2026	2026-11-01 00:00:00	90.50	Kilogram	0.00	ON_TRACK	Monthly target for November	2026-05-24 09:53:28.688	2026-05-24 09:53:28.688
d739f791-8748-4f94-985a-02e6e0990174	cmpjlnt4j000901mth0vw3by4	Reach Target weight - December	December 2026	2026-12-01 00:00:00	90.50	Kilogram	0.00	ON_TRACK	Monthly target for December	2026-05-24 09:53:28.692	2026-05-24 09:53:28.692
ed04c368-32f1-4654-8b41-bb6d0f5c2b78	cmpjlnt4j000901mth0vw3by4	Reach Target weight - January	January 2027	2027-01-01 00:00:00	90.50	Kilogram	0.00	ON_TRACK	Monthly target for January	2026-05-24 09:53:28.695	2026-05-24 09:53:28.695
33b8661a-ae24-43f3-ab88-f5e97cb60b0b	cmpjlnt4j000901mth0vw3by4	Reach Target weight - February	February 2027	2027-02-01 00:00:00	89.50	Kilogram	0.00	ON_TRACK	Monthly target for February	2026-05-24 09:53:28.699	2026-05-24 09:53:28.699
b020d727-520b-4958-b1f4-8825f7b40163	cmpjlnt4j000901mth0vw3by4	Reach Target weight - March	March 2027	2027-03-01 00:00:00	89.50	Kilogram	0.00	ON_TRACK	Monthly target for March	2026-05-24 09:53:28.702	2026-05-24 09:53:28.702
ea3b0ab5-06a4-4cd2-9e29-8777bf9ce66c	cmpjlnt4j000901mth0vw3by4	Reach Target weight - April	April 2027	2027-04-01 00:00:00	89.50	Kilogram	0.00	ON_TRACK	Monthly target for April	2026-05-24 09:53:28.704	2026-05-24 09:53:28.704
c6570cee-0a58-450b-a72a-e95e13cbe765	cmpjlnt4j000901mth0vw3by4	Reach Target weight - May	May 2026	2026-05-01 00:00:00	92.50	Kilogram	0.00	ON_TRACK	Monthly target for May	2026-05-24 09:53:28.657	2026-05-24 09:56:49.587
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, "goalId", title, type, frequency, target, unit, "timesPerWeek", "lastUpdated", "createdAt", "updatedAt", months) FROM stdin;
cmk6nmx2s000o01o2qde404ti	cmk6n5frx000201o2t9dcnzz9	Read Books	TIME	DAILY	20	mins	\N	2026-01-09 09:09:14.354	2026-01-09 09:09:14.354	2026-01-09 09:09:14.354	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nndie000p01o2a9piajm2	cmk6n74nk000401o2bfi71pl3	Do Yoga	NUMBER	WEEKLY	1	times	3	2026-01-09 09:09:35.653	2026-01-09 09:09:35.653	2026-01-09 09:09:35.653	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nq86u000u01o26zy94ga2	cmk6nfpky000c01o2ckz3syvy	Trip Research	TIME	WEEKLY	30	mins	1	2026-01-09 09:11:48.724	2026-01-09 09:11:48.724	2026-01-09 09:11:48.724	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nqk52000v01o2fu6kdg0y	cmk6ngqw7000e01o211l03h4y	Do the Endurance Activity	NUMBER	WEEKLY	1	times	1	2026-01-09 09:12:04.213	2026-01-09 09:12:04.213	2026-01-09 09:12:04.213	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nr4xu000w01o23ve0pqm7	cmk6njt3q000k01o2yndq4eyy	Cook with Nandu	NUMBER	WEEKLY	1	times	1	2026-01-09 09:12:31.169	2026-01-09 09:12:31.169	2026-01-09 09:12:31.169	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nm6vh000n01o25qcty34t	cmk6mr5z8000001o2wyiff16g	Meditation 	TIME	DAILY	15	mins	\N	2026-01-09 09:08:40.395	2026-01-09 09:08:40.395	2026-01-15 20:53:21.166	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9yleh002f01oggvfgu8ev	cmpw9glbx002301ogb4r6hc1y	Build Session (Cars/LEGO)	NUMBER	WEEKLY	1	session	1	2026-06-02 06:46:56.725	2026-06-02 06:46:56.725	2026-06-02 06:46:56.725	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ylel002g01ogkfzybp70	cmpw9glbx002301ogb4r6hc1y	Confidence Activity	NUMBER	WEEKLY	1	activity	1	2026-06-02 06:46:56.731	2026-06-02 06:46:56.731	2026-06-02 06:46:56.731	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nprft000t01o2kfflcnsd	cmk6nf30c000a01o2667jhsif	Work on Nandu Side Project	TIME	WEEKLY	60	Hour	1	2026-01-09 09:11:27.016	2026-01-09 09:11:27.016	2026-01-16 06:44:29.388	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ylfn002h01og4tj3pgut	cmpw9he3m002501ogw0fuvkui	Trip Log	NUMBER	WEEKLY	1	trip	1	2026-06-02 06:46:56.769	2026-06-02 06:46:56.769	2026-06-02 06:46:56.769	{0,1,2,3,4,5,6,7,8,9,10,11}
cmkaqhje9000q01mv9j33hwyn	cmkaqgwiy000o01mvosdv8m3i	Work on Gritio 	TIME	DAILY	60	hour	\N	2026-01-12 05:40:06.896	2026-01-12 05:40:06.896	2026-01-16 07:20:07.923	{0,1,2,3,4,5,6,7,8,9,10,11}
cmk6nlbvm000m01o2uqscgeb0	cmk6mr5z8000001o2wyiff16g	Walking 	TIME	WEEKLY	30	mins	4	2026-01-09 09:08:00.225	2026-01-09 09:08:00.225	2026-01-16 07:20:26.81	{0,1,2,3,4,5,6,7,8,9,10,11}
cmkjj2bel000001o97vhfn8ic	cmk6n8vfl000601o2zhkfw4s2	Swimming Lessons	NUMBER	WEEKLY	1	times	1	2026-01-18 09:22:14.968	2026-01-18 09:22:14.968	2026-01-18 09:22:14.968	{4,5,6,7,8,9,10,11}
cmkjj31pn000101o93jp14d7g	cmk6naq65000801o2nx6zmh6c	Sewing Lessons	NUMBER	DAILY	1	times	\N	2026-01-18 09:22:49.066	2026-01-18 09:22:49.066	2026-01-18 09:22:49.066	{1,2}
cmkxos9yo006w01o4bxya497z	cmkxop3wo006k01o4x82oaqzi	Cooking	NUMBER	WEEKLY	1	times	1	2026-01-28 07:11:10.703	2026-01-28 07:11:10.703	2026-01-28 07:11:10.703	{0,1,2,3,4,5,6,7,8,9,10,11}
cmkxosj7y006x01o4khn7pz54	cmkx2hvea000o01o4hjabpqpo	Reading books	NUMBER	WEEKLY	1	times	5	2026-01-28 07:11:22.701	2026-01-28 07:11:22.701	2026-01-28 07:11:22.701	{0,1,2,3,4,5,6,7,8,9,10,11}
cmkxoxl5z007v01o4hw4mx556	cmkx1g061000501o49zws73w3	Work on RC Car	NUMBER	WEEKLY	1	times	4	2026-01-28 07:15:18.502	2026-01-28 07:15:18.502	2026-01-28 07:15:18.502	{0,1,2,3,4,5,6,7,8,9,10,11}
cmkx1n0fn000e01o4nxfiyym9	cmkx1lr34000c01o4bt8pcxxn	Work on Kumon English	NUMBER	DAILY	1	times	\N	2026-01-27 20:23:13.905	2026-01-27 20:23:13.905	2026-02-08 07:15:46.521	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpjlqj3d000b01mtxz743ps7	cmpjlnt4j000901mth0vw3by4	Daily Steps	STEPS	DAILY	10000	steps	\N	2026-05-24 09:55:35.592	2026-05-24 09:55:35.592	2026-06-02 06:44:47.159	{4,5,6,7,8,9,10,11}
cmpw9xts2002701og1ytm3k4f	cmpjlnt4j000901mth0vw3by4	Gym Session	NUMBER	WEEKLY	4	sessions	4	2026-06-02 06:46:20.928	2026-06-02 06:46:20.928	2026-06-02 06:46:20.928	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9yjjj002801ogjea95628	cmpjlnt4j000901mth0vw3by4	Mindful Eating	NUMBER	DAILY	1	check	\N	2026-06-02 06:46:54.317	2026-06-02 06:46:54.317	2026-06-02 06:46:54.317	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9yjux002901og4nj3yumt	cmpw9cvse001v01og65qhgq3i	Journal Entry	NUMBER	DAILY	1	entry	\N	2026-06-02 06:46:54.727	2026-06-02 06:46:54.727	2026-06-02 06:46:54.727	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9yjzh002a01ognldea1y5	cmpw9cvse001v01og65qhgq3i	Screenplay Writing	TIME	DAILY	15	mins	\N	2026-06-02 06:46:54.89	2026-06-02 06:46:54.89	2026-06-02 06:46:54.89	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ykmp002b01og9905grcy	cmpw9eati001x01ogaopmwvs1	Evening Reading	TIME	DAILY	30	mins	\N	2026-06-02 06:46:55.727	2026-06-02 06:46:55.727	2026-06-02 06:46:55.727	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ykn5002c01og9944uxe8	cmpw9f44d001z01ogtf61x27m	Deep Work Session	TIME	DAILY	90	mins	\N	2026-06-02 06:46:55.743	2026-06-02 06:46:55.743	2026-06-02 06:46:55.743	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ykrc002d01oglfadcmt5	cmpw9fvg4002101ogqmlz6omv	Finance Review	TIME	WEEKLY	60	mins	1	2026-06-02 06:46:55.894	2026-06-02 06:46:55.894	2026-06-02 06:46:55.894	{0,1,2,3,4,5,6,7,8,9,10,11}
cmpw9ykre002e01og3ckv4976	cmpw9glbx002301ogb4r6hc1y	Finance Lesson with Nandu	NUMBER	WEEKLY	1	session	1	2026-06-02 06:46:55.896	2026-06-02 06:46:55.896	2026-06-02 06:46:55.896	{0,1,2,3,4,5,6,7,8,9,10,11}
\.


--
-- Data for Name: TaskCompletion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TaskCompletion" (id, "taskId", date, value, completed, "createdAt", "updatedAt") FROM stdin;
cmkgihigj000001pd71esrdin	cmk6nmx2s000o01o2qde404ti	2026-01-15 00:00:00	20.00	t	2026-01-16 06:42:45.811	2026-01-16 06:42:48.476
cmk6nrp75001301o28liojf2q	cmk6nmx2s000o01o2qde404ti	2026-01-08 00:00:00	20.00	t	2026-01-09 09:12:57.425	2026-01-09 09:12:57.425
cmk6ofou2001501o2i4vi3pqx	cmk6nndie000p01o2a9piajm2	2026-01-07 00:00:00	1.00	t	2026-01-09 09:31:36.698	2026-01-09 09:31:36.698
cmk6ofp5q001701o29xj4ok7e	cmk6nndie000p01o2a9piajm2	2026-01-06 00:00:00	1.00	t	2026-01-09 09:31:37.118	2026-01-09 09:31:37.118
cmk7w50x7001901o24z7uavs7	cmk6nm6vh000n01o25qcty34t	2026-01-09 00:00:00	15.00	t	2026-01-10 05:55:02.251	2026-01-10 05:55:09.32
cmk7w5iz1001f01o22d0a2edz	cmk6nmx2s000o01o2qde404ti	2026-01-07 00:00:00	20.00	t	2026-01-10 05:55:25.645	2026-01-10 05:55:27.726
cmk7w5o32001j01o2wecsfp0d	cmk6nmx2s000o01o2qde404ti	2026-01-06 00:00:00	20.00	t	2026-01-10 05:55:32.27	2026-01-10 05:55:34.494
cmk7w5tbe001n01o21p64w401	cmk6nmx2s000o01o2qde404ti	2026-01-05 00:00:00	20.00	t	2026-01-10 05:55:39.05	2026-01-10 05:55:41.841
cmking8he000001pl0j0n97fc	cmk6nm6vh000n01o25qcty34t	2026-01-16 00:00:00	0.00	f	2026-01-17 18:37:16.658	2026-01-17 18:37:20.376
cmkingukt000401pl27mp68gr	cmk6nr4xu000w01o23ve0pqm7	2026-01-17 00:00:00	1.00	t	2026-01-17 18:37:45.293	2026-01-17 18:37:45.293
cmk7w63f5001r01o2gakgwsyz	cmk6nlbvm000m01o2uqscgeb0	2026-01-06 00:00:00	30.00	f	2026-01-10 05:55:52.145	2026-01-10 05:55:59.99
cmk7w6ke6001z01o2kxjmmfza	cmk6nlbvm000m01o2uqscgeb0	2026-01-05 00:00:00	30.00	f	2026-01-10 05:56:14.142	2026-01-10 05:56:18.456
cmk7w6q88002501o2tkrrb3rf	cmk6nlbvm000m01o2uqscgeb0	2026-01-07 00:00:00	30.00	f	2026-01-10 05:56:21.704	2026-01-10 05:56:28.531
cmk6nrfj6000x01o294bcejj2	cmk6nlbvm000m01o2uqscgeb0	2026-01-08 00:00:00	0.00	f	2026-01-09 09:12:44.898	2026-01-10 05:56:37.833
cmk8gkskb000001mv6y9e2hcx	cmk6nlbvm000m01o2uqscgeb0	2026-01-10 00:00:00	30.00	f	2026-01-10 15:27:10.235	2026-01-10 15:27:19.35
cmkjeq14c000a01plbfv1s9xd	cmk6nm6vh000n01o25qcty34t	2026-01-17 00:00:00	30.00	t	2026-01-18 07:20:43.308	2026-01-18 07:20:45.903
cmkjeq7d3000e01plkmybpobg	cmk6nlbvm000m01o2uqscgeb0	2026-01-17 00:00:00	45.00	t	2026-01-18 07:20:51.399	2026-01-18 07:20:54.914
cmk8gljld000601mve3269emf	cmk6nm6vh000n01o25qcty34t	2026-01-10 00:00:00	15.00	t	2026-01-10 15:27:45.265	2026-01-10 15:28:04.549
cmk9wtoiq000g01mvb40jvusd	cmk6nndie000p01o2a9piajm2	2026-01-11 00:00:00	1.00	t	2026-01-11 15:49:44.93	2026-01-11 15:49:44.93
cmkjeqec5000i01pluolg0u6p	cmk6nmx2s000o01o2qde404ti	2026-01-17 00:00:00	10.00	f	2026-01-18 07:21:00.436	2026-01-18 07:21:00.436
cmk9wtvx7000i01mvyhm8r95t	cmk6nm6vh000n01o25qcty34t	2026-01-11 00:00:00	15.00	t	2026-01-11 15:49:54.523	2026-01-11 15:50:03.557
cmkayt6v2000101rreb5icz9g	cmk6nlbvm000m01o2uqscgeb0	2026-01-12 00:00:00	30.00	f	2026-01-12 09:33:07.454	2026-01-12 09:33:12.841
cmkjeqp3f000k01plauzem33h	cmkaqhje9000q01mv9j33hwyn	2026-01-16 00:00:00	30.00	f	2026-01-18 07:21:14.379	2026-01-18 07:21:18.306
cmkaytefv000701rre87jip8o	cmk6nm6vh000n01o25qcty34t	2026-01-12 00:00:00	25.00	t	2026-01-12 09:33:17.275	2026-01-12 09:33:24.175
cmkaytswr000d01rryjcr88vm	cmkaqhje9000q01mv9j33hwyn	2026-01-12 00:00:00	90.00	t	2026-01-12 09:33:36.027	2026-01-12 09:33:43.755
cmkczs874000201lcejlsqe2b	cmkaqhje9000q01mv9j33hwyn	2026-01-13 00:00:00	30.00	t	2026-01-13 19:35:54.496	2026-01-13 19:35:56.863
cmkeducpl000001odh5fblf92	cmk6nndie000p01o2a9piajm2	2026-01-14 00:00:00	1.00	t	2026-01-14 18:57:14.457	2026-01-14 18:57:14.457
cmkedueov000201od11j3sekd	cmk6nmx2s000o01o2qde404ti	2026-01-13 00:00:00	20.00	t	2026-01-14 18:57:17.023	2026-01-14 18:57:19.975
cmkedulj9000601odyyzogvnl	cmk6nlbvm000m01o2uqscgeb0	2026-01-14 00:00:00	30.00	f	2026-01-14 18:57:25.893	2026-01-14 18:57:25.893
cmkedup67000801odnq3cri6b	cmk6nm6vh000n01o25qcty34t	2026-01-14 00:00:00	30.00	t	2026-01-14 18:57:30.607	2026-01-14 18:57:30.607
cmkeduxwn000a01odil7712qv	cmk6nr4xu000w01o23ve0pqm7	2026-01-14 00:00:00	1.00	t	2026-01-14 18:57:41.927	2026-01-14 18:57:41.927
cmkf3azan000001rrcpvwjhpr	cmk6nmx2s000o01o2qde404ti	2026-01-14 00:00:00	20.00	t	2026-01-15 06:50:00.623	2026-01-15 06:50:00.623
cmkf3b4p6000201rrau02rndp	cmk6nm6vh000n01o25qcty34t	2026-01-15 00:00:00	30.00	t	2026-01-15 06:50:07.626	2026-01-15 06:50:07.626
cmkf3b8qx000401rru13vy0k8	cmk6nndie000p01o2a9piajm2	2026-01-15 00:00:00	1.00	t	2026-01-15 06:50:12.873	2026-01-15 06:50:12.873
cmkf3dcdm000601rrvx1tkak0	cmkaqhje9000q01mv9j33hwyn	2026-01-15 00:00:00	30.00	t	2026-01-15 06:51:50.89	2026-01-15 06:51:53.244
cmkjequzo000o01pluw06kxcq	cmkaqhje9000q01mv9j33hwyn	2026-01-17 00:00:00	30.00	f	2026-01-18 07:21:22.019	2026-01-18 07:21:25.512
cmkfwnxqd000a01rrzjqrl2i0	cmkaqhje9000q01mv9j33hwyn	2026-01-14 00:00:00	30.00	t	2026-01-15 20:31:53.989	2026-01-15 20:32:01.74
cmkirgnbn000801pluin98j2g	cmk6nlbvm000m01o2uqscgeb0	2026-01-18 00:00:00	30.00	t	2026-01-17 20:29:34.355	2026-01-19 07:31:18.036
cmkoex89v000801o997bqxbz8	cmk6nmx2s000o01o2qde404ti	2026-01-20 00:00:00	20.00	t	2026-01-21 19:25:10.051	2026-01-21 19:25:17.079
cmkirgh6m000601pl81o8pk3y	cmk6nm6vh000n01o25qcty34t	2026-01-18 00:00:00	15.00	t	2026-01-17 20:29:26.398	2026-01-19 07:31:26.705
cmkkujsqp000a01o9pqd7skz7	cmk6nndie000p01o2a9piajm2	2026-01-18 00:00:00	1.00	t	2026-01-19 07:31:32.545	2026-01-19 07:31:32.545
cmkkujx7x000c01o9a5l70uyu	cmk6nqk52000v01o2fu6kdg0y	2026-01-18 00:00:00	1.00	t	2026-01-19 07:31:38.349	2026-01-19 07:31:38.349
cmkoexnzb000c01o9rabbrh36	cmkaqhje9000q01mv9j33hwyn	2026-01-20 00:00:00	60.00	t	2026-01-21 19:25:30.407	2026-01-21 19:25:30.407
cmkkuk71v000e01o9f2a5dtws	cmkaqhje9000q01mv9j33hwyn	2026-01-18 00:00:00	90.00	t	2026-01-19 07:31:51.091	2026-01-19 07:31:57.782
cmklflekg000k01o90al2ozgz	cmk6nlbvm000m01o2uqscgeb0	2026-01-19 00:00:00	30.00	t	2026-01-19 17:20:39.424	2026-01-19 17:20:39.424
cmklflh1g000m01o9i2zwukeh	cmk6nm6vh000n01o25qcty34t	2026-01-19 00:00:00	30.00	t	2026-01-19 17:20:42.628	2026-01-19 17:20:42.628
cmklflrdh000o01o9nje4txhf	cmkaqhje9000q01mv9j33hwyn	2026-01-19 00:00:00	60.00	t	2026-01-19 17:20:56.021	2026-01-19 17:20:56.021
cmklfnhjo000001mz5ofczw9h	cmk6nmx2s000o01o2qde404ti	2026-01-19 00:00:00	20.00	t	2026-01-19 17:22:16.595	2026-01-19 20:07:05.715
cmkoex0d2000201o9u7rwhef8	cmk6nm6vh000n01o25qcty34t	2026-01-21 00:00:00	30.00	t	2026-01-21 19:24:59.798	2026-01-21 19:25:05.163
cmkp249w3000001l4j74xik0o	cmkaqhje9000q01mv9j33hwyn	2026-01-21 00:00:00	30.00	f	2026-01-22 06:14:29.907	2026-01-22 06:14:37.592
cmkp7yd7t000001prj29lt9bv	cmk6nm6vh000n01o25qcty34t	2026-01-22 00:00:00	20.00	t	2026-01-22 08:57:51.976	2026-01-22 08:57:51.976
cmkp7yp3p000201pra1610q16	cmkaqhje9000q01mv9j33hwyn	2026-01-22 00:00:00	45.00	f	2026-01-22 08:58:07.381	2026-01-22 08:58:07.381
cmkqgtvzl000401praznjvny9	cmk6nmx2s000o01o2qde404ti	2026-01-22 00:00:00	20.00	t	2026-01-23 05:54:05.745	2026-01-23 05:54:05.745
cmkqolnkr000601priq9tamf2	cmk6nm6vh000n01o25qcty34t	2026-01-23 00:00:00	20.00	t	2026-01-23 09:31:38.523	2026-01-23 09:31:38.523
cmkqolo5k000801prlygas8zy	cmk6nndie000p01o2a9piajm2	2026-01-23 00:00:00	1.00	t	2026-01-23 09:31:39.272	2026-01-23 09:31:39.272
cmkrysl7k000a01prwjyorln7	cmkaqhje9000q01mv9j33hwyn	2026-01-23 00:00:00	30.00	f	2026-01-24 07:04:44.384	2026-01-24 07:04:44.384
cmks79zr5000c01prvev2cof2	cmk6nq86u000u01o26zy94ga2	2026-01-24 00:00:00	30.00	t	2026-01-24 11:02:13.313	2026-01-24 11:02:13.313
cmktlmkcl000e01prw0itapzy	cmk6nm6vh000n01o25qcty34t	2026-01-25 00:00:00	20.00	t	2026-01-25 10:31:40.677	2026-01-25 10:31:40.677
cmkuyrcqi000g01prv3sucdz6	cmk6nm6vh000n01o25qcty34t	2026-01-26 00:00:00	15.00	t	2026-01-26 09:27:05.274	2026-01-26 09:27:05.274
cmkuyrj4h000i01pr8qtf5a20	cmk6nmx2s000o01o2qde404ti	2026-01-26 00:00:00	0.00	f	2026-01-26 09:27:13.553	2026-01-26 09:27:13.553
cmkuyrksx000k01prwcd6m2b6	cmk6nndie000p01o2a9piajm2	2026-01-26 00:00:00	1.00	t	2026-01-26 09:27:15.728	2026-01-26 09:27:15.728
cmkx05j3b000m01pr7m72zk1j	cmk6nlbvm000m01o2uqscgeb0	2026-01-27 00:00:00	45.00	t	2026-01-27 19:41:38.663	2026-01-27 19:41:38.663
cmkx05lzx000o01prtwfibawj	cmk6nlbvm000m01o2uqscgeb0	2026-01-26 00:00:00	45.00	t	2026-01-27 19:41:42.429	2026-01-27 19:41:42.429
cmkx05qt3000q01prdkh73uq7	cmk6nm6vh000n01o25qcty34t	2026-01-27 00:00:00	30.00	t	2026-01-27 19:41:48.663	2026-01-27 19:41:48.663
cmkx05u13000s01prrjgz60k3	cmk6nmx2s000o01o2qde404ti	2026-01-27 00:00:00	20.00	t	2026-01-27 19:41:52.839	2026-01-27 19:41:52.839
cmkx05wl4000u01pr50bo3zu8	cmk6nndie000p01o2a9piajm2	2026-01-27 00:00:00	1.00	t	2026-01-27 19:41:56.152	2026-01-27 19:41:56.152
cmkx1nxw2000i01o4crxwzibf	cmkx1n0fn000e01o4nxfiyym9	2026-01-27 00:00:00	1.00	t	2026-01-27 20:23:57.266	2026-01-27 20:59:58.257
cmkczs2b9000001lcfm6frstq	cmk6nndie000p01o2a9piajm2	2026-01-13 00:00:00	1.00	t	2026-01-13 19:35:46.868	2026-01-28 20:20:55.827
cmkx1nz4s000k01o4l0pnny2q	cmkx1n0fn000e01o4nxfiyym9	2026-01-26 00:00:00	1.00	t	2026-01-27 20:23:58.876	2026-01-27 20:23:58.876
cmkx2wbyc002c01o4q5dd498y	cmkx1n0fn000e01o4nxfiyym9	2026-01-14 00:00:00	1.00	t	2026-01-27 20:58:28.356	2026-01-28 07:12:16.118
cmkx2woec002o01o4lnyou23g	cmkx1n0fn000e01o4nxfiyym9	2026-01-06 00:00:00	1.00	t	2026-01-27 20:58:44.484	2026-01-27 21:00:27.718
cmkx2wozi002q01o4a6iwkq7c	cmkx1n0fn000e01o4nxfiyym9	2026-01-07 00:00:00	1.00	t	2026-01-27 20:58:45.246	2026-01-27 21:00:28.409
cmkx2wppq002s01o4wqv79ozg	cmkx1n0fn000e01o4nxfiyym9	2026-01-08 00:00:00	1.00	t	2026-01-27 20:58:46.19	2026-01-27 21:00:29.045
cmkx2wq46002u01o4lwddlyg5	cmkx1n0fn000e01o4nxfiyym9	2026-01-09 00:00:00	1.00	t	2026-01-27 20:58:46.71	2026-01-27 21:00:29.715
cmkx2wqsm002w01o49uzqm0qk	cmkx1n0fn000e01o4nxfiyym9	2026-01-10 00:00:00	1.00	t	2026-01-27 20:58:47.59	2026-01-27 21:00:30.882
cmkx2wrae002y01o4zrblnquc	cmkx1n0fn000e01o4nxfiyym9	2026-01-11 00:00:00	1.00	t	2026-01-27 20:58:48.23	2026-01-27 21:00:31.537
cmkx2wvzs003801o47kjv2pgv	cmkx1n0fn000e01o4nxfiyym9	2026-01-02 00:00:00	1.00	t	2026-01-27 20:58:54.328	2026-01-27 21:01:15.772
cmkx2wwpq003a01o4j7m5nmza	cmkx1n0fn000e01o4nxfiyym9	2026-01-03 00:00:00	1.00	t	2026-01-27 20:58:55.262	2026-01-27 21:01:16.662
cmkx2wxl6003c01o4visv4m8d	cmkx1n0fn000e01o4nxfiyym9	2026-01-04 00:00:00	1.00	t	2026-01-27 20:58:56.394	2026-01-27 21:01:17.561
cmkx2w1ec001u01o44wnl2vdb	cmkx1n0fn000e01o4nxfiyym9	2026-01-19 00:00:00	1.00	t	2026-01-27 20:58:14.676	2026-01-27 21:01:42.233
cmkx2wcv3002e01o4ktmrq6gn	cmkx1n0fn000e01o4nxfiyym9	2026-01-15 00:00:00	1.00	t	2026-01-27 20:58:29.535	2026-01-28 07:12:17.396
cmkx2whon002g01o4ydlapc1z	cmkx1n0fn000e01o4nxfiyym9	2026-01-16 00:00:00	1.00	t	2026-01-27 20:58:35.783	2026-01-28 07:12:18.487
cmkx2wirk002i01o46n8v8vcu	cmkx1n0fn000e01o4nxfiyym9	2026-01-17 00:00:00	1.00	t	2026-01-27 20:58:37.184	2026-01-28 07:12:19.918
cmkx2w2cx001w01o4ong474el	cmkx1n0fn000e01o4nxfiyym9	2026-01-20 00:00:00	1.00	t	2026-01-27 20:58:15.921	2026-01-27 20:58:15.921
cmkx2w36d001y01o4dr90a8lz	cmkx1n0fn000e01o4nxfiyym9	2026-01-21 00:00:00	1.00	t	2026-01-27 20:58:16.981	2026-01-27 20:58:16.981
cmkx2w42j002001o4ofk64h25	cmkx1n0fn000e01o4nxfiyym9	2026-01-22 00:00:00	1.00	t	2026-01-27 20:58:18.139	2026-01-27 20:58:18.139
cmkx2w4wa002201o4js7u7hgs	cmkx1n0fn000e01o4nxfiyym9	2026-01-23 00:00:00	1.00	t	2026-01-27 20:58:19.21	2026-01-27 20:58:19.21
cmkx2w5uq002401o4cz9cumqr	cmkx1n0fn000e01o4nxfiyym9	2026-01-24 00:00:00	1.00	t	2026-01-27 20:58:20.45	2026-01-27 20:58:20.45
cmkx2w6wg002601o4iv6akzk4	cmkx1n0fn000e01o4nxfiyym9	2026-01-25 00:00:00	1.00	t	2026-01-27 20:58:21.808	2026-01-27 20:58:21.808
cmkx2xnaj003e01o4awzq9vmk	cmkx1n0fn000e01o4nxfiyym9	2025-12-22 00:00:00	1.00	t	2026-01-27 20:59:29.707	2026-01-27 20:59:29.707
cmkx2xo6t003g01o4dqcxrtyq	cmkx1n0fn000e01o4nxfiyym9	2025-12-23 00:00:00	1.00	t	2026-01-27 20:59:30.869	2026-01-27 20:59:30.869
cmkx2xotx003i01o43ngcuexl	cmkx1n0fn000e01o4nxfiyym9	2025-12-24 00:00:00	1.00	t	2026-01-27 20:59:31.701	2026-01-27 20:59:31.701
cmkx2wj4i002k01o429qjyo0r	cmkx1n0fn000e01o4nxfiyym9	2026-01-18 00:00:00	1.00	t	2026-01-27 20:58:37.65	2026-01-28 07:12:21.134
cmkxotvth007p01o4hcl9jdb6	cmkxosj7y006x01o4khn7pz54	2026-01-13 00:00:00	1.00	t	2026-01-28 07:12:25.685	2026-01-28 07:12:25.685
cmkx2yaos003u01o4ubwqhlc3	cmkx1n0fn000e01o4nxfiyym9	2026-01-28 00:00:00	1.00	t	2026-01-27 21:00:00.028	2026-02-02 19:13:19.34
cml5js9vn000e01ruwidq4mlx	cmkxos9yo006w01o4bxya497z	2026-01-28 00:00:00	0.00	f	2026-02-02 19:13:21.923	2026-02-02 19:13:25.188
cmkxotwfk007r01o47i77x4jt	cmkxosj7y006x01o4khn7pz54	2026-01-14 00:00:00	1.00	t	2026-01-28 07:12:26.48	2026-01-28 07:12:26.48
cmkxotx8w007t01o4sllu7iaz	cmkxosj7y006x01o4khn7pz54	2026-01-15 00:00:00	1.00	t	2026-01-28 07:12:27.536	2026-01-28 07:12:27.536
cmkygdkhq007w01o4n3od7679	cmk6nlbvm000m01o2uqscgeb0	2026-01-28 00:00:00	30.00	t	2026-01-28 20:03:33.758	2026-01-28 20:03:33.758
cmkygwg21000001o0l3eiyyei	cmk6nndie000p01o2a9piajm2	2026-01-22 00:00:00	1.00	t	2026-01-28 20:18:14.473	2026-01-28 20:18:14.473
cmkygwgco000201o0i1h55a39	cmk6nndie000p01o2a9piajm2	2026-01-21 00:00:00	1.00	t	2026-01-28 20:18:14.856	2026-01-28 20:18:14.856
cmkyh0fl7000601o08l3yezk1	cmk6nndie000p01o2a9piajm2	2026-01-08 00:00:00	1.00	t	2026-01-28 20:21:20.491	2026-01-28 20:21:20.491
cmkx2wo2u002m01o4sa8v6u6z	cmkx1n0fn000e01o4nxfiyym9	2026-01-05 00:00:00	1.00	t	2026-01-27 20:58:44.07	2026-01-27 21:00:27.5
cml5js4xm000201rue85h9suw	cmkx1n0fn000e01o4nxfiyym9	2026-01-31 00:00:00	1.00	t	2026-02-02 19:13:15.514	2026-02-02 19:13:15.514
cmkx2z8kj005a01o418ufj5l1	cmkx1n0fn000e01o4nxfiyym9	2025-12-27 00:00:00	0.00	f	2026-01-27 21:00:43.938	2026-01-27 21:01:01.673
cmkx2xpxj003m01o4amk8ne90	cmkx1n0fn000e01o4nxfiyym9	2025-12-26 00:00:00	0.00	f	2026-01-27 20:59:33.127	2026-01-27 21:01:02.403
cmkx2z8as005801o4qiwm2m87	cmkx1n0fn000e01o4nxfiyym9	2025-12-28 00:00:00	1.00	t	2026-01-27 21:00:43.588	2026-01-27 21:01:04.567
cmkx2xpdw003k01o48q4v88mm	cmkx1n0fn000e01o4nxfiyym9	2025-12-25 00:00:00	0.00	f	2026-01-27 20:59:32.419	2026-01-27 21:01:05.743
cmkx2wtus003001o4wusa75q2	cmkx1n0fn000e01o4nxfiyym9	2025-12-29 00:00:00	1.00	t	2026-01-27 20:58:51.556	2026-01-27 21:01:12.106
cmkx2wube003201o48ymy5h5k	cmkx1n0fn000e01o4nxfiyym9	2025-12-30 00:00:00	1.00	t	2026-01-27 20:58:52.154	2026-01-27 21:01:12.915
cmkx2wuto003401o470pdizah	cmkx1n0fn000e01o4nxfiyym9	2025-12-31 00:00:00	1.00	t	2026-01-27 20:58:52.812	2026-01-27 21:01:13.97
cmkx2wvdq003601o49v9kktxq	cmkx1n0fn000e01o4nxfiyym9	2026-01-01 00:00:00	1.00	t	2026-01-27 20:58:53.534	2026-01-27 21:01:14.913
cml5js8xt000a01rundduzzzt	cmkxos9yo006w01o4bxya497z	2026-01-26 00:00:00	0.00	f	2026-02-02 19:13:20.705	2026-02-02 19:13:23.52
cml5js9b9000c01ru7eklpuoz	cmkxos9yo006w01o4bxya497z	2026-01-27 00:00:00	0.00	f	2026-02-02 19:13:21.189	2026-02-02 19:13:24.302
cmkxopzs2006m01o4762ylpuo	cmk6nm6vh000n01o25qcty34t	2026-01-28 00:00:00	30.00	t	2026-01-28 07:09:24.194	2026-01-28 07:09:24.194
cmkxoq1wj006o01o4uidmpp4s	cmk6nmx2s000o01o2qde404ti	2026-01-28 00:00:00	20.00	t	2026-01-28 07:09:26.947	2026-01-28 07:09:26.947
cmkxoq2p5006q01o4dva8o1pj	cmk6nndie000p01o2a9piajm2	2026-01-28 00:00:00	1.00	t	2026-01-28 07:09:27.977	2026-01-28 07:09:27.977
cmkxoqao0006s01o4babky3fa	cmkaqhje9000q01mv9j33hwyn	2026-01-27 00:00:00	30.00	f	2026-01-28 07:09:38.303	2026-01-28 07:09:59.799
cmkxot4r4006z01o45qq1cwst	cmkxosj7y006x01o4khn7pz54	2026-01-27 00:00:00	1.00	t	2026-01-28 07:11:50.608	2026-01-28 07:11:50.608
cmkxotg3c007101o45620ir6q	cmkxosj7y006x01o4khn7pz54	2026-01-21 00:00:00	1.00	t	2026-01-28 07:12:05.304	2026-01-28 07:12:05.304
cmkxotgta007301o4u48hv8il	cmkxosj7y006x01o4khn7pz54	2026-01-23 00:00:00	1.00	t	2026-01-28 07:12:06.238	2026-01-28 07:12:06.238
cmkxothjy007501o45ru9m4aa	cmkxosj7y006x01o4khn7pz54	2026-01-24 00:00:00	1.00	t	2026-01-28 07:12:07.198	2026-01-28 07:12:07.198
cmkxoti8z007701o4qj9bsrsj	cmkxosj7y006x01o4khn7pz54	2026-01-25 00:00:00	1.00	t	2026-01-28 07:12:08.099	2026-01-28 07:12:08.099
cmkxotj4m007901o47q35q3aj	cmkxosj7y006x01o4khn7pz54	2026-01-22 00:00:00	1.00	t	2026-01-28 07:12:09.238	2026-01-28 07:12:09.238
cmkx2wa7h002801o46zk8ftpp	cmkx1n0fn000e01o4nxfiyym9	2026-01-12 00:00:00	1.00	t	2026-01-27 20:58:26.093	2026-01-28 07:12:14.115
cmkx2wb4o002a01o4hpj0b8ot	cmkx1n0fn000e01o4nxfiyym9	2026-01-13 00:00:00	1.00	t	2026-01-27 20:58:27.288	2026-01-28 07:12:14.86
cml5js692000401ruipvvfh9c	cmkx1n0fn000e01o4nxfiyym9	2026-01-30 00:00:00	1.00	t	2026-02-02 19:13:17.222	2026-02-02 19:13:17.222
cmkx2ybmx003w01o416tvsg9c	cmkx1n0fn000e01o4nxfiyym9	2026-01-29 00:00:00	1.00	t	2026-01-27 21:00:01.257	2026-02-02 19:13:17.932
cml5jsf2q000m01ruf96vrjn3	cmkxosj7y006x01o4khn7pz54	2026-01-26 00:00:00	1.00	t	2026-02-02 19:13:28.658	2026-02-02 19:13:28.658
cml5jsgjk000o01ruo6fydfx6	cmkxosj7y006x01o4khn7pz54	2026-01-29 00:00:00	1.00	t	2026-02-02 19:13:30.56	2026-02-02 19:13:30.56
cml5jskcs000q01rugokn6pew	cmkxosj7y006x01o4khn7pz54	2026-01-30 00:00:00	0.00	f	2026-02-02 19:13:35.5	2026-02-02 19:13:37.66
cml65viio000m01qsncgqqufp	cmkxosj7y006x01o4khn7pz54	2026-02-02 00:00:00	1.00	t	2026-02-03 05:31:44.64	2026-02-04 18:04:52.961
cml65vz54000o01qskwpviwu0	cmk6nm6vh000n01o25qcty34t	2026-02-02 00:00:00	20.00	t	2026-02-03 05:32:06.184	2026-02-03 05:32:06.184
cml65w2yl000q01qswfwqp0wd	cmk6nmx2s000o01o2qde404ti	2026-02-02 00:00:00	10.00	f	2026-02-03 05:32:11.133	2026-02-03 05:32:11.133
cml65wazu000s01qsj335oa8l	cmkaqhje9000q01mv9j33hwyn	2026-02-02 00:00:00	60.00	t	2026-02-03 05:32:21.546	2026-02-03 05:32:21.546
cml5js11f000001ru4er3n1c5	cmkx1n0fn000e01o4nxfiyym9	2026-02-01 00:00:00	1.00	t	2026-02-02 19:13:10.467	2026-02-04 18:05:05.368
cml5m6gti000801qsvgg8h13d	cmkx1n0fn000e01o4nxfiyym9	2026-02-03 00:00:00	1.00	t	2026-02-02 20:20:23.334	2026-02-04 18:05:29.942
cml70p8lt000u01qsygstetvn	cmk6nm6vh000n01o25qcty34t	2026-02-03 00:00:00	20.00	t	2026-02-03 19:54:39.953	2026-02-03 19:54:39.953
cml70pbwp000w01qsf22nmb4h	cmk6nmx2s000o01o2qde404ti	2026-02-03 00:00:00	20.00	t	2026-02-03 19:54:44.233	2026-02-03 19:54:44.233
cml70pd1l000y01qser0pl15e	cmk6nndie000p01o2a9piajm2	2026-02-03 00:00:00	1.00	t	2026-02-03 19:54:45.705	2026-02-03 19:54:45.705
cml8c6mwj000001r21ke0uu7z	cmk6nm6vh000n01o25qcty34t	2026-02-04 00:00:00	20.00	t	2026-02-04 18:03:53.587	2026-02-04 18:03:53.587
cml8c6p0b000201r2jjd16lfi	cmk6nmx2s000o01o2qde404ti	2026-02-04 00:00:00	20.00	t	2026-02-04 18:03:56.315	2026-02-04 18:03:56.315
cml8c6txj000401r2howv3a5g	cmk6nndie000p01o2a9piajm2	2026-02-04 00:00:00	1.00	t	2026-02-04 18:04:02.695	2026-02-04 18:04:02.695
cml8c71f3000601r2dudqhk3q	cmkaqhje9000q01mv9j33hwyn	2026-02-04 00:00:00	30.00	f	2026-02-04 18:04:12.398	2026-02-04 18:04:12.398
cml8c75su000801r2emzhh1ox	cmk6nr4xu000w01o23ve0pqm7	2026-02-03 00:00:00	1.00	t	2026-02-04 18:04:18.078	2026-02-04 18:04:18.078
cml5m43c4000001qsnw3qtdz8	cmkx1n0fn000e01o4nxfiyym9	2026-02-02 00:00:00	1.00	t	2026-02-02 20:18:32.548	2026-02-04 18:04:51.477
cml8c8hjf000g01r2ahhh5jyi	cmkxos9yo006w01o4bxya497z	2026-02-03 00:00:00	1.00	t	2026-02-04 18:05:19.947	2026-02-04 18:05:19.947
cml9ts52g000k01r2i3rm7qms	cmk6nlbvm000m01o2uqscgeb0	2026-02-05 00:00:00	30.00	t	2026-02-05 19:04:16.552	2026-02-05 19:04:16.552
cml9ts9am000m01r2y0bhk2mb	cmk6nm6vh000n01o25qcty34t	2026-02-05 00:00:00	0.00	f	2026-02-05 19:04:22.03	2026-02-05 19:04:22.03
cml9tswiv000o01r2v83cf1ws	cmkx1n0fn000e01o4nxfiyym9	2026-02-04 00:00:00	1.00	t	2026-02-05 19:04:52.135	2026-02-05 19:04:52.135
cmlddr8pf000001qv6rxkgjq6	cmk6nlbvm000m01o2uqscgeb0	2026-02-07 00:00:00	60.00	t	2026-02-08 06:46:45.458	2026-02-08 06:46:49.611
cmlddrhbw000401qver7nx91z	cmk6nm6vh000n01o25qcty34t	2026-02-07 00:00:00	20.00	t	2026-02-08 06:46:56.636	2026-02-08 06:46:56.636
cmlddrt18000601qvnrr6lll1	cmk6nmx2s000o01o2qde404ti	2026-02-07 00:00:00	20.00	t	2026-02-08 06:47:11.804	2026-02-08 06:47:11.804
cmlddrxis000801qv6daay0ma	cmk6nndie000p01o2a9piajm2	2026-02-06 00:00:00	1.00	t	2026-02-08 06:47:17.62	2026-02-08 06:47:17.62
cmldds1pw000a01qvw6kx6fmy	cmk6nmx2s000o01o2qde404ti	2026-02-06 00:00:00	0.00	f	2026-02-08 06:47:23.06	2026-02-08 06:47:23.06
cmldds686000c01qv0800ucxh	cmk6nm6vh000n01o25qcty34t	2026-02-06 00:00:00	20.00	t	2026-02-08 06:47:28.902	2026-02-08 06:47:28.902
cmlddsf1f000e01qv5ug11p8w	cmk6nlbvm000m01o2uqscgeb0	2026-02-06 00:00:00	0.00	f	2026-02-08 06:47:40.323	2026-02-08 06:47:40.323
cmlddshxa000g01qvcqyqgqm8	cmk6nr4xu000w01o23ve0pqm7	2026-02-06 00:00:00	1.00	t	2026-02-08 06:47:44.062	2026-02-08 06:47:44.062
cmlddsn88000i01qvqsqul7xh	cmkaqhje9000q01mv9j33hwyn	2026-02-06 00:00:00	40.00	f	2026-02-08 06:47:50.936	2026-02-08 06:47:50.936
cmldeq2v9000k01qv0kiezj2m	cmkx1n0fn000e01o4nxfiyym9	2026-02-05 00:00:00	1.00	t	2026-02-08 07:13:50.853	2026-02-08 07:13:50.853
cmldeq3q1000m01qvzz68r1c2	cmkx1n0fn000e01o4nxfiyym9	2026-02-06 00:00:00	1.00	t	2026-02-08 07:13:51.961	2026-02-08 07:13:51.961
cmldeq4uo000o01qvf8s91ew1	cmkxos9yo006w01o4bxya497z	2026-02-06 00:00:00	1.00	t	2026-02-08 07:13:53.424	2026-02-08 07:13:53.424
cmldeq82y000q01qvexgpmiss	cmkxosj7y006x01o4khn7pz54	2026-02-06 00:00:00	0.00	f	2026-02-08 07:13:57.61	2026-02-08 07:13:58.804
cmldeq9r7000u01qvkt2yx31q	cmkxosj7y006x01o4khn7pz54	2026-02-05 00:00:00	1.00	t	2026-02-08 07:13:59.779	2026-02-08 07:13:59.779
cmldeqdzc000w01qv33n5ozj6	cmkxosj7y006x01o4khn7pz54	2026-02-07 00:00:00	1.00	t	2026-02-08 07:14:05.256	2026-02-08 07:14:05.256
cmldeqfic000y01qv3omo05a3	cmkx1n0fn000e01o4nxfiyym9	2026-02-07 00:00:00	1.00	t	2026-02-08 07:14:07.236	2026-02-08 07:14:07.236
cmlh0xpgo000001mvnc1c6p8s	cmk6nlbvm000m01o2uqscgeb0	2026-02-09 00:00:00	60.00	t	2026-02-10 19:58:56.808	2026-02-10 19:59:03.357
cmlh0xycp000401mvdu4yhjrb	cmk6nlbvm000m01o2uqscgeb0	2026-02-10 00:00:00	60.00	t	2026-02-10 19:59:08.329	2026-02-10 19:59:08.329
cmlh0y0z9000601mv4s9jku51	cmk6nm6vh000n01o25qcty34t	2026-02-09 00:00:00	20.00	t	2026-02-10 19:59:11.733	2026-02-10 19:59:11.733
cmlh0ygmh000801mvdi7wyp2a	cmk6nmx2s000o01o2qde404ti	2026-02-09 00:00:00	0.00	f	2026-02-10 19:59:32.008	2026-02-10 19:59:32.008
cmligub9o000a01mvtabgsgyo	cmk6nlbvm000m01o2uqscgeb0	2026-02-11 00:00:00	30.00	t	2026-02-11 20:11:58.476	2026-02-11 20:11:58.476
cmligudap000c01mvmt63ccsj	cmk6nm6vh000n01o25qcty34t	2026-02-11 00:00:00	20.00	t	2026-02-11 20:12:01.105	2026-02-11 20:12:01.105
cmligzhr5000e01mv2mzznkog	cmkx1n0fn000e01o4nxfiyym9	2026-02-08 00:00:00	1.00	t	2026-02-11 20:16:00.161	2026-02-11 20:16:00.161
cmligzqiv000g01mvbzzhlnvb	cmkx1n0fn000e01o4nxfiyym9	2026-02-09 00:00:00	1.00	t	2026-02-11 20:16:11.526	2026-02-11 20:16:11.526
cmligzr3l000i01mvpus0jdok	cmkx1n0fn000e01o4nxfiyym9	2026-02-10 00:00:00	1.00	t	2026-02-11 20:16:12.273	2026-02-11 20:16:12.273
cmligzsb2000k01mv065v3b3l	cmkx1n0fn000e01o4nxfiyym9	2026-02-11 00:00:00	1.00	t	2026-02-11 20:16:13.838	2026-02-11 20:16:13.838
cmligzwoo000m01mvn70ngzot	cmkxos9yo006w01o4bxya497z	2026-02-11 00:00:00	1.00	t	2026-02-11 20:16:19.512	2026-02-11 20:16:19.512
cmlih0014000o01mvpy3oq9xm	cmkxosj7y006x01o4khn7pz54	2026-02-09 00:00:00	1.00	t	2026-02-11 20:16:23.847	2026-02-11 20:16:23.847
cmlm657el000q01mvkps6979z	cmk6nq86u000u01o26zy94ga2	2026-02-03 00:00:00	0.00	f	2026-02-14 10:23:35.613	2026-02-14 10:23:35.613
cmlm65akq000s01mv65revtvs	cmk6nq86u000u01o26zy94ga2	2026-02-07 00:00:00	45.00	t	2026-02-14 10:23:39.722	2026-02-14 10:23:39.722
cmlo55s77000u01mvtnw35b2z	cmk6nr4xu000w01o23ve0pqm7	2026-02-11 00:00:00	1.00	t	2026-02-15 19:31:35.299	2026-02-15 19:31:35.299
cmpjlqur9000c01mtfgo0tm03	cmpjlqj3d000b01mtxz743ps7	2026-05-17 00:00:00	0.00	f	2026-05-24 09:55:50.709	2026-05-24 09:57:02.065
cmpnkq36v000301og2zvdby51	cmk6nlbvm000m01o2uqscgeb0	2026-05-25 00:00:00	30.00	t	2026-05-27 04:38:20.071	2026-05-27 04:38:20.071
cmpnkq4wu000501ogl5msbxw1	cmk6nm6vh000n01o25qcty34t	2026-05-25 00:00:00	0.00	f	2026-05-27 04:38:22.302	2026-05-27 04:38:22.302
cmpnkqapv000901ogj1g1xy2c	cmk6nmx2s000o01o2qde404ti	2026-05-25 00:00:00	0.00	f	2026-05-27 04:38:29.827	2026-05-27 04:38:29.827
cmpnkqcnz000b01ogpnd0ixn6	cmk6nndie000p01o2a9piajm2	2026-05-25 00:00:00	1.00	t	2026-05-27 04:38:32.351	2026-05-27 04:38:32.351
cmpnkqqx6000d01ogjv2171bk	cmk6nlbvm000m01o2uqscgeb0	2026-05-24 00:00:00	30.00	t	2026-05-27 04:38:50.826	2026-05-27 04:38:50.826
cmpnkq7u0000701ogja5ty6st	cmk6nm6vh000n01o25qcty34t	2026-05-24 00:00:00	20.00	t	2026-05-27 04:38:26.088	2026-05-27 04:38:55.186
cmpnkqwbm000h01ogs3hccx0n	cmk6nmx2s000o01o2qde404ti	2026-05-24 00:00:00	0.00	f	2026-05-27 04:38:57.826	2026-05-27 04:38:57.826
cmpnkqz0b000j01ogkhhi995w	cmk6nndie000p01o2a9piajm2	2026-05-24 00:00:00	1.00	t	2026-05-27 04:39:01.307	2026-05-27 04:39:01.307
cmpqmuaow001701ogdh91dl0j	cmpjlqj3d000b01mtxz743ps7	2026-05-30 00:00:00	0.00	f	2026-05-29 08:00:54.176	2026-05-29 08:22:27.797
cmpqmtikm000x01ogyb5acx99	cmpjlqj3d000b01mtxz743ps7	2026-05-26 00:00:00	0.00	f	2026-05-29 08:00:17.734	2026-05-29 08:22:07.521
cmpqmsygk000s01og59avnq53	cmpjlqj3d000b01mtxz743ps7	2026-05-24 00:00:00	0.00	f	2026-05-29 07:59:51.668	2026-05-29 08:21:54.68
cmpqmtds8000v01og68f6rhmy	cmpjlqj3d000b01mtxz743ps7	2026-05-25 00:00:00	0.00	f	2026-05-29 08:00:11.528	2026-05-29 08:22:01.967
cmpqmto0u000z01ogzticasuy	cmpjlqj3d000b01mtxz743ps7	2026-05-27 00:00:00	0.00	f	2026-05-29 08:00:24.798	2026-05-29 08:22:14.256
cmpqmtyr3001301ognjd7w4sy	cmpjlqj3d000b01mtxz743ps7	2026-05-28 00:00:00	0.00	f	2026-05-29 08:00:38.703	2026-05-29 08:22:18.341
cmpqmu2jc001501ogarfz2n22	cmpjlqj3d000b01mtxz743ps7	2026-05-29 00:00:00	0.00	f	2026-05-29 08:00:43.608	2026-05-29 08:22:22.119
cmpy4g0bm000001qwrh4r0sgk	cmpw9yleh002f01oggvfgu8ev	2026-06-03 00:00:00	1.00	t	2026-06-03 13:48:03.874	2026-06-03 13:48:04.437
cmpzrx9jm000201qd6ylyd4rm	cmpw9ylel002g01ogkfzybp70	2026-06-04 00:00:00	0.00	f	2026-06-04 17:33:06.322	2026-06-04 17:33:10.218
cmpzt5u5w000401s4whg5wgot	cmpw9yleh002f01oggvfgu8ev	2026-06-01 00:00:00	1.00	t	2026-06-04 18:07:45.908	2026-06-04 18:07:45.908
cmpzs11gm000e01qdfujrvk4o	cmpw9yleh002f01oggvfgu8ev	2026-05-31 00:00:00	1.00	t	2026-06-04 17:36:02.47	2026-06-04 17:36:03.234
cmpzs4jyd000w01qdxcjgf3to	cmpw9xts2002701og1ytm3k4f	2026-06-04 00:00:00	0.00	f	2026-06-04 17:38:46.405	2026-06-04 17:38:47.187
cmpzs2qnk000m01qdte1fnn5c	cmpjlqj3d000b01mtxz743ps7	2026-06-04 00:00:00	10000.00	t	2026-06-04 17:37:21.776	2026-06-04 18:23:50.388
cmpzt5w1n000601s4hiu9o88z	cmpw9yleh002f01oggvfgu8ev	2026-06-02 00:00:00	1.00	t	2026-06-04 18:07:48.347	2026-06-04 18:07:48.347
cmpzt7dcu000801s4uxcpj40t	cmpw9ylfn002h01og4tj3pgut	2026-05-31 00:00:00	1.00	t	2026-06-04 18:08:57.438	2026-06-04 18:08:57.438
cmpzrxkcp000601qdmn0tws99	cmpw9yleh002f01oggvfgu8ev	2026-06-04 00:00:00	0.00	f	2026-06-04 17:33:20.329	2026-06-04 18:23:21.665
cmpztqe04000g01qo30kxapi2	cmpjlqj3d000b01mtxz743ps7	2026-06-02 00:00:00	12000.00	t	2026-06-04 18:23:44.739	2026-06-04 18:23:44.741
cmpztqjwc000o01qol21nenwl	cmpjlqj3d000b01mtxz743ps7	2026-06-03 00:00:00	120.00	f	2026-06-04 18:23:52.38	2026-06-04 18:23:54.121
\.


--
-- Data for Name: TaskMonthAggregation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TaskMonthAggregation" (id, "taskId", year, month, "totalValue", "daysWithActivity", target, "createdAt", "updatedAt") FROM stdin;
cmkxot4rh007001o4cdfda7cn	cmkxosj7y006x01o4khn7pz54	2026	1	11.00	11	20	2026-01-28 07:11:50.621	2026-02-02 19:13:37.666
cmkeduxx8000b01odiwhxnx8n	cmk6nr4xu000w01o23ve0pqm7	2026	1	2.00	2	4	2026-01-14 18:57:41.948	2026-01-17 18:37:45.328
cml65w2yq000r01qsosnc6abu	cmk6nmx2s000o01o2qde404ti	2026	2	70.00	4	600	2026-02-03 05:32:11.138	2026-02-10 19:59:32.054
cml9ts544000l01r2tpvgd9vo	cmk6nlbvm000m01o2uqscgeb0	2026	2	240.00	5	480	2026-02-05 19:04:16.612	2026-02-11 20:11:58.515
cml65vz5h000p01qsibv8lzq7	cmk6nm6vh000n01o25qcty34t	2026	2	140.00	7	450	2026-02-03 05:32:06.197	2026-02-11 20:12:01.119
cmk7w50xu001a01o2ka9xopkk	cmk6nm6vh000n01o25qcty34t	2026	1	370.00	16	450	2026-01-10 05:55:02.274	2026-01-28 07:09:24.216
cmk6nrp7d001401o2z4iy3q2f	cmk6nmx2s000o01o2qde404ti	2026	1	250.00	13	600	2026-01-09 09:12:57.433	2026-01-28 07:09:26.956
cmkaytsxt000e01rrvp2u6mrv	cmkaqhje9000q01mv9j33hwyn	2026	1	585.00	13	1800	2026-01-12 09:33:36.065	2026-01-28 07:09:59.822
cmkkujx87000d01o90x3mbt39	cmk6nqk52000v01o2fu6kdg0y	2026	1	1.00	1	4	2026-01-19 07:31:38.359	2026-01-19 07:31:38.359
cmpjlqusl000d01mtbi44egr9	cmpjlqj3d000b01mtxz743ps7	2026	5	0.00	0	300000	2026-05-24 09:55:50.757	2026-05-29 08:22:27.808
cmpzt7ddp000901s4thy0a4ya	cmpw9ylfn002h01og4tj3pgut	2026	5	1.00	1	4	2026-06-04 18:08:57.469	2026-06-04 18:08:57.469
cml5js11s000101runc5skhod	cmkx1n0fn000e01o4nxfiyym9	2026	2	11.00	11	30	2026-02-02 19:13:10.48	2026-02-11 20:16:13.849
cml8c8hkq000h01r26rlty2ye	cmkxos9yo006w01o4bxya497z	2026	2	3.00	3	4	2026-02-04 18:05:19.994	2026-02-11 20:16:19.52
cml65vij8000n01qsiaazhjab	cmkxosj7y006x01o4khn7pz54	2026	2	4.00	4	20	2026-02-03 05:31:44.66	2026-02-11 20:16:23.858
cmlm657ew000r01mv63zof6a0	cmk6nq86u000u01o26zy94ga2	2026	2	45.00	1	120	2026-02-14 10:23:35.624	2026-02-14 10:23:39.73
cml8c75tp000901r2y1fuz9z7	cmk6nr4xu000w01o23ve0pqm7	2026	2	3.00	3	4	2026-02-04 18:04:18.108	2026-02-15 19:31:35.324
cmk6nrfjk000y01o2zc2b0t3k	cmk6nlbvm000m01o2uqscgeb0	2026	1	405.00	12	480	2026-01-09 09:12:44.912	2026-01-28 20:03:33.804
cmpzrx9ke000301qd0jyt2fyj	cmpw9ylel002g01ogkfzybp70	2026	6	0.00	0	4	2026-06-04 17:33:06.35	2026-06-04 17:33:10.23
cmk6ofoud001601o28pbxzn46	cmk6nndie000p01o2a9piajm2	2026	1	14.00	14	12	2026-01-09 09:31:36.709	2026-01-28 20:21:20.504
cmkx1nxwo000j01o4ecuqiulc	cmkx1n0fn000e01o4nxfiyym9	2026	1	31.00	31	30	2026-01-27 20:23:57.287	2026-02-02 19:13:19.347
cml70pd1x000z01qs0wsr21xs	cmk6nndie000p01o2a9piajm2	2026	2	3.00	3	12	2026-02-03 19:54:45.717	2026-02-08 06:47:17.628
cmks79zrv000d01pre9wpsxn9	cmk6nq86u000u01o26zy94ga2	2026	1	30.00	1	120	2026-01-24 11:02:13.339	2026-01-24 11:02:13.339
cml5js8y1000b01rurp1bkdw8	cmkxos9yo006w01o4bxya497z	2026	1	0.00	0	4	2026-02-02 19:13:20.713	2026-02-02 19:13:25.194
cmkx2wtv9003101o4uli1zt3t	cmkx1n0fn000e01o4nxfiyym9	2025	12	7.00	7	30	2026-01-27 20:58:51.573	2026-01-27 21:01:13.997
cml65wb0c000t01qszhktq618	cmkaqhje9000q01mv9j33hwyn	2026	2	130.00	3	1800	2026-02-03 05:32:21.564	2026-02-08 06:47:50.943
cmpnkq379000401ogc5q0m0d6	cmk6nlbvm000m01o2uqscgeb0	2026	5	60.00	2	480	2026-05-27 04:38:20.085	2026-05-27 04:38:50.853
cmpzs11hd000f01qdlo7iqf92	cmpw9yleh002f01oggvfgu8ev	2026	5	1.00	1	4	2026-06-04 17:36:02.497	2026-06-04 17:36:03.244
cmpnkq4x4000601og9cauaqog	cmk6nm6vh000n01o25qcty34t	2026	5	20.00	1	450	2026-05-27 04:38:22.312	2026-05-27 04:38:55.197
cmpnkqaq5000a01ogpjf0ckct	cmk6nmx2s000o01o2qde404ti	2026	5	0.00	0	600	2026-05-27 04:38:29.837	2026-05-27 04:38:57.839
cmpnkqcoa000c01ogk832xcu2	cmk6nndie000p01o2a9piajm2	2026	5	2.00	2	12	2026-05-27 04:38:32.362	2026-05-27 04:39:01.317
cmpy4g0cj000101qws9r8z1jr	cmpw9yleh002f01oggvfgu8ev	2026	6	3.00	3	4	2026-06-03 13:48:03.907	2026-06-04 18:23:21.678
cmpzs4jyn000x01qdb76b5l8z	cmpw9xts2002701og1ytm3k4f	2026	6	0.00	0	64	2026-06-04 17:38:46.415	2026-06-04 17:38:47.197
cmpzs2qo9000n01qdp6ffce6a	cmpjlqj3d000b01mtxz743ps7	2026	6	22120.00	3	300000	2026-06-04 17:37:21.801	2026-06-04 18:23:54.133
\.


--
-- Data for Name: TimeGoal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TimeGoal" (id, "goalId", "targetHours", "targetMinutes", "currentHours", "currentMinutes", "createdAt", "updatedAt") FROM stdin;
cmk6n8vfw000701o2ydr588on	cmk6n8vfl000601o2zhkfw4s2	0	10	0	0	2026-01-09 08:58:19.052	2026-01-14 19:42:38.379
\.


--
-- Data for Name: Todo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Todo" (id, "userId", title, description, done, priority, "dueDate", "createdAt", "updatedAt") FROM stdin;
cmp8oywz0000001pqpesadi2r	cmk5w4rm700011yo2ey83qv4z	samarth	\N	f	f	2026-05-17 00:00:00	2026-05-16 18:40:37.74	2026-05-16 18:40:37.74
cmp8peuju000101mtje5na7wb	cmk5w4rm700011yo2ey83qv4z	car tax payment	\N	t	f	2026-05-17 00:00:00	2026-05-16 18:53:01.098	2026-05-16 18:53:02.908
cmp8pelne000001mtfo87m6li	cmk5w4rm700011yo2ey83qv4z	arden payment	\N	t	f	2026-05-17 00:00:00	2026-05-16 18:52:49.561	2026-05-22 05:39:49.336
cmpghpe9c000401mt0lxu6dvl	cmk5w4rm700011yo2ey83qv4z	Reply to Leena Hindocha	\N	t	f	2026-05-23 00:00:00	2026-05-22 05:39:25.68	2026-05-22 07:37:21.543
cmpglx9rs000701mt89arb10e	cmk5w4rm700011yo2ey83qv4z	sharecodes to Jinoyes	\N	t	f	2026-05-23 00:00:00	2026-05-22 07:37:31.576	2026-05-22 07:43:11.273
cmpgm4xjg000801mt0ik2y6pt	cmk5w4rm700011yo2ey83qv4z	extra provision for Nandu for exams	\N	t	f	2026-05-23 00:00:00	2026-05-22 07:43:28.972	2026-05-22 08:21:19.779
cmpghpppk000601mt04k96wis	cmk5w4rm700011yo2ey83qv4z	Call Serenah Barnard	\N	t	f	2026-05-23 00:00:00	2026-05-22 05:39:40.52	2026-05-22 08:21:29.511
cmpghpiq7000501mtrj8n2t77	cmk5w4rm700011yo2ey83qv4z	Reply to Nick Garner	\N	t	f	2026-05-23 00:00:00	2026-05-22 05:39:31.471	2026-05-22 08:25:30.84
cmpghp95j000301mtts29ogap	cmk5w4rm700011yo2ey83qv4z	Paris hotel Booking	\N	t	f	2026-05-23 00:00:00	2026-05-22 05:39:19.063	2026-05-27 04:08:04.145
cmpnjqg25000201ogneywbywa	cmk5w4rm700011yo2ey83qv4z	Find RICS surveyor	\N	f	f	2026-05-28 00:00:00	2026-05-27 04:10:37.133	2026-05-27 04:10:37.133
cmpnkty42000l01og9g2aez55	cmk5w4rm700011yo2ey83qv4z	Indus Ind Appa	\N	f	f	2026-05-28 00:00:00	2026-05-27 04:41:20.114	2026-05-27 04:41:20.114
cmpnl86oy000m01oghxtm1npb	cmk5w4rm700011yo2ey83qv4z	Denmark trip bills	\N	f	f	2026-05-28 00:00:00	2026-05-27 04:52:24.418	2026-05-27 04:52:24.418
cmpp0njtl000o01ogno2olnqa	cmk5w4rm700011yo2ey83qv4z	Checkin for flight	\N	t	f	2026-05-29 00:00:00	2026-05-28 04:52:01.688	2026-05-28 04:52:03.405
cmpp0v9zt000p01oggvxzcobf	cmk5w4rm700011yo2ey83qv4z	Geetha HDFC insurance	\N	f	f	2026-05-29 00:00:00	2026-05-28 04:58:02.201	2026-05-28 04:58:02.201
cmpnjq0bv000001og7j8bn5ok	cmk5w4rm700011yo2ey83qv4z	meet and greet gatwick airport	\N	t	f	2026-05-28 00:00:00	2026-05-27 04:10:16.746	2026-05-28 05:17:48.122
cmpnmadpm000n01og7c82jkby	cmk5w4rm700011yo2ey83qv4z	Packing for Paris trip	\N	t	f	2026-05-28 00:00:00	2026-05-27 05:22:06.442	2026-05-29 08:10:46.855
cmpnjqcag000101ogqr7ac1h1	cmk5w4rm700011yo2ey83qv4z	Reply to Nick Garner	\N	t	f	2026-05-28 00:00:00	2026-05-27 04:10:32.248	2026-05-29 08:11:09.907
cmpqn900y001g01ogweny7v2b	cmk5w4rm700011yo2ey83qv4z	appa amma medcince	\N	f	f	2026-05-30 00:00:00	2026-05-29 08:12:20.194	2026-05-29 08:12:20.194
cmpghp43v000201mtfjq8psgm	cmk5w4rm700011yo2ey83qv4z	Nandu Rutlish calendars	\N	t	f	2026-05-23 00:00:00	2026-05-22 05:39:12.523	2026-05-29 08:12:57.098
cmpyf7cmg000001qd6jsi9htk	cmo5yq69m000w01mvbhdomas0	Talk to Akie about surveyor	\N	f	f	2026-06-04 00:00:00	2026-06-03 18:49:15.688	2026-06-03 18:49:15.688
cmpyf7tjy000101qdami0q81c	cmo5yq69m000w01mvbhdomas0	Talk to michael about surveyot	\N	f	f	2026-06-04 00:00:00	2026-06-03 18:49:37.63	2026-06-03 18:49:37.63
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "auth0Id", password, name, "createdAt", "updatedAt", dob, phone, "emailVerified", "emailVerificationToken", "emailVerificationExpires", coins) FROM stdin;
cmkarzu47000001rrwzckt76v	nandansharath2015@gmail.com	\N	$argon2id$v=19$m=65536,t=3,p=4$OM3c04mMN3t5iN01o6JZvg$bw65xZt2wJtdVLeUeu0sWCUik41oH6v2p2V1RZvKoGc	Nandu Sharath	2026-01-12 06:22:20.215	2026-02-11 20:16:24.1	2015-03-05 00:00:00	+447919495130	f	628bda1c82f8df8ddb16eed8d795c1e034d35b3472b4323cf02e137e25d66f08	2026-01-13 06:22:20.207	120
cmo5yq69m000w01mvbhdomas0	sowiyer@gmail.com	\N	$argon2id$v=19$m=65536,t=3,p=4$MdcDcslVSEbkVb6N2Z9b6A$/Ox5QQ9Z5gLV++gBfvufS4U8Xl4599ApV06W+kAGbLM	Sowmya 	2026-04-19 16:10:45.178	2026-04-19 16:10:45.178	1988-04-19 00:00:00	07442278900	f	f95af91b324ffc9bfda9f89f38e560d8862151373aee6200a3dff5c3f8594a0d	2026-04-20 16:10:45.174	0
cmk5w4rki00001yo2kjphkgvu	sowmyasniyer@gmail.com	user1	$argon2id$v=19$m=65536,t=3,p=4$vRXd9mpscOCreea9a14t2Q$Xm0m8O8TxKDvQKdZbymAl05ici9HN7Xa8EoofQW1Usw	Sowmya Sharath	2026-01-08 20:19:17.777	2026-06-04 18:17:23.588	1983-10-11 00:00:00	07442278900	f	\N	\N	180
cmk5w4rm700011yo2ey83qv4z	sharathnatraj@gmail.com	user2	$argon2id$v=19$m=65536,t=3,p=4$0hSOnJnw7coejxfWH4w0Aw$Yr7NpETjNLLWiuuy9DBUnsqx7JQdcKpYMZBZl5I7E2c	Sharath Nataraj	2026-01-08 20:19:17.839	2026-06-04 18:17:23.598	1983-05-02 00:00:00		f	\N	\N	0
\.


--
-- Data for Name: WeightGoal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WeightGoal" (id, "goalId", "startWeight", "currentWeight", "targetWeight", "createdAt", "updatedAt") FROM stdin;
cmk6mr5zn000101o2xzcf8ewe	cmk6mr5z8000001o2wyiff16g	7	0	6.6	2026-01-09 08:44:32.915	2026-02-02 18:49:41.895
cmpjlnt58000a01mtfuz1puuu	cmpjlnt4j000901mth0vw3by4	94.5	94.5	90	2026-05-24 09:53:28.652	2026-06-02 06:29:03.985
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a04ac2c9-4a76-4372-9d59-a41f293ab6d9	ea4055e1f16f09d404417cfcef3ee9b01dbfcc17ac3697ba5ec48020c30ff16f	2026-01-08 18:51:31.08421+00	20260102162418_init	\N	\N	2026-01-08 18:51:30.9596+00	1
23578a5a-1ca1-44c9-8dca-883a95c81cf7	52ef582f6b7dae65026c98772ef25401ce9599720834d2153283cd54da4f517e	2026-01-08 18:51:31.229535+00	20260103010209_new_table	\N	\N	2026-01-08 18:51:31.124114+00	1
a92d245b-5d77-4316-a740-3f945b693289	daa93d660dc5d309d398ca94f42e0bbfc3a9124fd6cb059359c748060807c085	2026-01-08 18:51:31.383394+00	20260103131219_add_todo_model	\N	\N	2026-01-08 18:51:31.269981+00	1
142cb5c9-549f-4adc-a8e8-56c35fc22e71	83c4d176cca0b01899ca2a65a92e5d49661535a402a7910b14bb5e9818194a36	2026-01-12 06:21:05.481197+00	20260110_add_registration_fields	\N	\N	2026-01-12 06:21:05.46067+00	1
e30840e3-75af-4fd7-acc6-4fa11d262706	b3c5d8276df9e658950a24c5ac54f0a747df019c6605afbb30ce10f57568f36a	2026-01-12 12:30:09.987225+00	20260112105426_add_distribution_strategy	\N	\N	2026-01-12 12:30:09.975781+00	1
c88a0edf-d5b4-4a24-9c70-4c2fab9a79dc	4654a521d4bec25f9c34ac96087198da6260baa143c9b772a0781ef9eab62600	2026-01-14 19:18:05.585264+00	20260113195259_add_life_goals	\N	\N	2026-01-14 19:18:05.483161+00	1
794072d6-d6b5-42e1-a52b-50632f2b5af9	19e8d48104bcaa224f1bbb8262f402ca2ddc3451a5d4f8150f2d87675c968246	2026-01-18 08:32:06.840565+00	20260118074831_add_months_array_to_task	\N	\N	2026-01-18 08:32:06.83184+00	1
12d75ca0-9fd2-4752-927d-953b777f9400	2bdda7963606d48ec02d448ddac9e9f1fdb2a38cafc736bc8adf6185ad2e0c15	2026-02-05 19:49:27.372215+00	20260203195856_add_coins_to_user	\N	\N	2026-02-05 19:49:27.364377+00	1
\.


--
-- Name: CountGoal CountGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CountGoal"
    ADD CONSTRAINT "CountGoal_pkey" PRIMARY KEY (id);


--
-- Name: Goal Goal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_pkey" PRIMARY KEY (id);


--
-- Name: LifeGoal LifeGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LifeGoal"
    ADD CONSTRAINT "LifeGoal_pkey" PRIMARY KEY (id);


--
-- Name: MonthlyGoal MonthlyGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MonthlyGoal"
    ADD CONSTRAINT "MonthlyGoal_pkey" PRIMARY KEY (id);


--
-- Name: TaskCompletion TaskCompletion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskCompletion"
    ADD CONSTRAINT "TaskCompletion_pkey" PRIMARY KEY (id);


--
-- Name: TaskMonthAggregation TaskMonthAggregation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskMonthAggregation"
    ADD CONSTRAINT "TaskMonthAggregation_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: TimeGoal TimeGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeGoal"
    ADD CONSTRAINT "TimeGoal_pkey" PRIMARY KEY (id);


--
-- Name: Todo Todo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Todo"
    ADD CONSTRAINT "Todo_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WeightGoal WeightGoal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WeightGoal"
    ADD CONSTRAINT "WeightGoal_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: CountGoal_goalId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CountGoal_goalId_key" ON public."CountGoal" USING btree ("goalId");


--
-- Name: Goal_lifeGoalId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Goal_lifeGoalId_idx" ON public."Goal" USING btree ("lifeGoalId");


--
-- Name: Goal_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Goal_userId_idx" ON public."Goal" USING btree ("userId");


--
-- Name: LifeGoal_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "LifeGoal_userId_idx" ON public."LifeGoal" USING btree ("userId");


--
-- Name: MonthlyGoal_goalId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "MonthlyGoal_goalId_idx" ON public."MonthlyGoal" USING btree ("goalId");


--
-- Name: TaskCompletion_date_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "TaskCompletion_date_idx" ON public."TaskCompletion" USING btree (date);


--
-- Name: TaskCompletion_taskId_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TaskCompletion_taskId_date_key" ON public."TaskCompletion" USING btree ("taskId", date);


--
-- Name: TaskCompletion_taskId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "TaskCompletion_taskId_idx" ON public."TaskCompletion" USING btree ("taskId");


--
-- Name: TaskMonthAggregation_taskId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "TaskMonthAggregation_taskId_idx" ON public."TaskMonthAggregation" USING btree ("taskId");


--
-- Name: TaskMonthAggregation_taskId_year_month_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TaskMonthAggregation_taskId_year_month_key" ON public."TaskMonthAggregation" USING btree ("taskId", year, month);


--
-- Name: TaskMonthAggregation_year_month_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "TaskMonthAggregation_year_month_idx" ON public."TaskMonthAggregation" USING btree (year, month);


--
-- Name: Task_goalId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Task_goalId_idx" ON public."Task" USING btree ("goalId");


--
-- Name: TimeGoal_goalId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TimeGoal_goalId_key" ON public."TimeGoal" USING btree ("goalId");


--
-- Name: Todo_dueDate_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Todo_dueDate_idx" ON public."Todo" USING btree ("dueDate");


--
-- Name: Todo_userId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "Todo_userId_idx" ON public."Todo" USING btree ("userId");


--
-- Name: User_auth0Id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_auth0Id_key" ON public."User" USING btree ("auth0Id");


--
-- Name: User_emailVerificationToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_emailVerificationToken_key" ON public."User" USING btree ("emailVerificationToken");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: WeightGoal_goalId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WeightGoal_goalId_key" ON public."WeightGoal" USING btree ("goalId");


--
-- Name: CountGoal CountGoal_goalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CountGoal"
    ADD CONSTRAINT "CountGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES public."Goal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Goal Goal_lifeGoalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_lifeGoalId_fkey" FOREIGN KEY ("lifeGoalId") REFERENCES public."LifeGoal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Goal Goal_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Goal"
    ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: LifeGoal LifeGoal_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LifeGoal"
    ADD CONSTRAINT "LifeGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MonthlyGoal MonthlyGoal_goalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MonthlyGoal"
    ADD CONSTRAINT "MonthlyGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES public."Goal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaskCompletion TaskCompletion_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskCompletion"
    ADD CONSTRAINT "TaskCompletion_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaskMonthAggregation TaskMonthAggregation_taskId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskMonthAggregation"
    ADD CONSTRAINT "TaskMonthAggregation_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Task Task_goalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES public."Goal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TimeGoal TimeGoal_goalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TimeGoal"
    ADD CONSTRAINT "TimeGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES public."Goal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Todo Todo_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Todo"
    ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WeightGoal WeightGoal_goalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WeightGoal"
    ADD CONSTRAINT "WeightGoal_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES public."Goal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict TAcvFQwtab4R54d5D5HF420DulQjUkDTm71YCygHGweU9cWRrfJeAnxwfPZTwQ0

