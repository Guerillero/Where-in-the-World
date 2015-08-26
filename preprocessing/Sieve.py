import csv

# Pre work
fn = ["page_title", "gt_lat", "gt_lon", "gt_type", "cl_to"]

# open files
fin = open("geo_data_fr_WW.csv", 'rb')
csvIN = csv.DictReader(fin, fieldnames= fn)
fout  = open("geo_data_fr.csv", 'wb')
csvOUT = csv.DictWriter(fout, fieldnames= fn)
csv.field_size_limit(900000)

# strip out the dupes (I can't seem to do this in sql)
titles = []
baz = True
foo = 1
# csvOUT.writeheader()

for row in csvIN:
  if int(len(titles)) == 0:
    csvOUT.writerow(row)
    titles.append(row['page_title'])
    baz = False
  else:
    for i in range(len(titles)):
      if titles[i] == row['page_title']:
        baz = False
        break
  if baz:
    titles.append(row['page_title'])
    csvOUT.writerow(row)
        
  baz = True
  foo += 1
  
print foo
