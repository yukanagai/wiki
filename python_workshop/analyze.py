import csv
csv_file = open("rock.csv", 'rb') 
# if Python 3, use 'rU' rb = is the MODE (reading the file, not writing or changing)

reader = csv.DictReader(csv_file)

rows = [row for row in reader]

# How many songs are from 1981
print "There were {} songs relased in 1981.".format(
	len([x for x in rows if x['Release Year'] == '1981'])
)

def is_valid_year(string):
	try:
		int(string)
	except ValueError: 
		#capturing valueerror if the string wasn't aa number - returning false
		return False
	else:
		# If we don't hit an error, return true
		# we pick 1900 because there's a typo in data input
		return int(string) > 1900

# How many songs are from before 1984
print "There were {} songs released before 1984.".format(
	len([
		x for x in rows 
		if is_valid_year(x['Release Year']) and
		 int(x['Release Year']) < 1984])
)

# Find the earliest release year of a songs
print "The earliest release year of a song was {}".format(
	min([row['Release Year']
		for row in rows
		if is_valid_year(row['Release Year'])])
)


# What are the top 20 songs by playcount
# use sort

top_5_songs = sorted(
	rows, 
	key=lambda row: int(row['PlayCount']), 
	reverse=True)[:5]

print "The top 5 songs were:"
for song in top_5_songs:
	print "{} {}".format(song["Song Clean"], song['PlayCount'])


# pdb = pythong debugger
import pdb; pdb.set_trace()