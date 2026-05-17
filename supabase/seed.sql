-- =====================================================================
-- VOLT — Seed data
-- Run AFTER migration.sql. Idempotent: clears tables first.
-- =====================================================================

truncate table public.product_variants restart identity cascade;
truncate table public.products         restart identity cascade;

-- =====================================================================
-- 1 / VOLT Field — $349
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-field',
  'Field',
  'Studio-grade over-ear with adaptive ANC.',
  'Field is the everyday reference. Forty-millimeter dynamic drivers, six-microphone adaptive ANC, and forty hours of playback in a chassis that disappears on the head. Tuned in our Porto room by engineers who mix records for a living.',
  'headphones',
  34900,
  '[
    {"icon":"driver","title":"40 mm dynamic drivers","body":"Custom-tuned biocellulose diaphragms. Flat response from 8 Hz to 28 kHz."},
    {"icon":"anc","title":"Adaptive ANC, six microphones","body":"Profiles your environment 200 times per second. −28 dB attenuation at 1 kHz."},
    {"icon":"battery","title":"Forty-hour battery","body":"USB-C fast charge restores eight hours in fifteen minutes."}
  ]'::jsonb,
  '{"drivers":"40 mm dynamic","response":"8 Hz – 28 kHz","battery":"40 h","charge":"USB-C, 15 min → 8 h","wireless":"Bluetooth 5.3, LDAC, aptX HD","weight":"250 g","anc":"−28 dB @ 1 kHz","warranty":"5 years"}'::jsonb,
  '["Field headphones","Hard travel case","USB-C charge cable","3.5 mm audio cable","Airline adapter","Care cloth"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-field'), 'Carbon',  '#0A0A0A',
  '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-001-CAR', 24),
((select id from public.products where slug='volt-field'), 'Sand',    '#D4C5A9',
  '["https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-001-SND', 18),
((select id from public.products where slug='volt-field'), 'Sage',    '#7A8471',
  '["https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-001-SGE', 9);

-- =====================================================================
-- 2 / VOLT Field Pro — $549
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-field-pro',
  'Field Pro',
  'Reference over-ear for studios and audiophiles.',
  'A reference monitor in a wireless body. Hybrid driver array, hi-res certification, fifty hours per charge. Leather earcups, machined aluminum yokes, and a silicone-suspended chassis that disappears on the head.',
  'headphones',
  54900,
  '[
    {"icon":"driver","title":"Hybrid driver array","body":"40 mm dynamic for low-end, 10 mm planar magnetic for upper register."},
    {"icon":"hires","title":"Hi-Res certified","body":"24-bit / 96 kHz over LDAC. Response from 4 Hz to 40 kHz."},
    {"icon":"build","title":"Aluminum and leather","body":"Machined aluminum yokes, lambskin earcups, silicone-suspended chassis."}
  ]'::jsonb,
  '{"drivers":"40 mm dynamic + 10 mm planar","response":"4 Hz – 40 kHz","battery":"50 h","charge":"USB-C, 15 min → 10 h","wireless":"Bluetooth 5.3, LDAC, aptX Adaptive","weight":"268 g","anc":"−32 dB @ 1 kHz","warranty":"5 years"}'::jsonb,
  '["Field Pro headphones","Aluminum travel case","Braided USB-C cable","Balanced 4.4 mm cable","3.5 mm audio cable","Airline adapter","Microfiber cloth"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-field-pro'), 'Carbon',       '#0A0A0A',
  '["https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-002-CAR', 14),
((select id from public.products where slug='volt-field-pro'), 'Burnt Orange', '#C84D2C',
  '["https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-002-BOR', 6);

-- =====================================================================
-- 3 / VOLT Pulse — $229
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-pulse',
  'Pulse',
  'Compact wireless with adaptive ANC.',
  'Pulse fits where studio-grade audio normally cannot. 11 mm drivers, 24 dB of cancellation, wireless charging, and a stem that finds your tap on the first try. Eight hours per bud, thirty in the case.',
  'earbuds',
  22900,
  '[
    {"icon":"driver","title":"11 mm dynamic drivers","body":"Sealed-back design with biocellulose diaphragms."},
    {"icon":"anc","title":"−24 dB adaptive ANC","body":"Profiles ambient noise and adjusts cabin pressure in real time."},
    {"icon":"charge","title":"Wireless charging case","body":"Qi-compatible. Restores six hours of playback in fifteen minutes."}
  ]'::jsonb,
  '{"drivers":"11 mm dynamic","response":"20 Hz – 20 kHz","battery":"8 h + 22 h case","charge":"USB-C + Qi wireless","wireless":"Bluetooth 5.3, LE Audio","weight":"4.6 g per bud","anc":"−24 dB @ 1 kHz","ip":"IP54","warranty":"3 years"}'::jsonb,
  '["Pulse earbuds","Wireless charging case","Four pairs of silicone tips (XS / S / M / L)","USB-C charge cable","Quick-start card"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-pulse'), 'Carbon', '#0A0A0A',
  '["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-003-CAR', 32),
((select id from public.products where slug='volt-pulse'), 'Sand',   '#D4C5A9',
  '["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-003-SND', 21),
((select id from public.products where slug='volt-pulse'), 'Cobalt', '#1E3A8A',
  '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-003-COB', 11);

-- =====================================================================
-- 4 / VOLT Pulse Sport — $179
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-pulse-sport',
  'Pulse Sport',
  'Sweat-resistant fit for training.',
  'Pulse Sport replaces the stem with an over-ear hook, drops weight to 4.1 grams per bud, and earns an IP67 rating. Tuned slightly forward in the mids — vocals stay legible on a run.',
  'earbuds',
  17900,
  '[
    {"icon":"fit","title":"Locked over-ear hook","body":"Silicone-wrapped memory wire. Tested through 1,200 minutes of running."},
    {"icon":"water","title":"IP67 dust and water","body":"Survives sweat, rain, and a thirty-minute submersion."},
    {"icon":"battery","title":"Twelve-hour battery","body":"Plus another twenty-eight in the case. Quick-charge: ten minutes for two hours."}
  ]'::jsonb,
  '{"drivers":"10 mm dynamic","response":"20 Hz – 20 kHz","battery":"12 h + 28 h case","charge":"USB-C","wireless":"Bluetooth 5.3","weight":"4.1 g per bud","ip":"IP67","warranty":"3 years"}'::jsonb,
  '["Pulse Sport earbuds","Charging case","Three pairs of silicone tips","Three pairs of ear hooks (S / M / L)","USB-C cable"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-pulse-sport'), 'Carbon', '#0A0A0A',
  '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-004-CAR', 18),
((select id from public.products where slug='volt-pulse-sport'), 'Lime',   '#84CC16',
  '["https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-004-LIM', 3),
((select id from public.products where slug='volt-pulse-sport'), 'Coral',  '#FB7185',
  '["https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-004-COR', 7);

-- =====================================================================
-- 5 / VOLT Atlas — $299
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-atlas',
  'Atlas',
  'Portable Bluetooth speaker.',
  'Atlas is a stage in a satchel. Two 50 mm full-range drivers, a downward-firing passive radiator, and a machined aluminum body that doubles as the chassis and the heat sink. Eighteen-hour battery.',
  'speakers',
  29900,
  '[
    {"icon":"driver","title":"Dual full-range drivers","body":"50 mm aluminum cones with a downward-firing passive radiator."},
    {"icon":"build","title":"Machined aluminum body","body":"Single-block CNC chassis. No grilles, no plastic, no give."},
    {"icon":"battery","title":"Eighteen-hour playback","body":"USB-C charging. Pairs with a second Atlas in true stereo."}
  ]'::jsonb,
  '{"drivers":"2 × 50 mm + passive radiator","output":"40 W","battery":"18 h","charge":"USB-C","wireless":"Bluetooth 5.3, multipoint","weight":"1.2 kg","ip":"IP55","warranty":"3 years"}'::jsonb,
  '["Atlas speaker","USB-C cable","Leather carry strap","Quick-start card"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-atlas'), 'Carbon', '#0A0A0A',
  '["https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-005-CAR', 12),
((select id from public.products where slug='volt-atlas'), 'Sand',   '#D4C5A9',
  '["https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-005-SND', 8);

-- =====================================================================
-- 6 / VOLT Atlas Mini — $149
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-atlas-mini',
  'Atlas Mini',
  'Pocket speaker.',
  'Atlas Mini fits in a coat pocket and pulls a full mid-range out of it. One 40 mm driver, a sealed-back chamber, and a clip that holds it to a bag strap. Twelve hours of playback.',
  'speakers',
  14900,
  '[
    {"icon":"driver","title":"40 mm full-range","body":"Single-driver acoustic chamber. Tuned for mid-forward clarity."},
    {"icon":"clip","title":"Integrated carabiner","body":"Aluminum loop that clips to a bag, a belt, or a tent pole."},
    {"icon":"battery","title":"Twelve-hour battery","body":"USB-C. Pairs with up to four Atlas Minis in a chain."}
  ]'::jsonb,
  '{"drivers":"40 mm full-range","output":"15 W","battery":"12 h","charge":"USB-C","wireless":"Bluetooth 5.3","weight":"340 g","ip":"IP67","warranty":"3 years"}'::jsonb,
  '["Atlas Mini speaker","USB-C cable","Carabiner clip","Quick-start card"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-atlas-mini'), 'Carbon', '#0A0A0A',
  '["https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-006-CAR', 28),
((select id from public.products where slug='volt-atlas-mini'), 'Sand',   '#D4C5A9',
  '["https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-006-SND', 19),
((select id from public.products where slug='volt-atlas-mini'), 'Coral',  '#FB7185',
  '["https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-006-COR', 14);

-- =====================================================================
-- 7 / VOLT Tower — $799
-- =====================================================================
insert into public.products (slug, name, tagline, description, category, base_price, features, specs, in_box) values (
  'volt-tower',
  'Tower',
  'Home audio statement piece.',
  'Tower is what happens when the engineering team is told to stop optimizing for portability. Six drivers in a 110 cm column, a custom DSP that rooms-corrects in real time, and a finish hand-rubbed in Porto.',
  'speakers',
  79900,
  '[
    {"icon":"driver","title":"Six-driver array","body":"Two woofers, two midranges, two AMT tweeters. Time-aligned crossover."},
    {"icon":"room","title":"Room correction","body":"Six microphones map your room and adjust the response in real time."},
    {"icon":"build","title":"Hand-rubbed finish","body":"Each Tower spends twelve hours on the finisher\\u2019s bench in Porto."}
  ]'::jsonb,
  '{"drivers":"2 × 7\" woofer + 2 × 4\" mid + 2 × AMT tweeter","output":"240 W","response":"28 Hz – 30 kHz","wireless":"Wi-Fi 6, Bluetooth 5.3, AirPlay 2","wired":"Optical, RCA, balanced XLR","weight":"22 kg","height":"110 cm","warranty":"5 years"}'::jsonb,
  '["Tower speaker","Power cable","Calibration microphone","Felt floor protectors","Setup guide"]'::jsonb
);

insert into public.product_variants (product_id, color_name, color_hex, image_urls, sku, stock) values
((select id from public.products where slug='volt-tower'), 'Carbon', '#0A0A0A',
  '["https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-007-CAR', 4),
((select id from public.products where slug='volt-tower'), 'Walnut', '#5C3A21',
  '["https://images.unsplash.com/photo-1558379850-5e9e6e441cd6?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1593697972646-2f348871bd56?auto=format&fit=crop&w=1400&q=85","https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=1400&q=85"]'::jsonb,
  'VOL-007-WAL', 2);

-- =====================================================================
-- done. select a row to verify:
--   select slug, name, base_price from public.products order by created_at;
-- =====================================================================
