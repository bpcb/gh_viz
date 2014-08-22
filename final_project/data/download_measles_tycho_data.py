import csv

header = True
output_fields = ['id', 'number', 'loc', 'state', 'country',	'loc_type',	'indicator', 'from_date', 'to_date', 'pub_date', 'epi_week', 'event', 'disease', 'subcategory_new', 'pdf_id']

with open('ProjectTycho_Level2.tsv') as tsvalues, open('measles_data.csv', 'wb') as csvout:
	tsvalues = csv.DictReader(tsvalues, delimiter = '\t')
	output = csv.DictWriter(csvout, output_fields)
	
	for row in tsvalues:
		if header == True:
			output.writeheader()
			header = False
		if row['disease'] == 'MEASLES' and row['loc_type'] == 'STATE':
			output.writerow(row)


			
	
