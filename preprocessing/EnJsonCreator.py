import csv
from decimal import *

fn = ["page_title", "gt_lat", "gt_lon", "gt_type", "cl_to"]

fin = open("geo_data_enwiki.csv", 'rb')
csvIN = csv.DictReader(fin, fieldnames= fn)
fout = open("geo_data_en_3.json", 'wb')

fout.write("{ \"type\": \"FeatureCollection\"," + "\n")
fout.write("\t\"features\": [" + "\n")

foo = 0

for line in csvIN:
  if line['gt_lon'] <> 'gt_lon':
    # NE_1 (>>), NW_2 (><), SE_3 (<>), SW_4 (<<)
    print line['gt_lon'] + ", " + line['gt_lat']
    if Decimal(line['gt_lon']) < Decimal(0) and Decimal(line['gt_lat']) > Decimal(0):
      if foo > 1:
        fout.write(",\n")
      
      if foo > 0:
        fout.write("\t\t{ \"type\": \"Feature\"," + "\n")
        fout.write("\t\t\"geometry\": {\"type\": \"Point\", \"coordinates\": [" + line['gt_lon'] + ", " + line['gt_lat'] + "]}," + "\n")
        fout.write("\t\t\"properties\": {" + "\n")
        fout.write("\t\t\t\"title\": \"" + line['page_title'] + "\",\n")
        fout.write("\t\t\t\"content_type\": \"" + line['cl_to'] + "\",\n")
        fout.write("\t\t\t\"geo_type\": \"" + line['gt_type'] + "\"\n")
        fout.write("\t\t\t}\n")
        fout.write("\t\t}")
        
      foo += 1

fout.write("\n\t]\n")
fout.write("}")
