SELECT
  page_title, gt_lat, gt_lon, gt_type, cl_to
FROM page
JOIN geo_tags
ON gt_page_id = page_id
JOIN categorylinks
ON cl_from = page_id
WHERE cl_to = "Good_articles"
OR cl_to = "Featured_articles"
AND gt_globe = 'earth'
AND page_namespace = 0
