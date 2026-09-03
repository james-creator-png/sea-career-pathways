REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

CREATE POLICY "Admins can read candidate documents"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'candidate-documents' AND public.has_role(auth.uid(), 'administrator'));

CREATE POLICY "Admins can delete candidate documents"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'candidate-documents' AND public.has_role(auth.uid(), 'administrator'));