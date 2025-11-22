CREATE EXTENSION IF NOT EXISTS "pg_cron";
CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_net";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: get_next_post_for_refresh(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_next_post_for_refresh() RETURNS uuid
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  post_id_result UUID;
BEGIN
  SELECT id INTO post_id_result
  FROM public.blog_posts
  WHERE status = 'published' AND needs_refresh = true
  ORDER BY last_refreshed_at NULLS FIRST, publish_date ASC
  LIMIT 1;
  
  RETURN post_id_result;
END;
$$;


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign 'user' role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: increment_post_views(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.increment_post_views(post_id uuid) RETURNS integer
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  new_views INTEGER;
BEGIN
  UPDATE blog_posts 
  SET views = views + 1 
  WHERE id = post_id AND status = 'published'
  RETURNING views INTO new_views;
  
  RETURN new_views;
END;
$$;


--
-- Name: mark_posts_for_refresh(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.mark_posts_for_refresh() RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  UPDATE public.blog_posts
  SET needs_refresh = true
  WHERE status = 'published'
    AND (last_refreshed_at IS NULL OR last_refreshed_at < NOW() - INTERVAL '90 days')
    AND publish_date < NOW() - INTERVAL '90 days';
END;
$$;


--
-- Name: promote_user_to_admin(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.promote_user_to_admin(user_email text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Find user_id from profiles table
  SELECT id INTO target_user_id
  FROM public.profiles
  WHERE email = user_email;
  
  -- Check if user exists
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Insert admin role (ignore if already exists)
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RAISE NOTICE 'User % promoted to admin', user_email;
END;
$$;


--
-- Name: update_blog_posts_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_blog_posts_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: blog_ab_tests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_ab_tests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    variant_a_title text NOT NULL,
    variant_b_title text NOT NULL,
    variant_a_views integer DEFAULT 0,
    variant_b_views integer DEFAULT 0,
    variant_a_clicks integer DEFAULT 0,
    variant_b_clicks integer DEFAULT 0,
    winner text,
    test_started_at timestamp with time zone DEFAULT now(),
    test_ended_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: blog_enhancements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_enhancements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    enhancement_type text NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL,
    status text DEFAULT 'completed'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: blog_generation_errors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_generation_errors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    error_type text NOT NULL,
    error_message text NOT NULL,
    error_details jsonb DEFAULT '{}'::jsonb,
    post_id uuid,
    resolved boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: blog_generation_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_generation_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    topic text NOT NULL,
    keywords text[] NOT NULL,
    category text NOT NULL,
    generated_at timestamp with time zone DEFAULT now(),
    post_id uuid
);


--
-- Name: blog_post_revisions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_post_revisions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    revision_number integer NOT NULL,
    title text NOT NULL,
    content_html text NOT NULL,
    meta_title text NOT NULL,
    meta_description text NOT NULL,
    keywords text[] DEFAULT '{}'::text[] NOT NULL,
    changed_by text DEFAULT 'editor_agent'::text NOT NULL,
    change_summary text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: blog_post_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_post_tags (
    post_id uuid NOT NULL,
    tag_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: blog_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    category text NOT NULL,
    content_html text NOT NULL,
    excerpt text NOT NULL,
    keywords text[] DEFAULT '{}'::text[] NOT NULL,
    publish_date timestamp with time zone DEFAULT now() NOT NULL,
    sources jsonb DEFAULT '[]'::jsonb,
    views integer DEFAULT 0,
    featured_image text,
    meta_title text NOT NULL,
    meta_description text NOT NULL,
    author text DEFAULT 'Elevated AI Team'::text,
    status text DEFAULT 'published'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_enhanced_at timestamp with time zone,
    enhancement_version integer DEFAULT 0,
    needs_refresh boolean DEFAULT false,
    last_refreshed_at timestamp with time zone,
    internal_links_count integer DEFAULT 0,
    outbound_links_count integer DEFAULT 0,
    images_count integer DEFAULT 0,
    readability_score numeric,
    ab_test_active boolean DEFAULT false,
    CONSTRAINT blog_posts_category_check CHECK ((category = ANY (ARRAY['AI News'::text, 'AI Services'::text, 'AI Thought Leadership'::text, 'AI Tips'::text, 'AI Consulting'::text, 'AI in the Workplace'::text]))),
    CONSTRAINT blog_posts_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])))
);


--
-- Name: blog_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_tags (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: blog_ab_tests blog_ab_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_ab_tests
    ADD CONSTRAINT blog_ab_tests_pkey PRIMARY KEY (id);


--
-- Name: blog_enhancements blog_enhancements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_enhancements
    ADD CONSTRAINT blog_enhancements_pkey PRIMARY KEY (id);


--
-- Name: blog_generation_errors blog_generation_errors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_generation_errors
    ADD CONSTRAINT blog_generation_errors_pkey PRIMARY KEY (id);


--
-- Name: blog_generation_history blog_generation_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_generation_history
    ADD CONSTRAINT blog_generation_history_pkey PRIMARY KEY (id);


--
-- Name: blog_post_revisions blog_post_revisions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_revisions
    ADD CONSTRAINT blog_post_revisions_pkey PRIMARY KEY (id);


--
-- Name: blog_post_revisions blog_post_revisions_post_id_revision_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_revisions
    ADD CONSTRAINT blog_post_revisions_post_id_revision_number_key UNIQUE (post_id, revision_number);


--
-- Name: blog_post_tags blog_post_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT blog_post_tags_pkey PRIMARY KEY (post_id, tag_id);


--
-- Name: blog_posts blog_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_pkey PRIMARY KEY (id);


--
-- Name: blog_posts blog_posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_posts
    ADD CONSTRAINT blog_posts_slug_key UNIQUE (slug);


--
-- Name: blog_tags blog_tags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_name_key UNIQUE (name);


--
-- Name: blog_tags blog_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_pkey PRIMARY KEY (id);


--
-- Name: blog_tags blog_tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT blog_tags_slug_key UNIQUE (slug);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: idx_blog_ab_tests_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_ab_tests_post_id ON public.blog_ab_tests USING btree (post_id);


--
-- Name: idx_blog_enhancements_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_enhancements_post_id ON public.blog_enhancements USING btree (post_id);


--
-- Name: idx_blog_generation_errors_resolved; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_generation_errors_resolved ON public.blog_generation_errors USING btree (resolved);


--
-- Name: idx_blog_post_tags_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_post_tags_post_id ON public.blog_post_tags USING btree (post_id);


--
-- Name: idx_blog_post_tags_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_post_tags_tag_id ON public.blog_post_tags USING btree (tag_id);


--
-- Name: idx_blog_posts_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_posts_category ON public.blog_posts USING btree (category);


--
-- Name: idx_blog_posts_needs_refresh; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_posts_needs_refresh ON public.blog_posts USING btree (needs_refresh);


--
-- Name: idx_blog_posts_publish_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_posts_publish_date ON public.blog_posts USING btree (publish_date DESC);


--
-- Name: idx_blog_posts_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_posts_slug ON public.blog_posts USING btree (slug);


--
-- Name: idx_blog_posts_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_posts_status ON public.blog_posts USING btree (status);


--
-- Name: idx_blog_revisions_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_blog_revisions_post_id ON public.blog_post_revisions USING btree (post_id);


--
-- Name: idx_generation_history_generated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_generation_history_generated_at ON public.blog_generation_history USING btree (generated_at DESC);


--
-- Name: idx_generation_history_topic; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_generation_history_topic ON public.blog_generation_history USING btree (topic);


--
-- Name: blog_posts update_blog_posts_updated_at_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_blog_posts_updated_at_trigger BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_blog_posts_updated_at();


--
-- Name: blog_ab_tests blog_ab_tests_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_ab_tests
    ADD CONSTRAINT blog_ab_tests_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_enhancements blog_enhancements_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_enhancements
    ADD CONSTRAINT blog_enhancements_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_generation_errors blog_generation_errors_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_generation_errors
    ADD CONSTRAINT blog_generation_errors_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE SET NULL;


--
-- Name: blog_generation_history blog_generation_history_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_generation_history
    ADD CONSTRAINT blog_generation_history_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_post_revisions blog_post_revisions_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_revisions
    ADD CONSTRAINT blog_post_revisions_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_post_tags blog_post_tags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT blog_post_tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.blog_posts(id) ON DELETE CASCADE;


--
-- Name: blog_post_tags blog_post_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_post_tags
    ADD CONSTRAINT blog_post_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.blog_tags(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: blog_ab_tests Admins can manage AB tests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage AB tests" ON public.blog_ab_tests USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_posts Admins can manage all posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all posts" ON public.blog_posts USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_enhancements Admins can manage enhancements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage enhancements" ON public.blog_enhancements USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_generation_errors Admins can manage errors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage errors" ON public.blog_generation_errors USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_post_revisions Admins can manage revisions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage revisions" ON public.blog_post_revisions USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_ab_tests Admins can view AB tests; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view AB tests" ON public.blog_ab_tests FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_enhancements Admins can view enhancements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view enhancements" ON public.blog_enhancements FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_generation_errors Admins can view errors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view errors" ON public.blog_generation_errors FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_post_revisions Admins can view revisions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view revisions" ON public.blog_post_revisions FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: blog_post_tags Post tags viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Post tags viewable by everyone" ON public.blog_post_tags FOR SELECT USING (true);


--
-- Name: blog_posts Published posts are viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Published posts are viewable by everyone" ON public.blog_posts FOR SELECT USING ((status = 'published'::text));


--
-- Name: blog_generation_history Service role can manage generation history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Service role can manage generation history" ON public.blog_generation_history USING ((auth.role() = 'service_role'::text));


--
-- Name: blog_tags Tags viewable by everyone; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Tags viewable by everyone" ON public.blog_tags FOR SELECT USING (true);


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: user_roles Users can view own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: blog_ab_tests; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_ab_tests ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_enhancements; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_enhancements ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_generation_errors; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_generation_errors ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_generation_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_generation_history ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_post_revisions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_post_revisions ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_post_tags; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_tags; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


