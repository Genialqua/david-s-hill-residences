CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'davids_hill_website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(full_name) BETWEEN 2 AND 120
    AND char_length(phone) BETWEEN 5 AND 30
    AND char_length(email) BETWEEN 5 AND 254
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

CREATE INDEX idx_subscribers_created_at ON public.subscribers (created_at DESC);
CREATE INDEX idx_subscribers_email ON public.subscribers (lower(email));