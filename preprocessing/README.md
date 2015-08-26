#Preprocessing
1. The data was extracted from [Quarry](http://quarry.wmflabs.org/) using the SQL queries found in this directory.
2. Using a sieve, duplicates were removed from the CSVs. The resulting CSVs are found in the `data` directory.
3. The CSVs were then turned into JSONs. All of the JSONs except the English Wikipedia’s are found in the `JSON` directory.

All of the Python should be platform agnostic, but I used a Ubuntu box with `Python 2.7.3`.
