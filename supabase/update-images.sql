-- =====================================================================
-- VOLT — Image refresh
-- Updates product_variants.image_urls with a curated dark/moody image set.
-- Safe to run multiple times. Paste into Supabase SQL editor → Run.
-- =====================================================================

-- 1 / Field — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-001-CAR';

-- 1 / Field — Sand
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-001-SND';

-- 1 / Field — Sage
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-001-SGE';

-- 2 / Field Pro — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-002-CAR';

-- 2 / Field Pro — Burnt Orange
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-002-BOR';

-- 3 / Pulse — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-003-CAR';

-- 3 / Pulse — Sand
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-003-SND';

-- 3 / Pulse — Cobalt
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-003-COB';

-- 4 / Pulse Sport — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-004-CAR';

-- 4 / Pulse Sport — Lime
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-004-LIM';

-- 4 / Pulse Sport — Coral
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-004-COR';

-- 5 / Atlas — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-005-CAR';

-- 5 / Atlas — Sand
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-005-SND';

-- 6 / Atlas Mini — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-006-CAR';

-- 6 / Atlas Mini — Sand
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-006-SND';

-- 6 / Atlas Mini — Coral
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-006-COR';

-- 7 / Tower — Carbon
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-007-CAR';

-- 7 / Tower — Walnut
update public.product_variants set image_urls = '[
  "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"
]'::jsonb where sku = 'VOL-007-WAL';

-- verify
-- select p.name, v.color_name, v.image_urls from public.product_variants v
--   join public.products p on v.product_id = p.id order by p.created_at, v.color_name;
